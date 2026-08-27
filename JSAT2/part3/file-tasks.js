// Use the algorithm from file-algorithms.js to save a string to a file
const { saveStringToFile, readTextFile } = require("./file-algorithms");

// Make a string to save to a file
const textToSave = "This text has been saved to output.txt! Yippee!!";
// Save the string to a file named "output.txt"
saveStringToFile("output.txt", textToSave);
// Provide feedback to the user that the text was saved
console.log("The text was saved to output.txt.");

// Read the contents of output.txt
const textReadFromFile = readTextFile("output.txt");
// Display the contents read from the file
console.log("The text read from output.txt is:", textReadFromFile);
