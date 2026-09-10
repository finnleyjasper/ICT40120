/**
 * @file movie-list.js
 * @description Defines the MovieList class used to manage and display movies.
 */

/**
 * Maintains the application's Movie objects and their displayed list.
 */
class MovieList {
  /**
   * Creates a MovieList object.
   * @param {string} rootId - The ID of the HTML list element.
   * @param {Movie[]} movies - The initial Movie objects.
   */
  constructor(rootId, movies) {
    this.rootId = rootId;
    this.movieList = movies;
    this.refresh();
  }

  /**
   * Creates and displays one movie row.
   * @param {Movie} movie - The movie to display.
   * @returns {void}
   */
  movieRow(movie) {
    const rootElement = document.getElementById(this.rootId);
    const row = document.createElement("li");

    row.classList.add("row");
    row.textContent =
      `ID: ${movie.movieId} | ${movie.title} (${movie.year}) | ` +
      `Rating: ${movie.rating}/5`;
    rootElement.appendChild(row);
  }

  /**
   * Displays every movie in the movie list.
   * @returns {void}
   */
  genMovieList() {
    for (let index = 0; index < this.movieList.length; index++) {
      this.movieRow(this.movieList[index]);
    }
  }

  /**
   * Displays a supplied list of search results.
   * @param {Movie[]} list - The movies to display.
   * @returns {void}
   */
  genMovieSearchList(list) {
    this.removeElements();

    for (let index = 0; index < list.length; index++) {
      this.movieRow(list[index]);
    }
  }

  /**
   * Removes all displayed movie rows.
   * @returns {void}
   */
  removeElements() {
    const rootElement = document.getElementById(this.rootId);
    rootElement.replaceChildren();
  }

  /**
   * Returns the index of a movie with a matching ID.
   * @param {number} movieId - The movie ID to find.
   * @returns {number} The matching array index, or -1 if it is not found.
   */
  findIndexById(movieId) {
    for (let index = 0; index < this.movieList.length; index++) {
      if (this.movieList[index].movieId === movieId) {
        return index;
      }
    }

    return -1;
  }

  /**
   * Returns a movie with a matching ID.
   * @param {number} movieId - The movie ID to find.
   * @returns {Movie|null} The matching movie, or null if it is not found.
   */
  getMovieById(movieId) {
    const index = this.findIndexById(movieId);

    if (index === -1) {
      return null;
    }

    return this.movieList[index];
  }

  /**
   * Refreshes the displayed movie list.
   * @returns {void}
   */
  refresh() {
    this.removeElements();
    this.genMovieList();
  }

  /**
   * Adds a Movie when its ID is unique.
   * @param {number} movieId - The unique movie ID.
   * @param {string} title - The movie title.
   * @param {number} year - The movie release year.
   * @param {number} rating - The movie rating from 1 to 5.
   * @returns {boolean} True when added, or false when the ID already exists.
   */
  add(movieId, title, year, rating) {
    if (this.findIndexById(movieId) !== -1) {
      return false;
    }

    this.movieList.push(new Movie(movieId, title, year, rating));
    this.refresh();
    return true;
  }

  /**
   * Updates the movie with a matching ID.
   * @param {number} movieId - The ID of the movie to update.
   * @param {string} title - The updated movie title.
   * @param {number} year - The updated release year.
   * @param {number} rating - The updated rating from 1 to 5.
   * @returns {boolean} True when updated, or false when the ID is not found.
   */
  update(movieId, title, year, rating) {
    const movie = this.getMovieById(movieId);

    if (movie === null) {
      return false;
    }

    movie.title = title;
    movie.year = year;
    movie.rating = rating;
    this.refresh();
    return true;
  }

  /**
   * Deletes the movie with a matching ID.
   * @param {number} movieId - The ID of the movie to delete.
   * @returns {boolean} True when deleted, or false when the ID is not found.
   */
  delete(movieId) {
    const index = this.findIndexById(movieId);

    if (index === -1) {
      return false;
    }

    this.movieList.splice(index, 1);
    this.refresh();
    return true;
  }

  /**
   * Sorts movie titles from A to Z and refreshes the display.
   * @returns {void}
   */
  sortA2Z() {
    this.movieList.sort(function(a, b) {
      return a.title.localeCompare(b.title);
    });
    this.refresh();
  }

  /**
   * Sorts movie titles from Z to A and refreshes the display.
   * @returns {void}
   */
  sortZ2A() {
    this.movieList.sort(function(a, b) {
      return b.title.localeCompare(a.title);
    });
    this.refresh();
  }

  /**
   * Displays movies containing a partial title, ignoring letter case.
   * @param {string} nameString - The partial title to search for.
   * @returns {void}
   */
  search(nameString) {
    const shortList = [];
    const searchText = nameString.toLowerCase();

    for (const movie of this.movieList) {
      if (movie.title.toLowerCase().includes(searchText)) {
        shortList.push(movie);
      }
    }

    this.genMovieSearchList(shortList);
  }
}
