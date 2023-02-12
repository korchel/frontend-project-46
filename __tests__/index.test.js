import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedResultForStylish = fs.readFileSync(getFixturePath('expectedResultForStylish.txt'), 'utf8');
const expectedResultForPlain = fs.readFileSync(getFixturePath('expectedResultForPlain.txt'), 'utf8');

const testFormats = ['json', 'yml'];

test.each(testFormats)('genDiff in $format files in stylish format', (format) => {
  const filepath1 = getFixturePath(`file1.${format}`);
  const filepath2 = getFixturePath(`file2.${format}`);
  expect(genDiff(filepath1, filepath2)).toEqual(expectedResultForStylish);
});

test.each(testFormats)('genDiff in $format files in plain format', (format) => {
  const filepath1 = getFixturePath(`file1.${format}`);
  const filepath2 = getFixturePath(`file2.${format}`);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedResultForPlain);
});

test.each(testFormats)('genDiff in $format files in json format', (format) => {
  const filepath1 = getFixturePath(`file1.${format}`);
  const filepath2 = getFixturePath(`file2.${format}`);
  const diff = genDiff(filepath1, filepath2, 'json');
  expect(() => JSON.parse(diff)).not.toThrow();
});
