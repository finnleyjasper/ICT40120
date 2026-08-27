// Declare an empty array of movies
let movies = [];

/**
 * Creates a movie whose randomly generated ID is not already in use.
 * @param {string} title - The movie title.
 * @param {number} year - The movie release year.
 * @param {number} rating - The movie rating.
 * @param {Movie[]} movieArray - The array to check for matching IDs.
 * @returns {Movie} A movie with a unique ID.
 */
function createMovieWithUniqueId(title, year, rating, movieArray) {
    // Declare new movie
    let movie;
    // Bool for checking if the ID is unique
    let idIsUnique;

    // Generate a movie until the ID is unique
    do {
        movie = new Movie(title, year, rating);
        idIsUnique = true;

        // Check the array for a movie with the same ID
        for (let index = 0; index < movieArray.length; index++) {
        // If a movie with the same ID is found, set idIsUnique to false and break the loop
        if (movieArray[index].movieId === movie.movieId) {
            idIsUnique = false;
            break;
        }
        }
    } while (!idIsUnique);

    // Return the movie with a unique ID :)
    return movie;
}

/**
 * Creates an unsorted array of ten movies and prints it to the console.
 * @returns {void}
 */
function createMovieArray() {
  movies = [];

  movies.push(createMovieWithUniqueId("Happy Movie", 1962, 4, movies));
  movies.push(createMovieWithUniqueId("Sad Movie", 1999, 5, movies));
  movies.push(createMovieWithUniqueId("Funny Movie", 1975, 4, movies));
  movies.push(createMovieWithUniqueId("Angry Movie", 1995, 5, movies));
  movies.push(createMovieWithUniqueId("Bad Movie", 1979, 4, movies));
  movies.push(createMovieWithUniqueId("Good Movie", 1972, 5, movies));
  movies.push(createMovieWithUniqueId("Problematic Movie", 1993, 4, movies));
  movies.push(createMovieWithUniqueId("Animated Movie", 2001, 5, movies));
  movies.push(createMovieWithUniqueId("Sad Movie: The Sequel", 1976, 4, movies));
  movies.push(createMovieWithUniqueId("Disaster Movie", 2010, 5, movies));

  console.log("Unsorted movie array:", movies);
}

// Run the createMovieArray function when the button is clicked
document.getElementById("run-script").addEventListener("click", createMovieArray);
