const getIndent = (currentDepth, multiplier = 4) => ' '.repeat(currentDepth * multiplier - 2);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  const indent = getIndent(depth);
  const indentClose = getIndent(depth - 1);
  const entries = Object.entries(value);
  const result = entries.map(([key, innerValue]) => `${indent}  ${key}: ${stringify(innerValue, depth + 1)}`);
  return ['{', ...result, `${indentClose}  }`].join('\n);
};

const mapper = {
  nested: ({ name, children }, depth, fn) => `${getIndent(depth)}  ${name}: {\n${fn(children, depth + 1)}\n${getIndent(depth)}  }`,
  added: ({ name, value }, depth) => `${getIndent(depth)}+ ${name}: ${stringify(value, depth + 1)}`,
  deleted: ({ name, value }, depth) => `${getIndent(depth)}- ${name}: ${stringify(value, depth + 1)}`,
  changed: ({ name, value1, value2 }, depth) => {
    const oldVal = `${getIndent(depth)}- ${name}: `;
    const newVal = `${getIndent(depth)}+ ${name}: `;
    return `${oldVal}${stringify(value1, depth + 1)}\n${newVal}${stringify(value2, depth + 1)}`;
  },
  unchanged: ({ name, value }, depth) => `${getIndent(depth)}  ${name}: ${stringify(value, depth + 1)}`,
};

export default (tree) => {
  const iter = (ast, depth) => ast.map((node) => mapper[node.type](node, depth, iter)).join('\n');
  return `{\n${iter(tree, 1)}\n}`;
};
