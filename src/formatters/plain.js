const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (diff, parentPath = '') => diff
  .flatMap((node) => {
    const propertyPath = parentPath ? `${parentPath}.${node.key}` : node.key;

    switch (node.type) {
      case 'added':
        return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${propertyPath}' was removed`;
      case 'changed':
        return `Property '${propertyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
      case 'nested':
        return formatPlain(node.children, propertyPath);
      case 'equal':
        return [];
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  })
  .join('\n');

export default formatPlain;
