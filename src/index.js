import _ from 'lodash';
import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

/* eslint no-underscore-dangle: 0 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getPath = (filename) => path.join(__dirname, '..', '__test__/__fixtures__', filename);

const getContentObj = (filepath) => {
  const filePath = path.isAbsolute(filepath) ? filepath : getPath(filepath);
  const readJson = fs.readFileSync(filePath);
  const content = JSON.parse(readJson);
  return content;
};

const genDiff = (pathFile1, pathFile2) => {
  const content1 = getContentObj(pathFile1);
  const content2 = getContentObj(pathFile2);
  const data1 = [];
  const data2 = [];

  _.forIn(content1, (value, key) => data1.push(`${value}: ${key}`));
  _.forIn(content2, (value, key) => data2.push(`${value}: ${key}`));

  const container = data1.concat(data2);
  const uniqArr = [...new Set(container)];

  // console.log('uniqArr', uniqArr);
  // console.log('data1', data1);
  // console.log('data2', data2);

  const result = uniqArr.map((item) => {
    if (data1.includes(item) && !data2.includes(item)) return `- ${item}`;
    if (!data1.includes(item) && data2.includes(item)) return `+ ${item}`;
    return ` ${item}`;
  });

  // console.log('result', result);
  return result.join('\n');
};

export default genDiff;
