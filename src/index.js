import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import findDifference from './findDifference.js';
import stringifyObject from './stringifyObject.js';
import parse from './parcers.js';

const genDiff = (filePath1, filePath2) => {
  const file1 = readFileSync(resolve(cwd(), filePath1));
  const file2 = readFileSync(resolve(cwd(), filePath2));
  const fileType1 = filePath1.split('.').pop();
  const fileType2 = filePath2.split('.').pop();
  const object1 = parse(file1, fileType1);
  const object2 = parse(file2, fileType2);
  const difference = findDifference(object1, object2);
  const objectsAsString = stringifyObject(difference);
  return objectsAsString;
};

export default genDiff;