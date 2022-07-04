import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const renderActions = {
  stylish,
  plain,
  json: (data) => JSON.stringify(data, null, 2),
};

export default (tree, format = 'stylish') => {
  if (!_.has(renderActions, format)) {
    throw new Error(`Wrong format ${format}. Use only plain, json, stylish`);
  }
  return renderActions[format](tree);
};
