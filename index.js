import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import applyFormat from './src/formatters/index.js';
import parse from './src/parcers.js';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1 = readFileSync(path.resolve(cwd(), filePath1));
  const file2 = readFileSync(path.resolve(cwd(), filePath2));
  const fileType1 = path.extname(filePath1).substring(1);
  const fileType2 = path.extname(filePath2).substring(1);
  const object1 = parse(file1, fileType1);
  const object2 = parse(file2, fileType2);
  const diff = applyFormat(object1, object2, format);
  return diff;
};

export default genDiff;
