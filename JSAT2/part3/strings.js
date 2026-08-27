// Define strings
const myString = "This is a string";
const anotherString = "   Another string";
const hello = "Hello there!";
let myName = "Finnley";

// Print strings to console
console.log("The strings created are: " + myString + ", " + anotherString + ", " + hello + ", " + myName);

// Use utility functions to find relevant information
const myStringLength = myString.length;
const firstCharacter = myString.charAt(0); // Index starts at 0
const eleventhCharacter = myString.charAt(10); // Index starts at 0

// Print all the information to the console
console.log("The length of myString is:", myStringLength);
console.log("The first character of myString is:", firstCharacter);
console.log("The 11th character of myString is:", eleventhCharacter);

// Create new strings using slice() and substring()
// Both methods extract a part of the string and return it as a new string. The difference is that slice() can accept negative indices, while substring() cannot!
const slicedString = myString.slice(5, 9); // results in "is a"
const substringString = anotherString.substring(6, 9); // results in "the"

// Print the new strings to the console
console.log("The sliced string is:", slicedString);
console.log("The substring is:", substringString);

// Create uppercase version of myName
myName = myName.toUpperCase();
// Print the uppercase version of myName to the console
console.log("myName in uppercase is:", myName);

// Create lowercase version of myName
myName = myName.toLowerCase();
// Print the lowercase version of myName to the console
console.log("myName in lowercase is:", myName);
