# Movie Management App

This is a simple browser-based movie-management application created with HTML,
CSS and JavaScript for a Cert IV TAFE assessment.

The application stores an array of `Movie` objects. Each movie has:

- a unique, user-supplied Movie ID;
- a title;
- a release year; and
- a rating from 1 to 5.

## Features

### Display movie list

The movie list displays a numbered table containing the ID, title, year and
rating of every stored movie.

### Search

The **ID** and **Title** buttons select the search method.

- ID search looks for one exact Movie ID.
- Title search displays every title containing the search text and ignores
  letter case.
- An unsuccessful search displays `0 results`.

### Sort

- **A-Z** sorts movies by title in ascending order.
- **Z-A** sorts movies by title in descending order.
- **Rating** sorts movies from highest to lowest rating.
- The currently selected sort method remains highlighted.

### Refresh

The **Refresh** button:

- clears the search field;
- restores the complete movie list;
- sorts the list into its default ascending Movie ID order; and
- clears the selected title or rating sort indicator.

### Movie maintenance

The maintenance panel contains three tabs:

- **Add** creates a new movie when its details are valid and its ID is unique.
- **Update** loads and changes an existing movie using its Movie ID.
- **Delete** finds a movie by ID and asks for confirmation before removing it.

The displayed movie list refreshes after each successful change.

## Validation

Before a movie is added or updated, the application checks that:

- Movie ID is a positive whole number;
- Movie ID is unique when adding a new movie;
- title is not empty;
- year is a positive whole number; and
- rating is a whole number from 1 to 5.

Feedback messages are displayed when an action succeeds or when entered data
is invalid.

## JavaScript classes

### `Movie`

The `Movie` class represents one movie and stores `movieId`, `title`, `year`
and `rating` properties.

### `MovieList`

The `MovieList` class maintains the array and updates its HTML display.

Important methods include:

- `movieRow(movie)` creates one displayed movie row;
- `genMovieList()` displays the complete list;
- `genMovieSearchList(list)` displays search results;
- `removeElements()` clears displayed rows without deleting stored movies;
- `findIndexById(movieId)` returns a matching array index or `-1`;
- `getMovieById(movieId)` returns a matching movie or `null`;
- `add(movieId, title, year, rating)` adds a movie with a unique ID;
- `update(movieId, title, year, rating)` updates a movie by ID;
- `delete(movieId)` deletes a movie by ID;
- `sortA2Z()` sorts titles in ascending order;
- `sortZ2A()` sorts titles in descending order;
- `sortByRating()` sorts ratings from highest to lowest;
- `sortById()` restores ascending Movie ID order;
- `search(nameString)` performs a partial title search; and
- `refresh()` redraws the complete list.

## Design

The desktop interface uses the Google Font **Inria Sans** and a purple,
light-blue, pink, black and white colour palette. The layout follows the final
project wireframe and is intentionally kept simple for the assessment.

See [Setup.md](Setup.md) for instructions on opening the app and generating
JSDoc documentation.
