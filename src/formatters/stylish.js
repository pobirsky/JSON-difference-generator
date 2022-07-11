import _ from 'lodash';

const getIndent = (currentDepth, multiplier = 4) => ' '.repeat(currentDepth * multiplier - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const indent = getIndent(depth);
  const entries = Object.entries(value).map(([key, innerValue]) => `${indent}  ${key}: ${stringify(innerValue, depth + 1)}`);
  return `{\n${entries.join('\n')}\n${indent}  }`;
};

const mapper = {
  nested: ({ key, children }, depth, fn) => `${getIndent(depth)}  ${key}: {\n${fn(children, depth + 1)}\n${getIndent(depth)}  }`,
  added: ({ key, value }, depth) => `${getIndent(depth)}+ ${key}: ${stringify(value, depth)}`,
  deleted: ({ key, value }, depth) => `${getIndent(depth)}- ${key}: ${stringify(value, depth)}`,
  changed: ({ key, value1, value2 }, depth) => {
    const oldValue = `${getIndent(depth)}- ${key}: `;
    const newValue = `${getIndent(depth)}+ ${key}: `;
    return `${oldValue}${stringify(value1, depth)}\n${newValue}${stringify(value2, depth)}`;
  },
  unchanged: ({ key, value }, depth) => `${getIndent(depth)}  ${key}: ${stringify(value, depth)}`,
};

export default (tree) => {
  const iter = (ast, depth) => ast.map((node) => mapper[node.type](node, depth, iter)).join('\n');
  return `{\n${iter(tree, 1)}\n}`;
};
