import fs from 'fs';
import path from 'path';

const parse = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const extention = path.extname(absolutePath);

  switch (extention) {
    case '.json':
      return JSON.parse(fileContent);
    default:
      throw new Error(`Unsupported file format: ${extention}`);
  }
};

export default parse;
