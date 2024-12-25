import fs from 'fs';
import path from 'path';
import getFormatter from './formatters/index.js';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(absolutePath).slice(1);
  return { content, extension };
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const { content: content1, extension: extension1 } = readFile(filepath1);
  const { content: content2, extension: extension2 } = readFile(filepath2);

  const data1 = parse(content1, extension1);
  const data2 = parse(content2, extension2);

  const diffTree = buildDiff(data1, data2);
  const format = getFormatter(formatName);

  return format(diffTree);
};

export default genDiff;
