import applyStylishFormat from './stylish.js';
import applyPlainFormat from './plain.js';
import buildASTs from './buildASTs.js';
import applyJSONFormat from './json.js';

const applyFormat = (object1, object2, format) => {
  const trees = buildASTs(object1, object2);
  switch (format) {
    case 'stylish':
      return applyStylishFormat(trees);
    case 'plain':
      return applyPlainFormat(trees);
    case 'json':
      return applyJSONFormat(trees);
    default:
      return 'Unknown format';
  }
};

export default applyFormat;
