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
        node.value2 = object1[key];
        return node;
      case 'updated':
        node.name = key;
        node.status = keyStatus;
        node.value1 = object1[key];
        node.value2 = (_.isObject(object1[key]) && _.isObject(object2[key])
          ? buildASTs(object1[key], object2[key])
          : object2[key]);
        return node;
      case 'added':
        node.name = key;
        node.status = keyStatus;
        node.value2 = object2[key];
        return node;
      case 'removed':
        node.name = key;
        node.status = keyStatus;
        node.value1 = object1[key];
        return node;
      default:
        throw new Error('There is no such key status!');
    }
  }, {});
  return astTrees;
};

export default buildASTs;
