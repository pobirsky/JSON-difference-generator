const format = (val) => {
  if (typeof val === 'object') {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  if (val === null) {
    return null;
  }
  return val;
};

const plain = (data) => {
  const iter = (children, parent) => {
    const diffColl = children.map((node) => {
      const newPath = parent ? `${parent}.${node.name}` : `${node.name}`;
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
          return '';
      }
    });
    console.log(diffColl, children)
    return diffColl.join('\n');
  };
  const result = iter(data, 'data');
  return result;
};

export default plain;
