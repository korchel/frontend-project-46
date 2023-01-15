import _ from 'lodash';

const getKeyStatus = (key, object1, object2) => {
  if (_.has(object1, key) && _.has(object2, key)) {
    if (_.isEqual(object1[key], object2[key])) {
      return 'unchanged';
    }
    return 'changed';
  }
  if (!_.has(object1, key)) {
    return 'added';
  }
  return 'deleted';
};

const applyStylishFormat = (object1, object2) => {
  const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)), (key) => key);
  const diff = keys.reduce((acc, key) => {
    const keyStatus = getKeyStatus(key, object1, object2);
    switch (keyStatus) {
      case 'unchanged':
        acc[`  ${key}`] = _.isObject(object1[key]) ? applyStylishFormat(object1[key], object1[key]) : object1[key];
        break;
      case 'changed':
        if ((_.isObject(object1[key]) && _.isObject(object2[key]))) {
          acc[`  ${key}`] = applyStylishFormat(object1[key], object2[key]);
        } else {
          acc[`- ${key}`] = _.isObject(object1[key]) ? applyStylishFormat(object1[key], object1[key]) : object1[key];
          acc[`+ ${key}`] = _.isObject(object2[key]) ? applyStylishFormat(object2[key], object2[key]) : object2[key];
        }
        break;
      case 'added':
        acc[`+ ${key}`] = _.isObject(object2[key]) ? applyStylishFormat(object2[key], object2[key]) : object2[key];
        break;
      case 'deleted':
        acc[`- ${key}`] = _.isObject(object1[key]) ? applyStylishFormat(object1[key], object1[key]) : object1[key];
        break;
      default:
        return 'no such keySatus';
    }
    return acc;
  }, {});
  return diff;
};

export default applyStylishFormat;
