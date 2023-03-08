#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../index.js';

const program = new Command();

program
  .version('output the version number')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', '<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, { format }) => console.log(genDiff(filepath1, filepath2, format)))
  .parse();
