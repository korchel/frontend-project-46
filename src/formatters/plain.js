import _ from 'lodash';

const applyPlainFormat = (diffTree) => {
  const stringify = (value) => {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    if (_.isObject(value)) {
      return '[complex value]';
    }
    return String(value);
  };

  const iter = (node, path) => {
    const fullPath = [...path, node.keyName];
    switch (node.keyStatus) {
      case 'unchanged':
        return null;
      case 'updated':
        if (Array.isArray(node.value2)) {
          return node.value2.map((item) => iter(item, [...fullPath]));
        }
        return `Property '${fullPath.join('.')}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case 'added':
        return `Property '${fullPath.join('.')}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${fullPath.join('.')}' was removed`;
      default:
        throw new Error(`Unknown treeKeyStatus ${node.keyStatus}`);
    }
  };

  return diffTree.reduce((lines, node) => {
    const treeLines = iter(node, []);
    return _.flatten([...lines, treeLines]).filter((line) => line !== null);
  }, []).join('\n');
};

export default applyPlainFormat;
