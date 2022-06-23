import stylish from './stylish.js';
import plain from './plain.js';

const toJson = (data) => JSON.stringify(data, null, 2);

const renderActions = {
  stylish,
  plain,
  json: toJson,
};

export default (tree, format = 'stylish') => renderActions[format](tree);
