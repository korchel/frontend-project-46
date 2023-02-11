import _ from 'lodash';

const applyStylishFormat = (trees) => {
  const stringifyObject = (object, depth) => {
    const currentIndent = '  '.repeat(depth);
    const closingBracketIndent = '  '.repeat(depth - 2);
    const entries = Object.entries(object);
    const lines = entries.map(([key, value]) => {
      if (_.isObject(value)) {
        return `${currentIndent}${key}: ${stringifyObject(value, depth + 2)}`;
      }
      return `${currentIndent}${key}: ${value}`;
    });
    return `{\n${lines.join('\n')}\n${closingBracketIndent}}`;
  };

  const stringifyTree = (tree, depth) => {
    const treeName = tree.name;
    const treeStatus = tree.status;
    const treeValue1 = tree.value1;
    const treeValue2 = tree.value2;
    const currentIndent = '  '.repeat(depth);
    const closingBracketIndent = '  '.repeat(depth + 1);
    switch (treeStatus) {
      case 'unchanged':
        return _.isObject(treeValue1)
          ? `${currentIndent}  ${treeName}:\n${stringifyObject(treeValue2, depth + 2)}`
          : `${currentIndent}  ${treeName}: ${treeValue2}`;
      case 'updated':
        if (Array.isArray(treeValue2)) {
          return `${currentIndent}  ${treeName}: {\n${treeValue2.map((node) => stringifyTree(node, depth + 2)).join('\n')}\n${closingBracketIndent}}`;
        }
        return _.isObject(treeValue1)
          ? `${currentIndent}- ${treeName}: ${stringifyObject(treeValue1, depth + 3)}\n${currentIndent}+ ${treeName}: ${treeValue2}`
          : `${currentIndent}- ${treeName}: ${treeValue1}\n${currentIndent}+ ${treeName}: ${treeValue2}`;
      case 'added':
        return _.isObject(treeValue2)
          ? `${currentIndent}+ ${treeName}: ${stringifyObject(treeValue2, depth + 3)}`
          : `${currentIndent}+ ${treeName}: ${treeValue2}`;
      case 'removed':
        return _.isObject(treeValue1)
          ? `${currentIndent}- ${treeName}: ${stringifyObject(treeValue1, depth + 3)}`
          : `${currentIndent}- ${treeName}: ${treeValue1}`;
      default:
        throw new Error('No such tree status!');
    }
  };
  const lines = trees.reduce((acc, tree) => {
    const treeLines = stringifyTree(tree, 1);
    return `${acc}\n${treeLines}`;
  }, '');
  return `{${lines}\n}`;
};

export default applyStylishFormat;
