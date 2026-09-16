/**
 * @file app.js
 * @description Creates the movie list and connects it to the application UI.
 */

/**
 * The initial movies displayed by the application.
 * @type {Movie[]}
 */
const initialMovies = [
  new Movie(101, "The Shawshank Redemption", 1994, 5),
  new Movie(205, "The Godfather", 1972, 5),
  new Movie(312, "The Godfather: Part II", 1974, 4),
  new Movie(418, "The Dark Knight", 2008, 5),
  new Movie(523, "Krull", 1983, 3),
  new Movie(634, "The Last Starfighter", 1981, 4)
];

/**
 * The MovieList instance used by the application.
 * @type {MovieList}
 */
const movieList = new MovieList("list", initialMovies);

// Buttons for the application
const searchButton = document.getElementById("searchBtn");
const sortA2ZButton = document.getElementById("sortA2ZBtn");
const sortZ2AButton = document.getElementById("sortZ2ABtn");
const addSubmit = document.getElementById("addSubmit");
const updateSubmit = document.getElementById("updateSubmit");
const deleteSubmit = document.getElementById("deleteSubmit");
const updateMovieId = document.getElementById("upMovieId");

// Event handlers
searchButton.addEventListener("click", searchClick);
sortA2ZButton.addEventListener("click", a2zClick);
sortZ2AButton.addEventListener("click", z2aClick);
addSubmit.addEventListener("click", addClick);
updateSubmit.addEventListener("click", updateClick);
deleteSubmit.addEventListener("click", deleteClick);
updateMovieId.addEventListener("change", getUpdateMovieData);

// ==========================

/**
 * Reports whether supplied values can form a valid Movie.
 * @param {number} movieId - The user-supplied movie ID.
 * @param {string} title - The movie title.
 * @param {number} year - The release year.
 * @param {number} rating - The rating from 1 to 5.
 * @returns {boolean} True when every value is valid.
 */
function movieDetailsAreValid(movieId, title, year, rating) {
  return Number.isInteger(movieId) && movieId > 0 &&
    title.trim() !== "" &&
    Number.isInteger(year) && year > 0 &&
    Number.isInteger(rating) && rating >= 1 && rating <= 5;
}

// ==========================

/**
 * Search for a movie by partial title
 * @event Click#searchBtn
 * @function searchClick
 */
function searchClick(){
  // Get the text from the DOM
  let formElements = document.getElementById("form-list-control").elements;
  // Get the text from the input field
  let text = formElements["search-string"].value;
  // Run the search method
  movieList.search(text);
}

/**
 * Sorts movie titles from A to Z.
 * @returns {void}
 */
function a2zClick() {
  movieList.sortA2Z();
}

/**
 * Sorts movie titles from Z to A.
 * @returns {void}
 */
function z2aClick() {
  movieList.sortZ2A();
}

/**
 * Validates and adds a movie entered by the user.
 * @event Click#addSubmit
 * @function addClick
 * @description add a new movie to the list
 */
function addClick() {
  const form = document.getElementById("form-add");
  const movieId = Number(form.elements.movieId.value);
  const title = form.elements.title.value.trim();
  const year = Number(form.elements.year.value);
  const rating = Number(form.elements.rating.value);

  if (!movieDetailsAreValid(movieId, title, year, rating)) {
    showMessage(
      "Enter a positive whole-number ID and year, a title, and a rating from 1 to 5.",
      "red",
      "white"
    );
    return;
  }

  if (!movieList.add(movieId, title, year, rating)) {
    showMessage("That Movie ID is already in use.", "red", "white");
    return;
  }

  form.reset();
  showMessage("Movie added", "chartreuse", "black");
}

/**
 * Loads a movie into the update form using its Movie ID.
 * @returns {void}
 */
function getUpdateMovieData() {
  const movieId = Number(updateMovieId.value);
  const movie = movieList.getMovieById(movieId);
  const form = document.getElementById("form-update");

  if (movie === null) {
    form.elements.title.value = "";
    form.elements.year.value = "";
    form.elements.rating.value = "";
    showMessage("No movie has that ID.", "DarkOrange", "white");
    return;
  }

  form.elements.title.value = movie.title;
  form.elements.year.value = movie.year;
  form.elements.rating.value = movie.rating;
}

/**
 * Validates and updates a movie selected by Movie ID.
 * @returns {void}
 */
function updateClick() {
  const form = document.getElementById("form-update");
  const movieId = Number(form.elements.movieId.value);
  const title = form.elements.title.value.trim();
  const year = Number(form.elements.year.value);
  const rating = Number(form.elements.rating.value);

  if (!movieDetailsAreValid(movieId, title, year, rating)) {
    showMessage("Enter valid details before updating.", "red", "white");
    return;
  }

  if (!movieList.update(movieId, title, year, rating)) {
    showMessage("No movie has that ID.", "DarkOrange", "white");
    return;
  }

  form.reset();
  showMessage("Movie updated", "chartreuse", "black");
}

/**
 * Confirms and deletes a movie selected by Movie ID.
 * @returns {void}
 */
function deleteClick() {
  const form = document.getElementById("form-delete");
  const movieId = Number(form.elements.movieId.value);
  const movie = movieList.getMovieById(movieId);

  if (movie === null) {
    showMessage("No movie has that ID.", "DarkOrange", "white");
    return;
  }

  const shouldDelete = window.confirm(
    `Do you want to delete movie "${movie.title}"?`
  );

  if (!shouldDelete) {
    showMessage("Delete cancelled", "DarkOrange", "white");
    return;
  }

  movieList.delete(movieId);
  form.reset();
  showMessage("Movie deleted", "chartreuse", "black");
}

// UI functions =========================

/**
 * Opens one of the movie-maintenance tabs.
 * @param {Event} event - The tab button click event.
 * @param {string} action - The ID of the tab content to display.
 * @returns {void}
 */
function openForm(event, action) {
  const tabContent = document.getElementsByClassName("tabcontent");
  const tabLinks = document.getElementsByClassName("tablinks");

  for (let index = 0; index < tabContent.length; index++) {
    tabContent[index].style.display = "none";
  }

  for (let index = 0; index < tabLinks.length; index++) {
    tabLinks[index].className = tabLinks[index].className.replace(
      " active",
      ""
    );
  }

  document.getElementById(action).style.display = "block";
  event.currentTarget.className += " active";
}

/**
 * Displays a feedback message to the user.
 * @param {string} message - The message to display.
 * @param {string} colour - The message background colour.
 * @param {string} textColour - The message text colour.
 * @returns {void}
 */
function showMessage(message, colour, textColour) {
  const messageBox = document.getElementById("msg");

  messageBox.style.display = "block";
  messageBox.textContent = message;
  messageBox.style.backgroundColor = colour;
  messageBox.style.color = textColour;
}

document.getElementById("defaultOpen").click();
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
- comment everythuing super clearly
*/
