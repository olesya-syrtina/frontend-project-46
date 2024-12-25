import yaml from 'js-yaml';

const parse = (data, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported file extension: ${extension}`);
  }
};

export default parse;
