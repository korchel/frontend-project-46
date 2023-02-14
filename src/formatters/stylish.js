import _ from 'lodash';

const applyStylishFormat = (trees) => {
  const stringify = (data, depth) => {
    if (!_.isObject(data)) {
      return data;
    }
    const currentIndent = ' '.repeat(depth * 4);
    const closingBracketIndent = ' '.repeat((depth - 1) * 4);
    const entries = Object.entries(data);
    const lines = entries.map(([key, value]) => {
      if (_.isObject(value)) {
        return `${currentIndent}${key}: ${stringify(value, depth + 1)}`;
      }
      return `${currentIndent}${key}: ${value}`;
    });
    return `{\n${lines.join('\n')}\n${closingBracketIndent}}`;
  };

  const stringifyTree = (tree, depth) => {
    const currentIndent = ' '.repeat(2 + (depth - 1) * 4);
    const closingBracketIndent = ' '.repeat(depth * 4);

    switch (tree.status) {
      case 'unchanged':
        return `${currentIndent}  ${tree.name}: ${stringify(tree.value2, depth + 1)}`;
      case 'updated':
        if (Array.isArray(tree.value2)) {
          return `${currentIndent}  ${tree.name}: {\n${tree.value2.map((node) => stringifyTree(node, depth + 1)).join('\n')}\n${closingBracketIndent}}`;
        }
        return `${currentIndent}- ${tree.name}: ${stringify(tree.value1, depth + 1)}\n${currentIndent}+ ${tree.name}: ${stringify(tree.value2, depth + 1)}`;
      case 'added':
        return `${currentIndent}+ ${tree.name}: ${stringify(tree.value2, depth + 1)}`;
      case 'removed':
        return `${currentIndent}- ${tree.name}: ${stringify(tree.value1, depth + 1)}`;
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
