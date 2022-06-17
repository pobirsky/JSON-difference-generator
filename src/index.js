import fs from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'path';
import parse from './bin/parser.js';
import buildTree from './buildDiff.js';
import getFormat from './formatters/index.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const getPath = (filename) => path.join(dirname, '..', '__test__/__fixtures__', filename);

const getContentObj = (filepath) => {
  const filePath = path.isAbsolute(filepath) ? filepath : getPath(filepath);
  const fileContent = fs.readFileSync(filePath);
  const extension = path.extname(filePath);
  return parse(fileContent, extension);
};

const genDiff = (path1, path2, format = 'stylish') => {
  const file1 = getContentObj(path1);
  const file2 = getContentObj(path2);

  const diff = buildTree(file1, file2);
  const diffFormat = getFormat(diff, format);
  return diffFormat;
};

export default genDiff;
export {getContentObj};
