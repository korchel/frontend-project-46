import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');
const filePath3 = getFixturePath('file3.yml');
const filePath4 = getFixturePath('file4.yml');
const expectedResultForStylish = fs.readFileSync(getFixturePath('expectedResultForStylish.txt'), 'utf8');
const expectedResultForPlain = fs.readFileSync(getFixturePath('expectedResultForPlain.txt'), 'utf8');

const stylishTestData = [
  { file1: filePath1, file2: filePath2, expected: expectedResultForStylish },
  { file1: filePath3, file2: filePath4, expected: expectedResultForStylish },
  { file1: filePath1, file2: filePath4, expected: expectedResultForStylish },
];

const plainTestData = [
  { file1: filePath1, file2: filePath2, expected: expectedResultForPlain },
  { file1: filePath3, file2: filePath4, expected: expectedResultForPlain },
  { file1: filePath1, file2: filePath4, expected: expectedResultForPlain },
];

const jsonTestData = [
  { file1: filePath1, file2: filePath2 },
  { file1: filePath3, file2: filePath4 },
  { file1: filePath1, file2: filePath4 },
];

test.each(stylishTestData)('genDiff in $file1 and $file2 files in stylish format', ({ file1, file2, expected }) => {
  expect(genDiff(file1, file2)).toEqual(expected);
});

test.each(plainTestData)('genDiff in $file1 and $file2 files in plain format', ({ file1, file2, expected }) => {
  expect(genDiff(file1, file2, 'plain')).toEqual(expected);
});

test.each(jsonTestData)('genDiff in $file1 and $file2 files in json format', ({ file1, file2 }) => {
  const diff = genDiff(file1, file2, 'json');
  expect(() => JSON.parse(diff)).not.toThrow();
});
