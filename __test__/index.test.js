/* eslint-disable no-undef */
import { genDiff } from '../src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir ='__fixtures__'
const getFixturePath = (filename) => path.join(__dirname, dir, filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('genDiff JSON', () => {
  const path1 = readFile('file1.json');
  const path2 = readFile('file2.json');
  const correctResult = readFile('resultJson.txt');
  expect(genDiff(path1, path2)).toEqual(correctResult);
})
