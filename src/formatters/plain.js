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

export default (data) => {
  const iter = (children, parent) => {
    const diffColl = children.flatMap((node) => {
      const newPath = parent ? `${parent}.${node.name}` : `${node.name}`;
      switch (node.type) {
        case 'nested':
          return iter(node.children, newPath);
        case 'deleted':
          return `Property '${newPath}' was removed`;
        case 'added':
          return `Property '${newPath}' was added with value: ${stringify(node.value)}`;
        case 'changed':
          return `Property '${newPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        default:
          return [];
      }
    });
    return diffColl.join('\n');
  };
  return iter(data, '');
};
