/* eslint-disable no-undef */
import genDiff from '../src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__test__/__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('genDiffTest', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const correctJs = readFile('resultJson.txt');
  expect(genDiff(path1, path2)).toEqual(correctJs);
});

test('genDiff ext-yml, ext-yaml', () => {
  const path1 = getFixturePath('file1.yml')
  const path2 = getFixturePath('file2.yml')
  const correctYml = readFile('correctYml.txt');
  expect(genDiff(path1, path2)).toEqual(correctYml);
});
