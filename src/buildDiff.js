import _ from 'lodash';

const buildDiff = (config1, config2) => {
  const iter = (object1, object2, key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (_.has(object1, key) && !_.has(object2, key)) {
      return {
        name: key,
        type: 'deleted',
        value1,
        value2: null,
      };
    }

    if (!_.has(object1, key) && _.has(object2, key)) {
      return {
        name: key,
        type: 'added',
        value1: null,
        value2,
      };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value1)) {
      return {
        name: key,
        type: 'nested',
        children: buildDiff(value1, value2),
      };
    }

    if (!_.isEqual(value1, value2)) {
      return {
        name: key,
        type: 'changed',
        value1,
        value2,
      };
    }

    return { name: key, type: 'unchanged', value1 };
  };

  const keys = _.union(Object.keys(config1), Object.keys(config2));
  // console.log(keys);
  const result = keys.map((key) => iter(config1, config2, key));
  // console.log(result);
  // console.log(JSON.stringify(result, null, " "));
  return result;
};

export default buildDiff;
