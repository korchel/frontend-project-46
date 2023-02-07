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
const expectedResultForStylish = fs.readFileSync(getFixturePath('expectedResultForStylish.txt'), 'utf8');
const expectedResultForPlain = fs.readFileSync(getFixturePath('expectedResultForPlain.txt'), 'utf8');
const expectedResultForJson = fs.readFileSync(getFixturePath('expectedResultForJson.txt'), 'utf8');

test('genDiff in json files in stylish format', () => {
  expect(genDiff(filePath1, filePath2)).toEqual(expectedResultForStylish);
});

test('genDiff in yaml files in stylish format', () => {
  expect(genDiff(filePath3, filePath4)).toEqual(expectedResultForStylish);
});

test('genDiff in yaml and json files in stylish format', () => {
  expect(genDiff(filePath1, filePath4)).toEqual(expectedResultForStylish);
});

test('genDiff in json files in plain format', () => {
  expect(genDiff(filePath1, filePath2, 'plain')).toEqual(expectedResultForPlain);
});

test('genDiff in yaml files in plain format', () => {
  expect(genDiff(filePath3, filePath4, 'plain')).toEqual(expectedResultForPlain);
});

test('genDiff in yaml and json files in plain format', () => {
  expect(genDiff(filePath1, filePath4, 'plain')).toEqual(expectedResultForPlain);
});

test('genDiff in json files in json format', () => {
  expect(genDiff(filePath1, filePath2, 'json')).toEqual(expectedResultForJson);
});

test('genDiff in yaml files in json format', () => {
  expect(genDiff(filePath3, filePath4, 'json')).toEqual(expectedResultForJson);
});

test('genDiff in yaml and json files in json format', () => {
  expect(genDiff(filePath1, filePath4, 'json')).toEqual(expectedResultForJson);
});
