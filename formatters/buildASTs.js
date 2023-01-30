import _ from 'lodash';

const getKeyStatus = (key, object1, object2) => {
  if (_.has(object1, key) && _.has(object2, key)) {
    if (_.isEqual(object1[key], object2[key])) {
      return 'unchanged';
    }
    return 'updated';
  }
  if (!_.has(object1, key)) {
    return 'added';
  }
  return 'removed';
};

const buildASTs = (object1, object2) => {
  const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));
  const astTrees = keys.map((key) => {
    const keyStatus = getKeyStatus(key, object1, object2);
    const node = {};
    switch (keyStatus) {
      case 'unchanged':
        node.name = key;
        node.status = keyStatus;
        node.currentValue = object1[key];
        return node;
      case 'updated':
        node.name = key;
        node.status = keyStatus;
        node.previousValue = object1[key];
        node.currentValue = (_.isObject(object1[key]) && _.isObject(object2[key])
          ? buildASTs(object1[key], object2[key])
          : object2[key]);
        return node;
      case 'added':
        node.name = key;
        node.status = keyStatus;
        node.currentValue = object2[key];
        return node;
      case 'removed':
        node.name = key;
        node.status = keyStatus;
        node.previousValue = object1[key];
        return node;
      default:
        return 'no such keySatus';
    }
  }, {});
  return astTrees;
};

export default buildASTs;
