/**
 * @file app.js
 * @description This file contains the JavaScript for the movie app. It Creates the initial movies, connects buttons to their event handlers, and manages the forms and feedback messages in the UI.
 */

// MOVIES ========================================================================
/**
 * The mock details used to create the initial movies when the page loads.
 * MovieList creates each Movie and ensures its generated ID is unique.
 * @type {Array<(string|number)[]>}
 */
const initialMovieDetails = [
  ["Super Amazing Film", 1984, 5],
  ["Really Terrible Movie", 2005, 2],
  ["Funny Movie", 2012, 4],
  ["Just Okay Film", 2008, 3],
  ["I Can't Believe They Made Another: Really Terrible Movie II", 2009, 1],
  ["Some Romcom", 2004, 3]
];

/**
 * The MovieList instance used by the application. The "list" argument is the
 * ID of the HTML element where MovieList displays the movies.
 * @type {MovieList}
 */
const movieList = new MovieList("list", []);

// Add the starting movies through MovieList so every generated ID is unique.
for (const details of initialMovieDetails) {
  movieList.add(details[0], details[1], details[2]);
}

// Display the initial movies in the same default ID order used by Refresh.
movieList.sortById();

// EVENT HANDLERS ========================================================================

// Get the search, sort, and maintenance buttons from the HTML page by ID.
// Keep these references so we can attach handlers.
const searchButton = document.getElementById("searchBtn");
const sortA2ZButton = document.getElementById("sortA2ZBtn");
const sortZ2AButton = document.getElementById("sortZ2ABtn");
const sortRatingButton = document.getElementById("sortRatingBtn");
const refreshButton = document.getElementById("refreshBtn");
const searchByIdButton = document.getElementById("searchByIdBtn");
const searchByTitleButton = document.getElementById("searchByTitleBtn");
const addSubmit = document.getElementById("addSubmit");
const updateSubmit = document.getElementById("updateSubmit");
const deleteSubmit = document.getElementById("deleteSubmit");
const deleteConfirmModal = document.getElementById("deleteConfirmModal");
const deleteModalMessage = document.getElementById("deleteModalMessage");
const cancelDeleteButton = document.getElementById("cancelDeleteBtn");
const confirmDeleteButton = document.getElementById("confirmDeleteBtn");
// This input will use a change handler rather than click.
const updateMovieId = document.getElementById("upMovieId");

// Pass each button's relevant function to addEventListener.
searchButton.addEventListener("click", searchClick);
sortA2ZButton.addEventListener("click", a2zClick);
sortZ2AButton.addEventListener("click", z2aClick);
sortRatingButton.addEventListener("click", ratingClick);
refreshButton.addEventListener("click", refreshClick);
searchByIdButton.addEventListener("click", selectIdSearch);
searchByTitleButton.addEventListener("click", selectTitleSearch);
addSubmit.addEventListener("click", addClick);
updateSubmit.addEventListener("click", updateClick);
deleteSubmit.addEventListener("click", deleteClick);
cancelDeleteButton.addEventListener("click", cancelDelete);
confirmDeleteButton.addEventListener("click", confirmDelete);
deleteConfirmModal.addEventListener("cancel", cancelDelete);
// Load the existing movie details when the user changes the update form's ID.
updateMovieId.addEventListener("change", getUpdateMovieData);

// VALIDATION =========================================================================

/**
 * Checks the title, year, and rating entered before saving a movie.
 * The year must be a positive whole number, the title must contain text, and
 * the rating must be a whole number from 1 to 5.
 * @param {string} title - The movie title.
 * @param {number} year - The release year.
 * @param {number} rating - The rating from 1 to 5.
 * @returns {boolean} True when every value is valid.
 */
function movieDetailsAreValid(title, year, rating) {
  // All conditions must be true for the movie details to be valid.
  // const pattern = /^[a-z0-9\s]*$/i


  return title.trim() !== "" &&
    Number.isInteger(year) && year > 0 &&
    Number.isInteger(rating) && rating >= 1 && rating <= 5;
}

// ==========================

let searchMode = "id";

/**
 * Selects ID search and updates the search form's visible label.
 * @returns {void}
 */
function selectIdSearch() {
  searchMode = "id";
  document.getElementById("searchLabel").textContent = "Movie ID:";
  searchByIdButton.classList.add("active");
  searchByTitleButton.classList.remove("active");
  searchByIdButton.setAttribute("aria-pressed", "true");
  searchByTitleButton.setAttribute("aria-pressed", "false");
}

/**
 * Selects title search and updates the search form's visible label.
 * @returns {void}
 */
function selectTitleSearch() {
  searchMode = "title";
  document.getElementById("searchLabel").textContent = "Title:";
  searchByTitleButton.classList.add("active");
  searchByIdButton.classList.remove("active");
  searchByTitleButton.setAttribute("aria-pressed", "true");
  searchByIdButton.setAttribute("aria-pressed", "false");
}

/**
 * Searches for a movie by ID or for movies containing a partial title.
 * @event Click#searchBtn
 * @function searchClick
 * @returns {void}
 */
function searchClick(){
  // Get the controls inside the search form.
  let formElements = document.getElementById("form-list-control").elements;
  // Read the text the user typed into the title-search field.
  let text = formElements["search-string"].value;
  if (searchMode === "id") {
    const movie = movieList.getMovieById(Number(text));
    movieList.genMovieSearchList(movie === null ? [] : [movie]);
  } else {
    // Ask MovieList to find and display matching titles.
    movieList.search(text);
  }
}

