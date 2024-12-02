import parse from './parser.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  console.log(data1);
  console.log(data2);
  return null;//Реализовать потом
};

export default genDiff;

