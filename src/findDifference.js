import _ from 'lodash';

const getKeyStatus = (key, object1, object2) => {
  if (_.has(object1, key) && _.has(object2, key)) {
    if (object1[key] === object2[key]) {
      return 'unchanged';
    }
    return 'changed';
  } if (!_.has(object1, key)) {
    return 'added';
  }
  return 'deleted';
};

const findDifference = (object1, object2) => {
  const keys = _.union(_.keys(object1), _.keys(object2));
  const diff = keys.reduce((acc, key) => {
    const checkKey = getKeyStatus(key, object1, object2);
    switch (checkKey) {
      case 'unchanged':
        acc[`  ${key}`] = object1[key];
        break;
      case 'changed':
        acc[`- ${key}`] = object1[key];
        acc[`+ ${key}`] = object2[key];
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

export default findDifference;
