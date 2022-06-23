import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const iter = (obj1, obj2, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(data1, key)) {
      return {
        name: key,
        type: 'added',
        value: value2,
      };
    }

    if (!_.has(data2, key)) {
      return {
        name: key,
        type: 'deleted',
        value: value1,
      };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
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

    return { name: key, type: 'unchanged', value: value1 };
  };

  const sortedKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  return sortedKeys.map((key) => iter(data1, data2, key));
};

export default buildDiff;
