/**
 * @file app.js 
 * @description This file contains the JavaScript for our movie app. 
 * It contains the movieList instance, the event functions for the UI 
 * and other UI functionality
 * cspell:Ignore Amberle Seidl tabcontent tablinks Shawshank Krull Starfighter
 * @author Amberle Seidl
 * @version 3.1.0
 * @since v3 
 * getData() 
 * onUpIndexChange()
 * and confirm code in the deleteClick()
 * Bounds checking for getData() and deleteClick()
 */

/**
 * @global 
 * @description the initial list of 
 * movies for our app.
 */
let initMovies = [
  {title: "The Shawshank Redemption", year: 1994},
  {title: "The Godfather", year: 1972},
  {title: "The Godfather: Part II", year: 1974},
  {title: "The Dark Knight", year: 2008},
  {title: "Krull", year: 1983},
  {title: "The Last Starfighter", year: 1981}
]

/**
 * @memberof MovieList
 * @instance movieList
 * @param {string} - The id name of the element where we want to have our 
 * movieList appear in the UI
 * @param {Array} initMovies - The initial array of movies in our movie 
 * list.
 * @global 
 * @description the moviesList instance to keep track of our list of movies 
 * in the app
 */
let movieList = new MovieList('list', initMovies);

// Get all buttons from our application
const searchBtn = document.getElementById('searchBtn');
const sortA2ZBtn = document.getElementById('sortA2ZBtn');
const sortZ2ABtn = document.getElementById('sortZ2ABtn');
const addSubmit = document.getElementById('addSubmit');
const updateSubmit = document.getElementById('updateSubmit');
const deleteSubmit = document.getElementById('deleteSubmit');

// Add event handlers to call functions below
searchBtn.addEventListener('click', searchClick);
sortA2ZBtn.addEventListener('click', a2zClick);
sortZ2ABtn.addEventListener('click', z2aClick);
addSubmit.addEventListener('click', addClick);
updateSubmit.addEventListener('click', updateClick);
deleteSubmit.addEventListener('click', deleteClick);

// Searching and sorting
/**
 * Search for a movie in the movie list by partial title
 * @event Click#searchButton
 * @type {string} 
 * @function searchClick
 */
function searchClick(){
  // Get the text element from the DOM
  let formElements = document.getElementById("form-list-control").elements;
  // Get text from the form
  let text = formElements["search-string"].value;
  // Run the search method.
  movieList.search(text);
}

// a to z click - event
/** 
 * Sort the movieList in ascending order
 * @event Click#a2zButton
 * @function a2zClick
 * */ 
function a2zClick(){
  // Run the sort method
  movieList.sortA2Z();
}

// Z to a Click - event
/**
 * Sort the movie list in descending order
 * @event Click#z2aButton
 * @function z2aClick
 */ 
function z2aClick(){
  // Run the sort method
  movieList.sortZ2A();
}

// Crud functions
// C - Create - add new content
// R - Read - read content or display content
// U - Update - update content
// D - Delete - delete content
// Add click - event

// 
/**
 * Add a new movie to the list - (Create)
 * The properties are read from the add movie form.
 * @event Click#addMovieSubmitButton
 * @function addClick
 * @property {string} title - the movie title to add
 * @property {number} year - the year the movie was made
 */
function addClick(){
  // Get the add form elements from the DOM
  let formElements = document.getElementById("form-add").elements;
  // Get the movie title from the form
  let title = formElements["title"].value;
  // Get the year from the form
  let year = Number(formElements["year"].value);
  // Add in validation
  // We can test our year and title here.
  // We can add in rules to test our input.
  console.log(title);
  console.log(year);
  const pattern = /^[a-z0-9\s]*$/i
  const test = pattern.test(title);
  yearIsInt = Number.isInteger(year);
  // output of test
  console.log(test);
  console.log(yearIsInt);
  if (test && yearIsInt){
    // Save the new movie into the list.
    movieList.add(title, Number(year));
    // Clear the input fields
    formElements.title.value = "";
    formElements.year.value = "";
    showMessage("Movie Added", "chartreuse", "black");
  } else if(!test) {
    // alert("Invalid title, must be alphanumeric with spaces only");
    showMessage("Invalid title, must be alphanumeric with spaces only", "red", "white");
  } else {
    // alert("Invalid year, must be an integer");
     showMessage("Invalid year, must be an integer", "red", "white");
  }
}

/**
 * Get movie data from the movie list to update when typing an index in the 
 * index input in the update form
 * @function getData
 * 
 */
