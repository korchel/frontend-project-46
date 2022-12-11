import { load } from 'js-yaml';

const parse = (file, fileType) => {
  if (fileType === 'json') {
    return JSON.parse(file);
  }
  if (fileType === 'yml' || fileType === 'yaml') {
    return load(file);
  }
  return 'Unknown file type';
};

export default parse;
