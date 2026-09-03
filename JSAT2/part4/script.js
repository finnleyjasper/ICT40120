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

/**
 * Sorts the movies array in ascending numeric order by each movie's ID
 * and prints the sorted array to the console.
 * @returns {void}
 */
function sortMoviesById() {
    // Sort the movie array in ascending order by Movie ID, making sure to do a numeric comparison instead of a string comparison!
    movies.sort(function(a, b) {
    return a.movieId - b.movieId;
    });

    // Log the sorted movie array to the console
    console.log("Movies sorted by Movie ID:", movies);
}

/**
 * Searches a sorted array for a target value using binary search (exact same code as in part 1)
 * @param {Movie[]} array - The sorted movie array to search.
 * @param {number} key - The target value to find.
 * @returns {number} The target value's index, or -1 if it is not found.
 */
function binarySearch(array, key) {
    // Not found by default
    let found = -1;

    // Create the start and end points
    let start = 0;
    let end = array.length - 1;

    while (start <= end) {
        // Find mid point
        let mid = Math.floor((start + end) / 2);

        // Test if the mid point is what we are looking for
        if (array[mid].movieId === key) {
            found = mid;
            break;
        } else if (array[mid].movieId < key) {
            // Search right half of array
            start = mid + 1;
        } else {
            // Search left half of array
            end = mid - 1;
        }
    }
    // Return the index of the found element or -1 if not found
    return found;
}

/**
 * Finds the movie at index 1 in the array. Assumes createMovieArray has been called.
 * @returns {number} The index of the movie that was found.
 */
function findExistingMovie() {

    const movieIDToFind = movies[1].movieId; // Get the ID of the second movie in the array
    console.log("Searching for movie with ID:", movies[1].movieId, movies[1].title);

    // Binary search requires the array to be sorted first.
    sortMoviesById();

    const foundIndex = binarySearch(movies, movieIDToFind);
    console.log("Movie found at index:", foundIndex);
    return foundIndex;
}

/**
 * Searches for the invalid ID -500 to demonstrate a not-found result.
 * @returns {number} -1 because no movie has this ID.
 */
function findMissingMovie() {
    const foundIndex = binarySearch(movies, -500);
    console.log("Movie at index -500 not found; result is:", foundIndex);
    return foundIndex;
}

// Run the createMovieArray function when the button is clicked
document.getElementById("make-movies").addEventListener("click", createMovieArray);
// Run the sortMoviesById function when the button is clicked
document.getElementById("sort-movies").addEventListener("click", sortMoviesById);
// Search for an existing movie when the button is clicked
document.getElementById("find-movie").addEventListener("click", findExistingMovie);
// Search for an ID that does not exist when the button is clicked
document.getElementById("dont-find-movie").addEventListener("click", findMissingMovie);
