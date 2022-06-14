import _ from 'lodash';

const indent = 4;
const space = (depth, spaces = 2) => ' '.repeat(depth * indent + spaces);

const stringify = (value, depth) => {
  if (!_.isObject(value)) return value;
  return `{\n${Object.entries(value).map(([key, val]) => `${space(depth)}  ${key}: ${
    stringify(val, depth + 1)}`).join('\n')}\n${space(depth - 1)}  }`;
};

const stylish = (node, depth = 2) => {
  switch (node.type) {
    case 'main': {
      const result = node.children.flatMap((child) => stylish(child, depth + 1));
      return `{\n${result.join('\n')}\n}`;
    }
    case 'nested': {
      const result = node.children.flatMap((child) => stylish(child, depth + 1));
      return `${space(depth)}  ${node.key}: {\n${result.join('\n')}\n${space(depth)}  }`;
    }
    case 'added': {
      return `${space(depth)}+ ${node.key}: ${stringify(node.value, depth, stylish)}`;
    }
    case 'deleted': {
      return `${space(depth)}- ${node.key}: ${stringify(node.value, depth, stylish)}`;
    }
    case 'unchanged':
      return `${space(depth)}  ${node.key}: ${stringify(node.value, depth, stylish)}`;
    case 'changed': {
      const {
        key,
        value1,
        value2,
      } = node;
      const data1 = `${space(depth)}- ${key}: ${stringify(value1, depth, stylish)}`;
      const data2 = `${space(depth)}+ ${key}: ${stringify(value2, depth, stylish)}`;
      return `${data1}\n${data2}`;
    }
    default:
      throw new Error('Unknown state!');
  }
};

export default stylish;
