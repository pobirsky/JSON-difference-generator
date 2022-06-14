import stylish from './stylish';

const getFormat = (diff, format) => {
  const formatters = {
    stylish,
  };
  const formatter = formatters[format];
  return formatter(diff);
};

export default getFormat;
