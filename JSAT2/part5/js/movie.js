/**
 * @file movie.js
 * @description Defines the Movie class. Each Movie object holds the details
 * for one entry in the movie-management app.
 */

/**
 * Represents one movie with a generated ID, title, year, and rating.
 * MovieList stores these objects in its movieList array.
 * @property {number} movieId - The unique ID used to find this movie.
 * @property {string} title - The movie title.
 * @property {number} year - The release year.
 * @property {number} rating - The rating from 1 to 5.
 */
class Movie {
  /**
   * Creates a Movie object and generates a positive random ID. MovieList checks
   * whether the generated ID is unique before adding the object to its array.
   * @param {string} title - The movie title.
   * @param {number} year - The movie release year.
   * @param {number} rating - The movie rating from 1 to 5.
   */
  constructor(title, year, rating) {
    // Generate a positive random ID from 1 to 1,000,000, as in Part 4.
    this.movieId = Math.floor(Math.random() * 1000000) + 1;
    // Store the supplied values so other code can display and edit them.
    this.title = title;
    this.year = year;
    this.rating = rating;
  }
}
