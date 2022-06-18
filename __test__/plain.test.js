import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/diff.js';
import parse from '../src/parsers.js';
import plainer from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathBuilder = (name) => path.join(__dirname, '..', '__fixtures__', name);

test('adding values', () => {
  const obj1 = parse(pathBuilder('plain-add1.json'));
  const obj2 = parse(pathBuilder('plain-add2.json'));
  const etalon = "Property 'setting4' was added with value: 'blah blah'";
  expect(plainer(genDiff(obj1, obj2))).toEqual(etalon);
});

test('removing values', () => {
  const obj1 = parse(pathBuilder('plain-remove1.json'));
  const obj2 = parse(pathBuilder('plain-remove2.json'));
  const etalon = "Property 'setting3' was removed";
  expect(plainer(genDiff(obj1, obj2))).toEqual(etalon);
});

test('updating values', () => {
  const obj1 = parse(pathBuilder('plain-update1.json'));
  const obj2 = parse(pathBuilder('plain-update2.json'));
  const etalon = "Property 'nest' was updated. From [complex value] to null";
  expect(plainer(genDiff(obj1, obj2))).toEqual(etalon);
});

test('unchange and path of keys', () => {
  const obj1 = parse(pathBuilder('plain-unchange1.json'));
  const obj2 = parse(pathBuilder('plain-unchange2.json'));
  const etalon = "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'";
  expect(plainer(genDiff(obj1, obj2))).toEqual(etalon);
});
