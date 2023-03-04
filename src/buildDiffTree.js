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

const buildDiffTree = (object1, object2) => {
  const keyNames = _.sortBy(_.union(_.keys(object1), _.keys(object2)));

  const diffTree = keyNames.map((keyName) => {
    const keyStatus = getKeyStatus(keyName, object1, object2);
    switch (keyStatus) {
      case 'unchanged':
        return {
          keyName, keyStatus, value: object1[keyName],
        };
      case 'updated':
        return {
          keyName,
          keyStatus,
          value1: object1[keyName],
          value2: (_.isObject(object1[keyName]) && _.isObject(object2[keyName])
            ? buildDiffTree(object1[keyName], object2[keyName])
            : object2[keyName]),
        };
      case 'added':
        return {
          keyName,
          keyStatus,
          value: (_.isObject(object1[keyName]) && _.isObject(object2[keyName])
            ? buildDiffTree(object1[keyName], object2[keyName])
            : object2[keyName]),
        };
      case 'removed':
        return {
          keyName,
          keyStatus,
          value: object1[keyName],
        };
      default:
        throw new Error(`Unknown treeKeyStatus ${keyStatus}`);
    }
  }, {});

  return diffTree;
};

export default buildDiffTree;
