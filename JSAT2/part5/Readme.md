#  Movie App.
This app allows the user to view and manipulate a list of movies.
Each Movie contains a unique user-supplied ID, title, year and rating.

# Movie - Class
## Attributes
movieId - a unique positive integer supplied by the user
title - the movie title
year - the movie release year
rating - a whole-number rating from 1 to 5

# MovieList - Class
## Attributes
movieList - a list of movies
rootId - the root element where the list is to appear

## Methods
movieRow - generates one row of the movieList
genMovieList - generates all rows for the movie list for the to display
genMovieSearchList - generates a movieList based on a search term
removeElements - removes the movieList from the display
findIndexById - returns the array index for a Movie ID
getMovieById - returns a single movie using its Movie ID
refresh - refreshes the display
add - add a new Movie when its ID is unique
update - update a Movie using its Movie ID
delete - delete a Movie using its Movie ID
sortA2Z - Sort the list in ascending order and display the movieList
sortZ2A - Sort the list in descending order and display the movieList
search - search the movieList based a search term against the title. The display the results.

# App.js
This file holds the MovieList instance, event listeners and initial Movie objects.
V3 has added in some validation
It also contains JavaScript that creates some of the UI.
