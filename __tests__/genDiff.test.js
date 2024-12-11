import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff compares nested JSON files correctly', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const expected = readFile('expectedStylish.txt').trim();
  expect(genDiff(file1Path, file2Path)).toBe(expected);
});

test('genDiff compares nested YAML files correctly', () => {
  const file1Path = getFixturePath('file1.yml');
  const file2Path = getFixturePath('file2.yml');
  const expected = readFile('expectedStylish.txt').trim();
  expect(genDiff(file1Path, file2Path)).toBe(expected);
});

test('genDiff with plain format', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const result = genDiff(file1Path, file2Path, 'plain');
  const expected = readFile('expectedPlain.txt').trim();
  expect(result).toEqual(expected.trim());
});

test('gendiff with json format', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const diff = genDiff(file1Path, file2Path, 'json');
  const expected = readFile('expectedJson.txt').trim();
  expect(diff).toBe(expected);
});
