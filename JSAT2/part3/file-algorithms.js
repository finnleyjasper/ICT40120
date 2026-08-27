/**
 * Node.js's built-in file system tools.
 */
const fs = require("fs");

/**
 * Saves a string to a text file.
 * @param {string} fileName - The name or path of the file to save.
 * @param {string} text - The text to write to the file.
 * @returns {void}
 */
function saveStringToFile(fileName, text) {
  fs.writeFileSync(fileName, text, "utf8");
}

/**
 * Reads and returns the contents of a text file.
 * @param {string} fileName - The name or path of the file to read.
 * @returns {string} The text read from the file.
 */
function readTextFile(fileName) {
  return fs.readFileSync(fileName, "utf8");
}

module.exports = { saveStringToFile, readTextFile };
