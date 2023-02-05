import _ from 'lodash';

const applyStylishFormat = (trees) => {
  const stringifyObject = (object, level) => {
    const currentIndent = '  '.repeat(level);
    const closingBracketIndent = '  '.repeat(level - 2);
    const entries = Object.entries(object);
    const lines = entries.map(([key, value]) => {
      if (_.isObject(value)) {
        return `${currentIndent}${key}: ${stringifyObject(value, level + 2)}`;
      }
      return `${currentIndent}${key}: ${value}`;
    });
    return `{\n${lines.join('\n')}\n${closingBracketIndent}}`;
  };
  const stringifyTree = (tree, level) => {
    const treeName = tree.name;
    const treeStatus = tree.status;
    const treePreviousValue = tree.previousValue;
    const treeCurrentValue = tree.currentValue;
    const currentIndent = '  '.repeat(level);
    const closingBracketIndent = '  '.repeat(level + 1);
    switch (treeStatus) {
      case 'unchanged':
        return _.isObject(treePreviousValue)
          ? `${currentIndent}  ${treeName}:\n${stringifyObject(treeCurrentValue, level + 2)}`
          : `${currentIndent}  ${treeName}: ${treeCurrentValue}`;
      case 'updated':
        if (Array.isArray(treeCurrentValue)) {
          return `${currentIndent}  ${treeName}: {\n${treeCurrentValue.map((node) => stringifyTree(node, level + 2)).join('\n')}\n${closingBracketIndent}}`;
        }
        return _.isObject(treePreviousValue)
          ? `${currentIndent}- ${treeName}: ${stringifyObject(treePreviousValue, level + 3)}\n${currentIndent}+ ${treeName}: ${treeCurrentValue}`
          : `${currentIndent}- ${treeName}: ${treePreviousValue}\n${currentIndent}+ ${treeName}: ${treeCurrentValue}`;
      case 'added':
        return _.isObject(treeCurrentValue)
          ? `${currentIndent}+ ${treeName}: ${stringifyObject(treeCurrentValue, level + 3)}`
          : `${currentIndent}+ ${treeName}: ${treeCurrentValue}`;
      case 'removed':
        return _.isObject(treePreviousValue)
          ? `${currentIndent}- ${treeName}: ${stringifyObject(treePreviousValue, level + 3)}`
          : `${currentIndent}- ${treeName}: ${treePreviousValue}`;
      default:
        return 'no such treeStatus';
    }
  };
  const lines = trees.reduce((acc, tree) => {
    const treelines = stringifyTree(tree, 1);
    return `${acc}\n${treelines}`;
  }, '');
  return `{${lines}\n}`;
};

export default applyStylishFormat;
