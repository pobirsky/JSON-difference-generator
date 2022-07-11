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

const getFullPath = (parents, current) => (parents === '' ? current : [parents, current].join('.'));

const mapper = {
  nested: ({ key, children }, depth, fn) => fn(children, getFullPath(depth, key)),
  added: ({ key, value }, depth) => `Property '${getFullPath(depth, key)}' was added with value: ${stringify(value)}`,
  deleted: ({ key }, depth) => `Property '${getFullPath(depth, key)}' was removed`,
  changed: ({ key, value1, value2 }, depth) => `Property '${getFullPath(depth, key)}' was updated. From ${stringify(value1)} to ${stringify(value2)}`,
};

export default (tree) => {
  const iter = (ast, depth) => ast
    .filter((node) => node.type !== 'unchanged')
    .map((node) => mapper[node.type](node, depth, iter)).join('\n');
  return iter(tree, '');
};
