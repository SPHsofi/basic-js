const { NotImplementedError } = require('../extensions/index.js');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const occurrences = {};

  // создание имени нового файла
  function getNewFileName(name, suffix) {
    return `${name}(${suffix})`;
  }

  for (let i = 0; i < names.length; i++) {
    const currentName = names[i];

    if (occurrences[currentName] === undefined) {
      occurrences[currentName] = 1;
    } else {
 
      const suffix = occurrences[currentName];
      const newName = getNewFileName(currentName, suffix);
      occurrences[currentName]++;
      names[i] = newName;

 
      if (occurrences[newName] === undefined) {
        occurrences[newName] = 1;
      } else {
        occurrences[newName]++;
      }
    }
  }

  return names;
}

module.exports = {
  renameFiles
};
