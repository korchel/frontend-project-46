import applyStylishFormat from './stylish.js';
import applyPlainFormat from './plain.js';
import buildASTs from '../buildASTs.js';

const applyFormat = (object1, object2, format) => {
  const trees = buildASTs(object1, object2);
  switch (format) {
    case 'stylish':
      return applyStylishFormat(trees);
    case 'plain':
      return applyPlainFormat(trees);
    case 'json':
      return JSON.stringify(trees);
    default:
      throw new Error(`Unknown format ${format}`);
  }
};

export default applyFormat;
