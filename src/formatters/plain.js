import _ from 'lodash';

const applyPlainFormat = (trees) => {
  const stringify = (value) => {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    if (_.isObject(value)) {
      return '[complex value]';
    }
    return value;
  };

  const iter = (tree, path) => {
    const fullPath = [...path, tree.name];
    switch (tree.status) {
      case 'unchanged':
        return null;
      case 'updated':
        if (Array.isArray(tree.value2)) {
          return tree.value2.map((node) => iter(node, [...fullPath]));
        }
        return `Property '${fullPath.join('.')}' was updated. From ${stringify(tree.value1)} to ${stringify(tree.value2)}`;
      case 'added':
        return `Property '${fullPath.join('.')}' was added with value: ${stringify(tree.value2)}`;
      case 'removed':
        return `Property '${fullPath.join('.')}' was removed`;
      default:
        return 'no such treeStatus';
    }
  };
  return trees.reduce((lines, tree) => {
    const treeLines = iter(tree, []);
    return _.flatten([...lines, treeLines]).filter((line) => line !== null);
  }, []).join('\n');
};

export default applyPlainFormat;
