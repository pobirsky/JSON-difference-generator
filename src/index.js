import path from 'path';
import fs from 'fs';
import parse from './parser.js';
import buildTree from './treeBuilder.js';
import diff from './formatters/index.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);

const getData = (pathFile) => {
  const filePath = getAbsolutePath(pathFile);
  const content = fs.readFileSync(filePath, 'utf-8');
  const extension = path.extname(filePath).slice(1);
  return parse(content, extension);
};

export default (path1, path2, format) => {
  const data1 = getData(path1);
  const data2 = getData(path2);

  const tree = buildTree(data1, data2);
  return diff(tree, format);
};

export { getData };
