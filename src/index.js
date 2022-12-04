import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import findDifference from './findDifference.js';
import stringifyObject from './stringifyObject.js';

const genDiff = (filePath1, filePath2) => {
  const object1 = JSON.parse(readFileSync(resolve(cwd(), filePath1)));
  const object2 = JSON.parse(readFileSync(resolve(cwd(), filePath2)));
  const difference = findDifference(object1, object2);
  const objectsAsString = stringifyObject(difference);
  console.log(objectsAsString);
};

export default genDiff;
