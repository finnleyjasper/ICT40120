/**
 * @file movie.js
 * @description Defines the Movie class. Each Movie object holds the details
 * for one entry in the movie-management app.
 */

/**
 * Represents one movie with a user-supplied ID, title, year, and rating.
 * MovieList stores these objects in its movieList array.
 * @property {number} movieId - The unique ID used to find this movie.
 * @property {string} title - The movie title.
 * @property {number} year - The release year.
 * @property {number} rating - The rating from 1 to 5.
 */
class Movie {
  /**
   * Creates a Movie object using values supplied by the application. The ID is
   * not generated here: MovieList checks whether it is unique before adding
   * the new object to the array.
   * @param {number} movieId - The unique, user-supplied movie ID.
   * @param {string} title - The movie title.
   * @param {number} year - The movie release year.
   * @param {number} rating - The movie rating from 1 to 5.
   */
  constructor(movieId, title, year, rating) {
    // Store the values as properties so other code can display and edit them.
    this.movieId = movieId;
    this.title = title;
    this.year = year;
    this.rating = rating;
  }
}
