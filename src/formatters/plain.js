const format = (val) => {
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

const plain = (data) => {
  const iter = (children, parent) => {
    const diffColl = children.flatMap((node) => {
      const newPath = parent ? `${parent}.${node.name}` : `${node.name}`;
      console.log(`${parent}`)
      switch (node.type) {
        case 'nested':
          return iter(node.children, newPath);
        case 'deleted':
          return `Property '${newPath}' was removed`;
        case 'added':
          return `Property '${newPath}' was added with value: ${format(node.value2)}`;
        case 'changed':
          return `Property '${newPath}' was updated. From ${format(node.value1)} to ${format(node.value2)}`;
        default:
          return [];
      }
    });
    console.log(diffColl);
    return diffColl.join('\n');
  };
  const result = iter(data, '');
  return result;
};

export default plain;
