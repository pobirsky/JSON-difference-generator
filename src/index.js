import path from 'path';
import fs from 'fs';
import parse from './parser.js';
import buildTree from './buildDiff.js';
import diff from './formatters/index.js';

const getPath = (filePath) => path.resolve(process.cwd(), filePath);

const getData = (pathFile) => {
  const filePath = getPath(pathFile);
  const content = fs.readFileSync(filePath, 'utf-8');
  const extension = path.extname(filePath).slice(1);
  return {
    content,
    extension,
  };
};

const genDiff = (path1, path2, format) => {
  const data1 = getData(path1);
  const data2 = getData(path2);

  const file1 = parse(data1.content, data1.extension);
  const file2 = parse(data2.content, data2.extension);

  const tree = buildTree(file1, file2);
  return diff(tree, format);
};

export default genDiff;
export { getData };
