import _ from 'lodash';

const applyStylishFormat = (diffTree) => {
  const stringify = (data, depth) => {
    if (!_.isObject(data)) {
      return data;
    }

    const currentIndent = ' '.repeat((depth + 1) * 4);
    const closingBracketIndent = ' '.repeat(depth * 4);

    const entries = Object.entries(data);
    const lines = entries.map(([key, value]) => {
      if (_.isObject(value)) {
        return `${currentIndent}${key}: ${stringify(value, depth + 1)}`;
      }
      return `${currentIndent}${key}: ${value}`;
    });
    return `{\n${lines.join('\n')}\n${closingBracketIndent}}`;
  };

  const stringifyTree = (node, depth) => {
    const currentIndent = ' '.repeat(2 + depth * 4);
    const closingBracketIndent = ' '.repeat((depth + 1) * 4);

    switch (node.keyStatus) {
      case 'unchanged':
        return `${currentIndent}  ${node.keyName}: ${stringify(node.value, depth + 1)}`;
      case 'updated':
        if (Array.isArray(node.value2)) {
          return `${currentIndent}  ${node.keyName}: {\n${node.value2.map((item) => stringifyTree(item, depth + 1)).join('\n')}\n${closingBracketIndent}}`;
        }
        return `${currentIndent}- ${node.keyName}: ${stringify(node.value1, depth + 1)}\n${currentIndent}+ ${node.keyName}: ${stringify(node.value2, depth + 1)}`;
      case 'added':
        return `${currentIndent}+ ${node.keyName}: ${stringify(node.value, depth + 1)}`;
      case 'removed':
        return `${currentIndent}- ${node.keyName}: ${stringify(node.value, depth + 1)}`;
      default:
        throw new Error(`Unknown treeKeyStatus ${node.keyStatus}`);
    }
  };

  const lines = diffTree.reduce((acc, node) => {
    const treeLines = stringifyTree(node, 0);
    return `${acc}\n${treeLines}`;
  }, '');
  return `{${lines}\n}`;
};

export default applyStylishFormat;
