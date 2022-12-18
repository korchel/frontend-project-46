import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');
const filePath3 = getFixturePath('file3.yml');
const filePath4 = getFixturePath('file4.yml');
const expectedResult = fs.readFileSync(getFixturePath('expectedResult.txt'), 'utf8');

test('genDiff in json files', () => {
  expect(genDiff(filePath1, filePath2)).toEqual(expectedResult);
});

test('genDiff in yaml files', () => {
  expect(genDiff(filePath3, filePath4)).toEqual(expectedResult);
});

test('genDiff in yaml and json files', () => {
  expect(genDiff(filePath1, filePath4)).toEqual(expectedResult);
});
