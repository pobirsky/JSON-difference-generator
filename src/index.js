import _ from 'lodash';
import fs from 'node:fs';
import path from 'path';

const getContentObj = (filepath) => {
  const absoluteFile = path.resolve(filepath);
  const read = fs.readFileSync(absoluteFile);
  const readJson = JSON.parse(read);
  return readJson;
};

const genDiff = (pathFile1, pathFile2) => {
  const content1 = getContentObj(pathFile1);
  const content2 = getContentObj(pathFile2);
  const data1 = [];
  const data2 = [];

  _.forIn(content1, (value, key) => data1.push(`${value}: ${key}`));
  _.forIn(content2, (value, key) => data2.push(`${value}: ${key}`));

  const uniqArr = [...new Set(data1, data2)];
  console.log('uniqArr', uniqArr);
  console.log('data1', data1);
  console.log('data2', data2);пше

  const result = uniqArr.map((item) => {
    if (data1.includes(item) && data2.includes(item)) return ` ${item}`;
    if (data1.includes(item) && !data2.includes(item)) return `+ ${item}`;
    if (!data1.includes(item) && data2.includes(item)) return `- ${item}`;
  });

  console.log('result', result);
  result.join('/n');
  return result;
};

export default genDiff;
