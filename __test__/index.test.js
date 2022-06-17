/* eslint-disable no-undef */

import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(dirname, '..', '__test__/__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('genDiffTestDefault', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const correctJs = readFile('resultJson.txt');
  expect(genDiff(path1, path2)).toEqual(correctJs);
});

test('genDiffTestPlain', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const correctJs = readFile('correctPlain.txt');
  expect(genDiff(path1, path2, 'plain')).toEqual(correctJs);
});

// test('ACT test', () => {
//   const obj1 = getContentObj('file1.json');
//   const obj2 = getContentObj('file2.json');
//   const AST = JSON.stringify(buildDiff(obj1, obj2),null,2);
//   const result = readFile('correctACT.txt');
//   expect(AST).toEqual(result);
// });
