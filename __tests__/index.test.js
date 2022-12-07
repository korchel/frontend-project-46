import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import {dirname} from 'path';
import genDiff from '../src/index.js';


const expectedResult = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filePath1 = getFixturePath('file1.json')
const filePath2 = getFixturePath('file2.json')
console.log(filePath1)
console.log(genDiff(filePath1, filePath2))
test('genDiff', () => {
  expect(genDiff(filePath1, filePath2)).toEqual(expectedResult);
});

