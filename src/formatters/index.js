import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatJson = (diff) => JSON.stringify(diff, null, 2);

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

const getFormatter = (formatName) => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: '${formatName}'`);
  }
  return formatters[formatName];
};

export default getFormatter;
