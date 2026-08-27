/**
 * Represents a movie!
 */
class Movie {
  /**
   * Creates a new Movie object.
   * @param {string} title - The title of the movie.
   * @param {number} year - The year the movie was released.
   * @param {number} rating - The rating of the movie.
   */
  constructor(title, year, rating) {
    // Generate a random movie ID (though external script will need to validate it's uniqueness)
    this.movieId = Math.floor(Math.random() * 1000000) + 1;
    this.title = title;
    this.year = year;
    this.rating = rating;
  }
}
