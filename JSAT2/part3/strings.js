// Define strings
const myString = "This is a string";
const anotherString = "   Another string";
const hello = "Hello there!";
const myName = "Finnley";

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
const slicedString = myString.slice(5, 9); // results in "is a"
const substringString = anotherString.substring(6, 9); // results in "Another"

// Print the new strings to the console
console.log("The sliced string is:", slicedString);
console.log("The substring is:", substringString);
