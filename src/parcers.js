import { load } from 'js-yaml';

const parse = (data, dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return load(data);
    case 'yaml':
      return load(data);
    default:
      throw new Error(`Unknown data type ${dataType}`);
  }
};

export default parse;
