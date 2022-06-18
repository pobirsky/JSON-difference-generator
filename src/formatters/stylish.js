const getTab = (currentDepth, multiplier = 4) => {
  const space = ' ';
  const result = space.repeat(currentDepth * multiplier - 2);
  return result;
};

const getFormattedValue = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  const tab = getTab(depth, 4);
  const tabClose = getTab(depth - 1, 4);

  const entries = Object.entries(value);

  const result = entries.map(([key, innerValue]) => {
    const tempString = `${tab}  ${key}: ${getFormattedValue(innerValue, depth + 1)}`;
    return tempString;
  });
  return ['{', ...result, `${tabClose}  }`].join('\n');
};

const formatter = (tree) => {
  const iter = (node, depth) => {
    const arrMap = node.map((key) => {
      const tab = getTab(depth);

      switch (key.type) {
        case 'nested': {
          const formattedChildren = iter(key.children, depth + 1);
          return `${tab}  ${key.name}: {\n${formattedChildren}\n${tab}  }`;
        }
        case 'unchanged': {
          return `${tab}  ${key.name}: ${getFormattedValue(
            key.value1,
            depth + 1,
          )}`;
        }
        case 'deleted': {
          return `${tab}- ${key.name}: ${getFormattedValue(
            key.value1,
            depth + 1,
          )}`;
        }
        case 'added': {
          return `${tab}+ ${key.name}: ${getFormattedValue(
            key.value2,
            depth + 1,
          )}`;
        }
        case 'changed': {
          const formattedOldValue = `${tab}- ${key.name}: ${getFormattedValue(
            key.value1,
            depth + 1,
          )}\n`;
          const formattedNewValue = `${tab}+ ${key.name}: ${getFormattedValue(
            key.value2,
            depth + 1,
          )}`;
          return formattedOldValue + formattedNewValue;
        }
        default: {
          return 'kek';
        }
      }
    });
    return arrMap.join('\n');
  };
  const result = `{\n${iter(tree, 1)}\n}`;
  return result;
};

export default formatter;
