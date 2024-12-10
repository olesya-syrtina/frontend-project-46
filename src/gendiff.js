import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import stylish from './stylish.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const diff = buildDiff(data1, data2);

  return stylish(diff);
};

export default genDiff;
