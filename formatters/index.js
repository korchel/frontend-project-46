import _ from 'lodash';
import applyStylishFormat from './stylish.js';
import applyPlainFormat from './plain.js';
import buildASTs from './buildASTs.js';

const applyFormat = (object1, object2, format) => {
  switch (format) {
    case 'stylish':
      return applyStylishFormat(buildASTs(object1, object2));
    case 'plain':
      return applyPlainFormat(buildASTs(object1, object2));
    default:
      return 'Unknown format';
  }
};

export default applyFormat;
