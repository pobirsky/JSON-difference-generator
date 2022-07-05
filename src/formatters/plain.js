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

const newPath = (depth, current) => (depth === '' ? current : depth.concat(`.${current}`));

const mapper = {
  nested: ({ name, children }, depth, fn) => fn(children, newPath(depth, name)),
  added: ({ name, value }, depth) => `Property '${newPath(depth, name)}' was added with value: ${stringify(value)}`,
  removed: ({ name }, depth) => `Property '${newPath(depth, name)}' was removed`,
  changed: ({ name, value1, value2 }, depth) => `Property '${newPath(depth, name)}' was updated. From ${stringify(value1)} to ${stringify(value2)}`,
  unchanged: () => null,
};

export default (data) => {
  const iter = (ast, depth) => ast.map((node) => mapper[node.type](node, depth, iter)).join('\n');
  // JSON.stringify(ast, null, 4);
  return iter(data, '');
};
