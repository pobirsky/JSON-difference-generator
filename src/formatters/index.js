import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const toJson = (data) => JSON.stringify(data, null, 2);

const renderActions = {
  stylish,
  plain,
  json: toJson,
};

export default (tree, format = 'stylish') => {
  if (!_.has(renderActions, format)) {
    throw new Error(`Wrong format ${format}. Use only plain, json, stylish`);
  }
  return renderActions[format](tree);
};
