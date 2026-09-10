/**
 * @file movie.js
 * @description Defines the Movie class used by the movie-management app!
 */

/**
 * Represents one movie.
 */
class Movie {
  /**
   * Creates a Movie object.
   * @param {number} movieId - The unique, user-supplied movie ID.
   * @param {string} title - The movie title.
   * @param {number} year - The movie release year.
   * @param {number} rating - The movie rating.
   */
  constructor(movieId, title, year, rating) {
    this.movieId = movieId;
    this.title = title;
    this.year = year;
    this.rating = rating;
  }
}
