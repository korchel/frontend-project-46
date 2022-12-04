import _ from 'lodash';

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

export default stringifyObject;
