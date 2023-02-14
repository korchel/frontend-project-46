import _ from 'lodash';

const applyStylishFormat = (trees) => {
  const stringifyObject = (object, depth) => {
    if (!_.isObject(object)) {
      return object;
    }
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
    const currentIndent = '  '.repeat(depth);
    const closingBracketIndent = '  '.repeat(depth + 1);
    switch (tree.status) {
      case 'unchanged':
        return _.isObject(tree.value1)
          ? `${currentIndent}  ${tree.name}:\n${stringifyObject(tree.value2, depth + 2)}`
          : `${currentIndent}  ${tree.name}: ${tree.value2}`;
      case 'updated':
        if (Array.isArray(tree.value2)) {
          return `${currentIndent}  ${tree.name}: {\n${tree.value2.map((node) => stringifyTree(node, depth + 2)).join('\n')}\n${closingBracketIndent}}`;
        }
        return `${currentIndent}- ${tree.name}: ${stringifyObject(tree.value1, depth + 3)}\n${currentIndent}+ ${tree.name}: ${stringifyObject(tree.value2, depth + 3)}`;
      case 'added':
        return `${currentIndent}+ ${tree.name}: ${stringifyObject(tree.value2, depth + 3)}`;
      case 'removed':
        return `${currentIndent}- ${tree.name}: ${stringifyObject(tree.value1, depth + 3)}`;
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
