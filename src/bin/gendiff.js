#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../index.js';// eslint-disable-line import/extensions

const program = new Command();

program

  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format));
  });
program.parse();
