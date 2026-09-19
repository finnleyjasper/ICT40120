/**
 * @file movie-list.js
 * @description Defines the MovieList class. It stores Movie objects, changes
 * the array when movies are added, updated, or deleted, and displays the list.
 */

/**
 * Maintains the application's Movie objects and their displayed list.
 * @property {string} rootId - The ID of the HTML list element.
 * @property {Movie[]} movieList - The array of movies being managed.
 */
class MovieList {
  /**
   * Creates a MovieList object and displays its initial movies.
   * @param {string} rootId - The ID of the HTML list element.
   * @param {Movie[]} movies - The initial Movie objects.
   */
  constructor(rootId, movies) {
    // Where to display the list.
    this.rootId = rootId;
    // Movie objects are stored in this array.
    this.movieList = movies;
    // Replace any existing HTML rows with rows made from the movie array.
    this.refresh();
  }

  // HTML SETUP ========================================================================

  /**
   * Creates one HTML list item showing a movie's ID, title, year, and rating.
   * @param {Movie} movie - The movie to display.
   * @returns {void}
   */
  movieRow(movie) {
    // Find the list element in index.html and create a new list item for it.
    const rootElement = document.getElementById(this.rootId);
    const row = document.createElement("li");
    const details = document.createElement("div");

    // Apply the row class.
    row.classList.add("row");
    details.classList.add("movie-details");
    for (const value of [movie.movieId, movie.title, movie.year, `${movie.rating}/5`]) {
      const cell = document.createElement("span");
      cell.textContent = value;
      details.appendChild(cell);
    }
    row.appendChild(details);
    // Add the completed item to the visible movie list.
    rootElement.appendChild(row);
  }

  /**
   * Generate all rows in our movieList (Read)
   * This method will call movieRow for each element in our movieList.
   * This will create all movies for our UI to display
   * @returns {void}
   */
  genMovieList() {
    // Use the array index to visit every movie once.
    for (let index = 0; index < this.movieList.length; index++) {
      this.movieRow(this.movieList[index]);
    }
  }

  /**
   * Displays a supplied list of title-search results. This changes only the
   * visible HTML rows; it does not remove movies from the stored array.
   * @param {Movie[]} list - The movies to display.
   * @returns {void}
   */
  genMovieSearchList(list) {
    // Clear the old rows before displaying the matching movies.
    this.removeElements();

    // Display each matching Movie.
    for (let index = 0; index < list.length; index++) {
      this.movieRow(list[index]);
    }

    if (list.length === 0) {
      const row = document.createElement("li");
      row.textContent = "0 results";
      document.getElementById(this.rootId).appendChild(row);
    }
  }

  /**
   * Removes all displayed movie rows from the HTML list element. The Movie
   * objects remain in the movieList array. This allows a new list to be displayed.
   * @returns {void}
   */
  removeElements() {
    const rootElement = document.getElementById(this.rootId);
    // Remove all visible rows, including a possible "0 results" message.
    rootElement.replaceChildren();
  }

  // FINDING A MOVIE ===============================================================

  /**
   * Searches the array one movie at a time for the supplied Movie ID.
   * @param {number} movieId - The movie ID to find.
   * @returns {number} The matching array index, or -1 if it is not found.
   */
  findIndexById(movieId) {
    // Compare IDs.
    for (let index = 0; index < this.movieList.length; index++) {
      if (this.movieList[index].movieId === movieId) {
        // A matching ID identifies the array position of this movie.
        return index;
      }
    }

    // -1 means that no movie in the array has this ID.
    return -1;
  }

  /**
   * Returns the Movie object with a matching ID, or null if none exists.
   * @param {number} movieId - The movie ID to find.
   * @returns {Movie|null} The matching movie, or null if it is not found.
   */
  getMovieById(movieId) {
    // Reuse the ID search.
    const index = this.findIndexById(movieId);

    if (index === -1) {
      // Return null if no movie found.
      return null;
    }

    // Return the actual Movie object.
    return this.movieList[index];
  }

  // CRUD ========================================================================

