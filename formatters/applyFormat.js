import _ from 'lodash';
import applyStylishFormat from './stylish.js';

const getKeyStatus = (key, object1, object2) => {
  if (_.has(object1, key) && _.has(object2, key)) {
    if (_.isEqual(object1[key], object2[key])) {
      return 'unchanged';
    }
    return 'changed';
  } if (!_.has(object1, key)) {
    return 'added';
  }
  return 'deleted';
};

const stringifyObject = (object) => {
  const iter = (data, level) => {
    const entries = _.sortBy(Object.entries(data), (entry) => entry[0][2]);
    const entriesToStrings = entries.map(([key, value]) => {
      if (_.isObject(value)) {
        return `${key}: ${iter(value, level + 1)}`;
      }
      return `${key}: ${value}`;
    });
    const currentIndent = '  '.repeat(level + 1);
    const closingBracketIndent = '  '.repeat(level);
    return `{\n${currentIndent}${entriesToStrings.join(`\n${currentIndent}`)}\n${closingBracketIndent}}`;
  };
  return iter(object, 0);
};

const applyFormat = (object1, object2, format) => {
  switch (format) {
    case 'stylish':
      return stringifyObject(applyStylishFormat(object1, object2));
    default:
      return 'Unknown format';
  }
};

export { getKeyStatus, applyFormat };
