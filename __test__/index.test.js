/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';
import { getData } from '../src/index';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(dirname, '..', '__test__/__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('genDiffTestDefault', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const correctJs = readFile('correctJSON.txt');
  expect(genDiff(path1, path2)).toEqual(correctJs);
});

test('genDiffTestPlain', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const correct = readFile('correctPlain.txt');
  expect(genDiff(path1, path2, 'plain')).toEqual(correct);
});

test('genDiffTestDefaultYml', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yml');
  const correct = readFile('correctYml.txt');
  expect(genDiff(path1, path2)).toEqual(correct);
});

test('genDiffTestPlainYML', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yml');
  const correct = readFile('correctPlain.txt');
  expect(genDiff(path1, path2, 'plain')).toEqual(correct);
});
