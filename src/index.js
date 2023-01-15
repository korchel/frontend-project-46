import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import applyFormat from '../formatters/index.js';
import parse from './parcers.js';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1 = readFileSync(resolve(cwd(), filePath1));
  const file2 = readFileSync(resolve(cwd(), filePath2));
  const fileType1 = filePath1.split('.').pop();
  const fileType2 = filePath2.split('.').pop();
  const object1 = parse(file1, fileType1);
  const object2 = parse(file2, fileType2);
  const diff = applyFormat(object1, object2, format);
  return diff;
};

console.log(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish'));

export default genDiff;
