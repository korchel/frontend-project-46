import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const expectedResult = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');
const filePath3 = getFixturePath('file3.yml');
const filePath4 = getFixturePath('file4.yml');

test('genDiff in flat json files', () => {
  expect(genDiff(filePath1, filePath2)).toEqual(expectedResult);
});

test('genDiff in flat yaml files', () => {
  expect(genDiff(filePath3, filePath4)).toEqual(expectedResult);
});

test('genDiff in flat yaml and json files', () => {
  expect(genDiff(filePath1, filePath4)).toEqual(expectedResult);
});
