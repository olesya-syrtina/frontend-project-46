import getFormatter from './formatters/index.js';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const diffTree = buildDiff(data1, data2);
  const format = getFormatter(formatName);

  return format(diffTree);
};

export default genDiff;
