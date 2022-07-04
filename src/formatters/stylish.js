const getIndent = (currentDepth, multiplier = 4) => ' '.repeat(currentDepth * multiplier - 2);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  const indent = getIndent(depth);
  const indentClose = getIndent(depth - 1, 4);

  const entries = Object.entries(value);

  const result = entries.map(([key, innerValue]) => {
    const tempString = `${indent}  ${key}: ${stringify(
      innerValue,
      depth + 1,
    )}`;
    return tempString;
  });
  return ['{', ...result, `${indentClose}  }`].join('\n');
};

const formatter = (tree) => {
  const iter = (node, depth) => {
    const arrMap = node.map((key) => {
      const indent = getIndent(depth);

      switch (key.type) {
        case 'nested': {
          const formattedChildren = iter(key.children, depth + 1);
          return `${indent}  ${key.name}: {\n${formattedChildren}\n${indent}  }`;
        }
        case 'unchanged': {
          return `${indent}  ${key.name}: ${stringify(
            key.value,
            depth + 1,
          )}`;
        }
        case 'deleted': {
          return `${indent}- ${key.name}: ${stringify(
            key.value,
            depth + 1,
          )}`;
        }
        case 'added': {
          return `${indent}+ ${key.name}: ${stringify(
            key.value,
            depth + 1,
          )}`;
        }
        default: {
          const formattedOldValue = `${indent}- ${key.name}: ${stringify(
            key.value1,
            depth + 1,
          )}\n`;
          const formattedNewValue = `${indent}+ ${key.name}: ${stringify(
            key.value2,
            depth + 1,
          )}`;
          return formattedOldValue + formattedNewValue;
        }
      }
    });
    return arrMap.join('\n');
  };
  return `{\n${iter(tree, 1)}\n}`;
};

export default formatter;
