import _ from 'lodash';

const addQuotes = (value) => (typeof value === 'string' ? `'${value}'` : value);

const applyPlainFormat = (trees) => {
  const iter = (tree, path) => {
    const treeName = tree.name;
    const treeStatus = tree.status;
    const treePreviousValue = tree.previousValue;
    const treeCurrentValue = tree.currentValue;
    const fullPath = [...path, treeName];
    path.push(treeName);
    switch (treeStatus) {
      case 'unchanged':
        return undefined;
      case 'updated':
        if (Array.isArray(treeCurrentValue)) {
          return treeCurrentValue.map((node) => iter(node, [...fullPath]));
        }
        return _.isObject(tree.previousValue)
          ? `Property '${path.join('.')}' was updated. From [complex value] to ${addQuotes(treeCurrentValue)}`
          : `Property '${path.join('.')}' was updated. From ${addQuotes(treePreviousValue)} to ${addQuotes(treeCurrentValue)}`;
      case 'added':
        return _.isObject(treeCurrentValue)
          ? `Property '${path.join('.')}' was added with value: [complex value]`
          : `Property '${path.join('.')}' was added with value: ${addQuotes(treeCurrentValue)}`;
      case 'removed':
        return `Property '${path.join('.')}' was removed`;
      default:
        return 'no such treeStatus';
    }
  };
  return trees.reduce((lines, tree) => {
    const treeLines = iter(tree, []);
    lines.push(treeLines);
    return _.flatten(lines).filter((line) => line !== undefined);
  }, []).join('\n');
};

export default applyPlainFormat;
