import _ from 'lodash';
import fs from 'node:fs';

const pathFile1 = fs.readFileSync('../test/file1.json');
const pathFile2 = fs.readFileSync('../test/file2.json');

const gendiff = (file1, file2) => {
  file1 = JSON.parse(pathFile1);
  file2 = JSON.parse(pathFile2);

  const arrFile1 = [];
  const arrFile2 = [];

  _.forIn(file1, (value, key) => arrFile1.push(`${value}: ${key}`));
  _.forIn(file2, (value, key) => arrFile2.push(`${value}: ${key}`));
  // console.log('arrFile1', arrFile1);
  // console.log('arrFile2', arrFile2);

  const uniqArr = [...new Set(arrFile1, arrFile2)];
  // console.log('uniqArr', uniqArr);

  const result = uniqArr.map((item) => {
    if (arrFile1.includes(item) && arrFile2.includes(item)) return ` ${item}`;
    if (arrFile1.includes(item) && !arrFile2.includes(item)) return `+ ${item}`;
    return `- ${item}`;
  });

  // console.log('result', result);

  // console.log(result.join('/n'));
  return result.join('/n');
};

gendiff();
