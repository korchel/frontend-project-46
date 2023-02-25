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

test.each(testFormats)('genDiff in %s files', (format) => {
  const filepath1 = getFixturePath(`file1.${format}`);
  const filepath2 = getFixturePath(`file2.${format}`);
  const diff = genDiff(filepath1, filepath2, 'json');

  expect(genDiff(filepath1, filepath2)).toEqual(expectedResultForStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedResultForPlain);
  expect(() => JSON.parse(diff)).not.toThrow();
});
