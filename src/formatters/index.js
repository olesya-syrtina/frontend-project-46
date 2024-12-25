import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: (diff) => JSON.stringify(diff, null, 2),
};

const getFormatter = (formatName) => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: '${formatName}'`);
  }
  return formatters[formatName];
};

export default getFormatter;
