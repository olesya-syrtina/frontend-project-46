import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yml'];
const expectedStylish = readFile('expectedStylish.txt').trim();
const expectedPlain = readFile('expectedPlain.txt').trim();
const expectedJson = readFile('expectedJson.txt').trim();

test.each(formats)('genDiff compares nested %s files correctly in stylish format', (format) => {
  const file1Path = getFixturePath(`file1.${format}`);
  const file2Path = getFixturePath(`file2.${format}`);
  expect(genDiff(file1Path, file2Path)).toBe(expectedStylish);
});

test.each([
  ['plain', expectedPlain],
  ['json', expectedJson],
])('genDiff compares files with %s format', (format, expected) => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const result = genDiff(file1Path, file2Path, format);
  expect(result).toBe(expected);
});
