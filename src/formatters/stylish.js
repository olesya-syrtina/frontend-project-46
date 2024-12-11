import _ from 'lodash';

const indent = (depth, spaces = 4) => ' '.repeat(depth * spaces - 2);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }

  const lines = Object.entries(value)
    .map(([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${indent(depth)}  }`;
};

const iter = (tree, depth = 1) => {
  const lines = tree.map((node) => {
    const {
      key, type, value, oldValue, newValue, children,
    } = node;

    switch (type) {
      case 'added':
        return `${indent(depth)}+ ${key}: ${stringify(value, depth)}`;
      case 'removed':
        return `${indent(depth)}- ${key}: ${stringify(value, depth)}`;
      case 'equal':
        return `${indent(depth)}  ${key}: ${stringify(value, depth)}`;
      case 'changed':
        return [
          `${indent(depth)}- ${key}: ${stringify(oldValue, depth)}`,
          `${indent(depth)}+ ${key}: ${stringify(newValue, depth)}`,
        ].join('\n');
      case 'nested':
        return `${indent(depth)}  ${key}: {\n${iter(children, depth + 1)}\n${indent(depth)}  }`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return lines.join('\n');
};

const stylish = (tree, depth = 1) => {
  const iterResult = iter(tree, depth);
  return `{\n${iterResult}\n}`;
};

export default stylish;
