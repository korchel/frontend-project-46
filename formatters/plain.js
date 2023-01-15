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



const applyPlainFormat = (object1, object2) => {
  const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)), (key) => key);

  return diff;
};
