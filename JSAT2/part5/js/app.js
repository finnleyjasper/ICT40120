/**
 * @file app.js
 * @description This file contains the JavaScript for our movie app. It Creates the initial movies, connects buttons to their event handlers, and manages the forms and feedback messages in the UI.
 */

// MOVIES ========================================================================
/**
 * The initial movies displayed when the page loads. Each entry is an instance
 * of the Movie class, with an ID, title, release year, and rating.
 * @type {Movie[]}
 */
const initialMovies = [
  new Movie(101, "Super Amazing Film", 1984, 5),
  new Movie(205, "Really Terrible Movie", 2005, 2),
  new Movie(312, "Funny Movie", 2012, 4),
  new Movie(418, "Just Okay Film", 2008, 3),
  new Movie(523, "I Can't Believe They Made Another: Really Terrible Movie II", 2009, 1),
  new Movie(634, "Some Romcom", 2004, 3)
];

/**
 * The MovieList instance used by the application. The "list" argument is the
 * ID of the HTML element where MovieList displays the movies.
 * @type {MovieList}
 */
const movieList = new MovieList("list", initialMovies);

// EVENT HANDLERS ========================================================================

// Get the search, sort, and maintenance buttons from the HTML page by ID.
// Keep these references so we can attach handlers.
const searchButton = document.getElementById("searchBtn");
const sortA2ZButton = document.getElementById("sortA2ZBtn");
const sortZ2AButton = document.getElementById("sortZ2ABtn");
const addSubmit = document.getElementById("addSubmit");
const updateSubmit = document.getElementById("updateSubmit");
const deleteSubmit = document.getElementById("deleteSubmit");
// This input will use a change handler rather than click.
const updateMovieId = document.getElementById("upMovieId");

// Pass each button's relevant function to addEventListener.
searchButton.addEventListener("click", searchClick);
sortA2ZButton.addEventListener("click", a2zClick);
sortZ2AButton.addEventListener("click", z2aClick);
addSubmit.addEventListener("click", addClick);
updateSubmit.addEventListener("click", updateClick);
deleteSubmit.addEventListener("click", deleteClick);
// Load the existing movie details when the user changes the update form's ID.
updateMovieId.addEventListener("change", getUpdateMovieData);

// VALIDATION =========================================================================

/**
 * Checks the values entered in the add or update form before saving a movie.
 * An ID and year must be positive whole numbers, the title must contain text,
 * and the rating must be a whole number from 1 to 5.
 * @param {number} movieId - The user-supplied movie ID.
 * @param {string} title - The movie title.
 * @param {number} year - The release year.
 * @param {number} rating - The rating from 1 to 5.
 * @returns {boolean} True when every value is valid.
 */
function movieDetailsAreValid(movieId, title, year, rating) {
  // All conditions must be true for the movie details to be valid.
  // const pattern = /^[a-z0-9\s]*$/i


  return Number.isInteger(movieId) && movieId > 0 &&
    title.trim() !== "" &&
    Number.isInteger(year) && year > 0 &&
    Number.isInteger(rating) && rating >= 1 && rating <= 5;
}

// ==========================

/**
 * Searches for movies whose titles contain the entered text.
 * @event Click#searchBtn
 * @function searchClick
 * @returns {void}
 */
function searchClick(){
  // Get the controls inside the search form.
  let formElements = document.getElementById("form-list-control").elements;
  // Read the text the user typed into the title-search field.
  let text = formElements["search-string"].value;
  // Ask MovieList to find and display matching movies.
  movieList.search(text);
}

/**
 * Handles a click on the A-Z button by asking MovieList to sort by title.
 * @returns {void}
 */
function a2zClick() {
  // MovieList performs the sort and redraws the list.
  movieList.sortA2Z();
}

/**
 * Handles a click on the Z-A button by asking MovieList to sort by title.
 * @returns {void}
 */
function z2aClick() {
  // MovieList performs the sort and redraws the list.
  movieList.sortZ2A();
}

/**
 * Reads the add form, validates the details, and adds a new movie if its ID
 * has not already been used.
 * @event Click#addSubmit
 * @function addClick
 * @description add a new movie to the list
 */
function addClick() {
  // Get the add form and read each of its four input fields.
  const form = document.getElementById("form-add");
  // Number() converts the text supplied by number inputs to JavaScript numbers.
  const movieId = Number(form.elements.movieId.value);
  // Remove accidental spaces before and after the title.
  const title = form.elements.title.value.trim();
  const year = Number(form.elements.year.value);
  const rating = Number(form.elements.rating.value);

  // Stop before changing the movie list if any required detail is invalid.
  if (!movieDetailsAreValid(movieId, title, year, rating)) {
    showMessage(
      "Enter a positive whole-number ID and year, a title, and a rating from 1 to 5.",
      "var(--pink)",
      "var(--black)"
    );
    return; // Leave the form filled so the user can correct it.
  }

  // add() returns false if another movie already has the entered ID.
  if (!movieList.add(movieId, title, year, rating)) {
    showMessage("That Movie ID is already in use.", "var(--pink)", "var(--black)");
    return; // Do not clear the form when the ID must be changed.
  }

  // The movie was added successfully; clear the form and show confirmation.
  form.reset();
  showMessage("Movie added", "var(--purple)", "var(--white)");
}

/**
 * Loads an existing movie's title, year, and rating into the update form when
 * the user enters its Movie ID.
 * @returns {void}
 */
