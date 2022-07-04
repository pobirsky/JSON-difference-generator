import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
  json: (data) => JSON.stringify(data, null, 2),
};

export default (tree, format = 'stylish') => {
  if (!_.has(formatters, format)) {
    throw new Error(`Wrong format ${format}. Use only plain, json, stylish`);
  }
  return formatters[format](tree);
};
