import {fileURLToPath} from 'url';
import fs from 'fs';
import path from 'path';
import buildDiff from "../src/buildDiff.js";
import parse from "../src/bin/parser.js";
import genDiff from "../src/index.js";
import {getContentObj} from "../src/index.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(dirname, '..', '__test__/__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

// const obj1JSON = JSON.stringify(getContentObj('file1.json'), null, 2)
// const obj2JSON = JSON.stringify(getContentObj('file2.json'), null, 2)


// console.log('obj1', obj1)
// console.log(JSON.stringify(AST, null, 2))
// console.log(result);



