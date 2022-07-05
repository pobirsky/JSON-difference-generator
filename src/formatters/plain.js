const stringify = (val) => {
  if (val === null) {
    return null;
  }
  if (typeof val === 'object') {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return val;
};

const newPath = (parent, current) => (parent === '' ? current : parent.concat(`.${current}`));

const mapper = {
  nested: ({ name, children }, depth, fn) => fn(children, newPath(depth, name)),
  added: ({ name, value }, depth) => `Property '${newPath(depth, name)}' was added with value: ${stringify(value)}`,
  deleted: ({ name }, depth) => `Property '${newPath(depth, name)}' was removed`,
  changed: ({ name, value1, value2 }, depth) => `Property '${newPath(depth, name)}' was updated. From ${stringify(value1)} to ${stringify(value2)}`,
};

export default (tree) => {
  const iter = (ast, depth) => ast
    .filter((node) => node.type !== 'unchanged')
    .map((node) => mapper[node.type](node, depth, iter)).join('\n');
  return iter(tree, '');
};
