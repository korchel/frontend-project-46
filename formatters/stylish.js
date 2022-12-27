import _ from 'lodash';
import { getKeyStatus } from './applyFormat.js';

const applyStylishFormat = (object1, object2) => {
  const keys = _.union(_.keys(object1), _.keys(object2));
  const diff = keys.reduce((acc, key) => {
    const checkKey = getKeyStatus(key, object1, object2);
    switch (checkKey) {
      case 'unchanged':
        acc[`  ${key}`] = object1[key];
        break;
      case 'changed':
        if (_.isObject(object1[key])) {
          acc[`  ${key}`] = applyStylishFormat(object1[key], object2[key]);
        } else {
          acc[`- ${key}`] = object1[key];
          acc[`+ ${key}`] = object2[key];
        }
        break;
      case 'added':
        acc[`+ ${key}`] = object2[key];
        break;
      case 'deleted':
        acc[`- ${key}`] = object1[key];
        break;
      default:
        return 'no such key';
    }
    return acc;
  }, {});
  return diff;
};

export default applyStylishFormat;