function getData(){
  console.log("get Data");
  // Get form elements
  const idValue = document.getElementById('upIndex').value;
  const upIndex = Number(idValue);
  console.log(upIndex);
  const upperBound = movieList.movieList.length;
  console.log(upperBound);
  if (upIndex > 0 && upIndex <= upperBound ){
    const title = document.getElementById('upTitle');
    const year = document.getElementById('upYear');
    // search array for the row.
    const row = movieList.getRow(upIndex - 1);
    console.log(row);
    title.value = row.title;
    year.value = row.year;
  } else {
    
    // alert("No such index exists");
    showMessage("No such index exists", "DarkOrange", "white");
  }

}

const upIndex =  document.getElementById('upIndex');
upIndex.addEventListener('change', getData);

/**
 * update a movie in the movie list - (Update), by index.
 * @event Click#updateMovieSubmitButton
 * @function updateClick
 * @property {number} index - the element in the list to update
 * @property {string} title - the movie title to add
 * @property {number} year - the year the movie was made
 */
function updateClick(){
  // Get all form child elements from the DOM
  let formElements = document.getElementById("form-update").elements;
  // get the values from the input boxes
  let index = formElements["index"].value - 1;
  let title = formElements["title"].value;
  let year = formElements["year"].value;
  // Add in validation
  // Add in rules to test our input
  // Check to see if the index is out of bounds (too big or too small)
  // Check for year is it a number?
  // Save the update to the movieList
  movieList.update(Number(index), title, Number(year));
  // Clear the input boxes
  formElements.index.value = "";
  formElements.title.value = "";
  formElements.year.value = "";
  showMessage("Movie updated", "chartreuse", "black");

}

/**
 * Delete a movie in the list - (Delete), by index
 * @event Click#deleteMovieSubmitButton
 * @function deleteClick
 * @property {number} index - the element in the list to update
 */

function deleteClick(){
  // Get the form element from the DOM
  let indexElement = document.getElementById("delIndex");
  // get the value from the element. 
  // -1 to the value to get the index in the moveList array
  // Can also test for out of bounds here too.
  let index = Number(indexElement.value);
  console.log(index);
  const upperBound = movieList.movieList.length;
  console.log(upperBound);
  if (index > 0 && index <= upperBound ){
    index = index - 1;
    // get movie
    const movie = movieList.getRow(index);
    // confirm delete
    const confirm = window.confirm(`Do you want to delete movie "${movie.title}"?`);
    if (confirm){
      console.log("Deleting movie... ", movie.title)
      // Delete the movie from the movieList
      movieList.delete(Number(index));
      // clear the input box
      indexElement.value = "";
      showMessage("Movie Deleted", "chartreuse", "black");
    } else {
      console.log("Delete cancelled");
      showMessage("Delete cancelled", "DarkOrange", "white");
    }
  } else {
    // alert("No such index exists");
    showMessage("No such index exists", "DarkOrange", "white");
  }
}

// UI JavaScript
// JavaScript for Tabs
// Function openForm()
// Takes in 2 parameters, and event and an action
// Returns nothing.
/**
 * JavaScript function for opening the forms
 * @function openForm
 * @param {object} evt - the event object. 
 * @param {string} action - The name of the action being used
 */
function openForm(evt, action){
  // declare variables
  let i, tabContent, tabLinks;

  // Get All elements that have the classname of tabcontent.
  tabContent = document.getElementsByClassName('tabcontent');
  for(i = 0; i < tabContent.length; i++){
    // Set display to none for all elements(with tabcontent);
    tabContent[i].style.display = 'none';
  }
  // Get All elements with the class name of tablinks and remove the class of active.
  tabLinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tabLinks.length; i++ ){
    tabLinks[i].className = tabLinks[i].className.replace("active", "");
  }

  // Show the current tab, and add the active class to the button that opened the tab.
  document.getElementById(action).style.display = "block";
  evt.currentTarget.className += " active";
} 
// End of openForm()

// Open a tab by default
document.getElementById('defaultOpen').click();

// Footer - get date and inject it into the footer
// get the span to inject the date into
const dateSpan = document.getElementById("date");
// Get the current date.
const theDate = new Date();
// Add in the date to the DOM.
dateSpan.textContent = theDate.getFullYear();

// Expand this application
// Class called Movie - title, year - rating, url (movie page)
// Sort by year and rating
// upgrade the UI.
// search by year, or rating

function showMessage(message, colour, text){
  const msg = document.getElementById('msg');
  msg.style.display = "block";
  msg.textContent = message;
  msg.style.backgroundColor = colour;
  msg.style.color = text;
}