/**
 * Marks the selected sort button, or clears the selection for default ID order.
 * @param {HTMLButtonElement|null} selectedButton - The selected button, or null.
 * @returns {void}
 */
function selectSortButton(selectedButton) {
  for (const button of [sortA2ZButton, sortZ2AButton, sortRatingButton]) {
    button.classList.toggle("active", button === selectedButton);
    button.setAttribute("aria-pressed", String(button === selectedButton));
  }
}

/**
 * Handles a click on the A-Z button by asking MovieList to sort by title.
 * @returns {void}
 */
function a2zClick() {
  // MovieList performs the sort and redraws the list.
  movieList.sortA2Z();
  selectSortButton(sortA2ZButton);
}

/**
 * Handles a click on the Z-A button by asking MovieList to sort by title.
 * @returns {void}
 */
function z2aClick() {
  // MovieList performs the sort and redraws the list.
  movieList.sortZ2A();
  selectSortButton(sortZ2AButton);
}

/**
 * Shows movies in order from highest to lowest rating.
 * @returns {void}
 */
function ratingClick() {
  movieList.sortByRating();
  selectSortButton(sortRatingButton);
}

/**
 * Clears the search input and restores the full list in default Movie ID order.
 * @returns {void}
 */
function refreshClick() {
  document.getElementById("searchInput").value = "";
  movieList.sortById();
  selectSortButton(null);
}

/**
 * Reads the add form, validates the details, and adds a new movie with a
 * unique randomly generated ID.
 * @event Click#addSubmit
 * @function addClick
 * @description add a new movie to the list
 */
function addClick() {
  // Get the add form and read each of its three input fields.
  const form = document.getElementById("form-add");
  // Remove accidental spaces before and after the title.
  const title = form.elements.title.value.trim();
  const year = Number(form.elements.year.value);
  const rating = Number(form.elements.rating.value);

  // Stop before changing the movie list if any required detail is invalid.
  if (!movieDetailsAreValid(title, year, rating)) {
    showMessage(
      "Enter a title, a positive whole-number year, and a rating from 1 to 5."
    );
    return; // Leave the form filled so the user can correct it.
  }

  // MovieList generates an ID and retries automatically if it is already used.
  const movie = movieList.add(title, year, rating);

  // The movie was added successfully; clear the form and show confirmation.
  form.reset();
  showMessage(`Movie added with ID ${movie.movieId}`);
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
    showMessage("No movie has that ID.");
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
  if (!Number.isInteger(movieId) || movieId <= 0 ||
      !movieDetailsAreValid(title, year, rating)) {
    showMessage("Enter valid details before updating.");
    return; // Keep the entered details available for correction.
  }

  // update() returns false when the ID is not present in the movie list.
  if (!movieList.update(movieId, title, year, rating)) {
    showMessage("No movie has that ID.");
    return;
  }

  // A successful update redraws the list; now clear the form and report it.
  form.reset();
  showMessage("Movie updated");
}

let pendingDeleteMovieId = null;

/**
 * Finds a movie by its ID and opens the deletion confirmation modal.
 * @returns {void}
 */
function deleteClick() {
  // Read the ID from the delete form and retrieve the matching movie.
  const form = document.getElementById("form-delete");
  const movieId = Number(form.elements.movieId.value);
  const movie = movieList.getMovieById(movieId);

  // Do not ask for confirmation when the entered ID does not exist.
  if (movie === null) {
    showMessage("No movie has that ID.");
    return;
  }

  // Remember which movie will be deleted if the user confirms the modal.
  pendingDeleteMovieId = movieId;
  deleteModalMessage.textContent =
    `Do you want to delete movie "${movie.title}"?`;
  deleteConfirmModal.showModal();
}

/**
 * Closes the delete modal without changing the movie array.
 * @param {Event} [event] - The optional dialog cancel event.
 * @returns {void}
 */
function cancelDelete(event) {
  // Prevent the Escape key from closing the modal before this function runs.
  if (event) {
    event.preventDefault();
  }

  pendingDeleteMovieId = null;
  deleteConfirmModal.close();
  showMessage("Delete cancelled");
}

/**
 * Deletes the selected movie after confirmation in the modal.
 * @returns {void}
 */
function confirmDelete() {
  // Do nothing if no movie has been selected for deletion.
  if (pendingDeleteMovieId === null) {
    return;
  }

  const form = document.getElementById("form-delete");

  // Remove the selected movie, reset the form, and close the modal.
  movieList.delete(pendingDeleteMovieId);
  pendingDeleteMovieId = null;
  form.reset();
  deleteConfirmModal.close();
  showMessage("Movie deleted");
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

let messageTimeoutId;

/**
 * Displays a success, error, or cancellation message for five seconds.
 * @param {string} message - The message to display.
 * @returns {void}
 */
function showMessage(message) {
  // Find the message area shared by the add, update, and delete forms.
  const messageBox = document.getElementById("msg");

  // Stop an older timer from hiding this new message too early using built-in clearTimeout().
  clearTimeout(messageTimeoutId);

  // Make the message visible and set its text.
  messageBox.style.display = "block";
  messageBox.textContent = message;

  // Hide and clear the message after five seconds with an anonymous function.
  messageTimeoutId = setTimeout(function() {
    messageBox.style.display = "none";
    messageBox.textContent = "";
  }, 5000);
}

// Open the default maintenance tab when the page first loads.
document.getElementById("defaultOpen").click();
// Display the current year in the page footer.
document.getElementById("date").textContent = new Date().getFullYear();
