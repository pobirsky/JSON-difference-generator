const getIndent = (currentDepth, multiplier = 4) => ' '.repeat(currentDepth * multiplier - 2);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  const indent = getIndent(depth);
  const indentClose = getIndent(depth - 1);

  const entries = Object.entries(value);

  const result = entries.map(
    ([key, innerValue]) => `${indent}  ${key}: ${stringify(innerValue, depth + 1)}`,
  );
  return ['{', ...result, `${indentClose}  }`].join('\n');
};

const sign = {
  added: '+',
  deleted: '-',
  unchanged: ' ',
};

const formatter = (tree) => {
  const iter = (node, depth) => {
    const arrMap = node.map((key) => {
      const indent = getIndent(depth);

      const makeLine = (value, mark) => `${indent}${mark} ${key.name}: ${stringify(value, depth + 1)}`;

      switch (key.type) {
        case 'unchanged': {
          return makeLine(key.value, sign.unchanged);
        }
        case 'deleted': {
          return makeLine(key.value, sign.deleted);
        }
        case 'added': {
          return makeLine(key.value, sign.added);
        }
        case 'changed': {
          return `${makeLine(key.value1, sign.deleted)}\n${makeLine(key.value2, sign.added)}`;
        }
        default: {
          return `${indent}  ${key.name}: {\n${iter(key.children, depth + 1)}\n${indent}  }`;
        }
      }
    });
    return arrMap.join('\n');
  };
  return `{\n${iter(tree, 1)}\n}`;
};

export default formatter;
