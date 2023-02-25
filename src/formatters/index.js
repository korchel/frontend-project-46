import applyStylishFormat from './stylish.js';
import applyPlainFormat from './plain.js';

const applyFormat = (ASTs, format) => {
  switch (format) {
    case 'stylish':
      return applyStylishFormat(ASTs);
    case 'plain':
      return applyPlainFormat(ASTs);
    case 'json':
      return JSON.stringify(ASTs);
    default:
      throw new Error(`Unknown format ${format}`);
  }
};

export default applyFormat;
