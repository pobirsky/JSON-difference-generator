#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../index.js';// eslint-disable-line import/extensions

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .option('-f, --format <type>', 'output format')
  .action((file1, file2) => {
    const diff = genDiff(file1, file2);
    // eslint-disable-line no-use-before-define
    console.log(diff);// eslint-disable-line no-console
  });

program.parse(process.argv);