function getUpdateMovieData() {
  // Look up the typed ID in MovieList. An unknown ID returns null.
  const movieId = Number(updateMovieId.value);
  const movie = movieList.getMovieById(movieId);
  const form = document.getElementById("form-update");

  // Clear stale details if the ID does not match an existing movie.
  if (movie === null) {
    form.elements.title.value = "";
    form.elements.year.value = "";
    form.elements.rating.value = "";
    showMessage("No movie has that ID.", "var(--mauve)", "var(--white)");
    return; // There is no movie data to copy into the form.
  }

  // Show the current details so the user can edit them before submitting.
  form.elements.title.value = movie.title;
  form.elements.year.value = movie.year;
  form.elements.rating.value = movie.rating;
}

/**
 * Reads the update form, validates its values, and updates the movie with the
 * entered Movie ID. The ID identifies the movie and is not changed.
 * @returns {void}
 */
function updateClick() {
  // Read the movie ID and the replacement details from the update form.
  const form = document.getElementById("form-update");
  const movieId = Number(form.elements.movieId.value);
  const title = form.elements.title.value.trim();
  const year = Number(form.elements.year.value);
  const rating = Number(form.elements.rating.value);

  // Do not send invalid values to MovieList.
  if (!movieDetailsAreValid(movieId, title, year, rating)) {
    showMessage("Enter valid details before updating.", "var(--pink)", "var(--black)");
    return; // Keep the entered details available for correction.
  }

  // update() returns false when the ID is not present in the movie list.
  if (!movieList.update(movieId, title, year, rating)) {
    showMessage("No movie has that ID.", "var(--mauve)", "var(--white)");
    return;
  }

  // A successful update redraws the list; now clear the form and report it.
  form.reset();
  showMessage("Movie updated", "var(--purple)", "var(--white)");
}

/**
 * Finds a movie by its ID, asks the user to confirm, and deletes that movie.
 * @returns {void}
 */
function deleteClick() {
  // Read the ID from the delete form and retrieve the matching movie.
  const form = document.getElementById("form-delete");
  const movieId = Number(form.elements.movieId.value);
  const movie = movieList.getMovieById(movieId);

  // Do not ask for confirmation when the entered ID does not exist.
  if (movie === null) {
    showMessage("No movie has that ID.", "var(--mauve)", "var(--white)");
    return;
  }

  // window.confirm() returns true for OK and false for Cancel.
  const shouldDelete = window.confirm(
    `Do you want to delete movie "${movie.title}"?`
  );

  // Cancel leaves the movie list unchanged.
  if (!shouldDelete) {
    showMessage("Delete cancelled", "var(--mauve)", "var(--white)");
    return;
  }

  // Remove the movie by ID, then clear the form and show confirmation.
  movieList.delete(movieId);
  form.reset();
  showMessage("Movie deleted", "var(--purple)", "var(--white)");
}

// UI functions for the maintenance tabs and user feedback.

/**
 * Opens one maintenance tab and hides the others. The HTML tab buttons pass
 * their click event and the ID of the section to display.
 * @param {Event} event - The tab button click event.
 * @param {string} action - The ID of the tab content to display.
 * @returns {void}
 */
function openForm(event, action) {
  // Get every tab panel and every button used to switch panels.
  const tabContent = document.getElementsByClassName("tabcontent");
  const tabLinks = document.getElementsByClassName("tablinks");

  // Hide every tab panel before showing the selected one.
  for (let index = 0; index < tabContent.length; index++) {
    tabContent[index].style.display = "none";
  }

  // Remove the active marker from each tab button.
  for (let index = 0; index < tabLinks.length; index++) {
    tabLinks[index].className = tabLinks[index].className.replace(
      " active",
      ""
    );
  }

  // Show the requested panel and mark the button that was clicked as active.
  document.getElementById(action).style.display = "block";
  event.currentTarget.className += " active";
}

/**
 * Displays a success, error, or cancellation message in the message box.
 * @param {string} message - The message to display.
 * @param {string} colour - The message background colour.
 * @param {string} textColour - The message text colour.
 * @returns {void}
 */
function showMessage(message, colour, textColour) {
  // Find the message area shared by the add, update, and delete forms.
  const messageBox = document.getElementById("msg");

  // Make it visible, set its text, and apply the supplied colours.
  messageBox.style.display = "block";
  messageBox.textContent = message;
  messageBox.style.backgroundColor = colour;
  messageBox.style.color = textColour;
}

// Open the default maintenance tab when the page first loads.
document.getElementById("defaultOpen").click();
// Display the current year in the page footer.
document.getElementById("date").textContent = new Date().getFullYear();


/*
VALIDATION for adding a movie to the list

const pattern = /^[a-z0-9\s]*$/i
const test = pattern.test(title)
const yearIsInteger = Number.isInteger(year)

console.log(test)
console.log(yearIsInteger)

if (test && yearIsInteger) {
  // Save the movie!
  movieList.add(movieId, title, year, rating)
  formElements.title.value = ""
  formElements.year.value = ""
  formElements.rating.value = ""
  showMessage("Movie added", "chartreuse", "black")
} else if (!test) {
  showMessage("Enter a valid title - must be alphanumeric with spaces only.", "red", "white")
} else if (!yearIsInteger) {
  showMessage("Enter a valid year - must be a whole number.", "red", "white")
}


// ADD IN:

- [documnt element].addEventListener('change', getMovieData) to update the form with the movie details when a movie ID is typed in - klike for update.
- validaton should happen for update action and add movie action
- each form should clear after the action is completed
- comb through comments

- 4 tests for part 1
*/
