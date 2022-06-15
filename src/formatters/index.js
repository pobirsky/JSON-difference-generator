import stylish from './stylish.js';

const formatters = { stylish };

const getFormat = (diff, format) => {
  const formatter = formatters[format];
  return formatter(diff);
};

export default getFormat;