  /**
   * Adds a new Movie object when its ID is not already used. The application
   * validates the entered values before calling this method.
   * @param {number} movieId - The unique movie ID.
   * @param {string} title - The movie title.
   * @param {number} year - The movie release year.
   * @param {number} rating - The movie rating from 1 to 5.
   * @returns {boolean} True when added, or false when the ID already exists.
   */
  add(movieId, title, year, rating) {
    // Reject duplicate IDs.
    if (this.findIndexById(movieId) !== -1) {
      return false;
    }

    // Create a Movie instance and append it to the stored array.
    this.movieList.push(new Movie(movieId, title, year, rating));
    // Display the updated array.
    this.refresh();

    // Indicate a success!
    return true;
  }

  /**
   * Updates the title, year, and rating of the Movie with a matching ID. The
   * Movie ID itself stays the same because it's the primary key.
   * @param {number} movieId - The ID of the movie to update.
   * @param {string} title - The updated movie title.
   * @param {number} year - The updated release year.
   * @param {number} rating - The updated rating from 1 to 5.
   * @returns {boolean} True when updated, or false when the ID is not found.
   */
  update(movieId, title, year, rating) {
    // Find the Movie object identified by the supplied ID.
    const movie = this.getMovieById(movieId);

    if (movie === null) {
      // Do not change the list if the user entered an unknown ID.
      return false;
    }

    // Change the properties of the existing Movie object.
    movie.title = title;
    movie.year = year;
    movie.rating = rating;
    // Refresh the updated details and report success!
    this.refresh();
    return true;
  }

  /**
   * Deletes the Movie with a matching ID.
   * @param {number} movieId - The ID of the movie to delete.
   * @returns {boolean} True when deleted, or false when the ID is not found.
   */
  delete(movieId) {
    // Find the array position of the movie to remove.
    const index = this.findIndexById(movieId);

    if (index === -1) {
      // ID does not exist.
      return false;
    }

    // Otherwise, remove the matching Movie object at the matching position.
    this.movieList.splice(index, 1);
    // Refresh the list and report success.
    this.refresh();
    return true;
  }

  /**
   * Sorts the stored array by title from A to Z and refreshes the display.
   * @returns {void}
   */
  sortA2Z() {
    // localeCompare orders text alphabetically; sort changes this array.
    this.movieList.sort(function(a, b) {
      return a.title.localeCompare(b.title);
    });
    // Show the movies in their new order.
    this.refresh();
  }

  /**
   * Sorts the stored array by title from Z to A and refreshes the display.
   * @returns {void}
   */
  sortZ2A() {
    // Reverse the comparison to put in Z --> A.
    this.movieList.sort(function(a, b) {
      return b.title.localeCompare(a.title);
    });
    // Show the movies in their new order.
    this.refresh();
  }

  /**
   * Sorts movies from highest to lowest rating and displays the result.
   * @returns {void}
   */
  sortByRating() {
    this.movieList.sort(function(a, b) {
      return b.rating - a.rating;
    });
    this.refresh();
  }

  /**
   * Restores the default order by sorting Movie IDs from lowest to highest.
   * @returns {void}
   */
  sortById() {
    this.movieList.sort(function(a, b) {
      return a.movieId - b.movieId;
    });
    this.refresh();
  }

  /**
   * Finds movies whose titles contain the supplied text, ignoring letter case,
   * and displays all matches without changing the stored array.
   * @param {string} nameString - The partial title to search for.
   * @returns {void}
   */
  search(nameString) {
    // Hold matching movies separately from the complete movie list.
    const shortList = [];
    // Lowercase the search text so capital letters do not affect the match.
    const searchText = nameString.toLowerCase();

    // Test each movie title for the entered text.
    for (const movie of this.movieList) {
      if (movie.title.toLowerCase().includes(searchText)) {
        // Add matches to the short list for the results view.
        shortList.push(movie);
      }
    }

    // Replace the visible rows with the matches, including an empty list if
    // nothing matched. The full movieList array remains unchanged :D
    this.genMovieSearchList(shortList);
  }

// ==============================================================================

  /**
   * Redraws the full movie list from the current array contents.
   * @returns {void}
   */
  refresh() {
    // Clear old rows first so a refresh does not create duplicate HTML rows.
    this.removeElements();
    // Render the complete array again, including any recent changes.
    this.genMovieList();
  }
}
