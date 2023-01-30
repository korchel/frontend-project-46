import _ from 'lodash';

const applyPlainFormat = (trees) => {
  const iter = (tree, path) => {
    const treeName = tree.name;
    const treeStatus = tree.status;
    const treePreviousValue = tree.previousValue;
    const treeCurrentValue = tree.currentValue;
    path.push(treeName);
    switch (treeStatus) {
      case 'unchanged':
        break;
      case 'updated':
        if (Array.isArray(treeCurrentValue)) {
          return treeCurrentValue.map((node) => iter(node, [...path]));
        }
        return _.isObject(tree.previousValue)
          ? `Property '${path.join('.')}' was updated. From [complex value] to '${treeCurrentValue}'\n`
          : `Property '${path.join('.')}' was updated. From '${treePreviousValue}' to '${treeCurrentValue}'\n`;
      case 'added':
        return _.isObject(treeCurrentValue)
          ? `Property '${path.join('.')}' was added with value: [complex value]\n`
          : `Property '${path.join('.')}' was added with value: '${treeCurrentValue}'\n`;
      case 'removed':
        return `Property '${path.join('.')}' was removed\n`;
      default:
        return 'no such treeStatus';
    }
  };
  return trees.reduce((lines, tree) => {
    const treeLines = iter(tree, []);
    return `${lines}${treeLines}`;
  }, '');
};

export default applyPlainFormat;
