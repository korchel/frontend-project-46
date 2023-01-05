import _ from 'lodash';
import applyStylishFormat from './stylish.js';

const stringifyObject = (object) => {
  const iter = (data, level) => {
    const currentIndent = '  '.repeat(level);
    const closingBracketIndent = '  '.repeat(level - 1);
    const entries = Object.entries(data);
    const lines = entries.map(([key, value]) => {
      if (_.isObject(value)) {
        return `${currentIndent}${key}: ${iter(value, level + 2)}`;
      }
      return `${currentIndent}${key}: ${value}`;
    });
    return `{\n${lines.join('\n')}\n${closingBracketIndent}}`;
  };
  return iter(object, 1);
};

const applyFormat = (object1, object2, format) => {
  switch (format) {
    case 'stylish':
      return stringifyObject(applyStylishFormat(object1, object2));
    default:
      return 'Unknown format';
  }
};

export default applyFormat;
