import applyStylishFormat from './stylish.js';
import applyPlainFormat from './plain.js';

const applyFormat = (diffTree, format) => {
  switch (format) {
    case 'stylish':
      return applyStylishFormat(diffTree);
    case 'plain':
      return applyPlainFormat(diffTree);
    case 'json':
      return JSON.stringify(diffTree);
    default:
      throw new Error(`Unknown format ${format}`);
  }
};

export default applyFormat;
