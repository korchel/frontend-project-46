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
    const treeName = tree.name;
    const treeStatus = tree.status;
    const treeValue1 = tree.value1;
    const treeValue2 = tree.value2;
    const fullPath = [...path, treeName];
    path.push(treeName);
    switch (treeStatus) {
      case 'unchanged':
        return null;
      case 'updated':
        if (Array.isArray(treeValue2)) {
          return treeValue2.map((node) => iter(node, [...fullPath]));
        }
        return `Property '${path.join('.')}' was updated. From ${stringify(treeValue1)} to ${stringify(treeValue2)}`;
      case 'added':
        return `Property '${path.join('.')}' was added with value: ${stringify(treeValue2)}`;
      case 'removed':
        return `Property '${path.join('.')}' was removed`;
      default:
        return 'no such treeStatus';
    }
  };
  return trees.reduce((lines, tree) => {
    const treeLines = iter(tree, []);
    lines.push(treeLines);
    return _.flatten(lines).filter((line) => line !== null);
  }, []).join('\n');
};

export default applyPlainFormat;