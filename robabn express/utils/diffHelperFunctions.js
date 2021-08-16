// content is an array of strings
exports.getAddedDeletedLines = (content) => {
  const addedLines = [];
  const deletedLines = [];

  content.forEach((line, i) => {
    if (line.startsWith("+")) {
      addedLines.push(i + 1);
    } else if (line.startsWith("-")) {
      deletedLines.push(i + 1);
    }
  });

  return {
    addedLines,
    deletedLines,
  };
};
