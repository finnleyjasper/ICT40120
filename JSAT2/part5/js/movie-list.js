/**
 * @file movie-list.js
 * @description This file holds the class definition of our MovieList Class.
 * cSpell:ignore Amberle Seidl
 * @author Amberle Seidl
 * @version 2.0.0
 * @since v2
 * getRow()
 */
 
/**
 * MovieList Class
 * This class has 2 properties and numerous methods.
 * Look at the Readme.md file for full list of methods.
 * @class 
 * @property {string} rootId - The id of the html element where the list is
 * to be displayed.
 * @property {Array} movieList - the array of movies to store.
 * @property {function} refresh - the method to remove all current elements 
 * and display the current movie list.
 */

class MovieList{
  constructor(rootId, movies){
    this.rootId = rootId; // The html id of where the list is going
    this.movieList = movies; // The array of movies to be displayed
    this.refresh();
  }

  // Methods
  /**
   * Generate one row of the movieList for display.
   * This function will create the necessary elements for displaying a 
   * single movie to the UI.
   * @function movieRow
   * @param {string} title - The title of the movie
   * @param {number} year - The year of the movie
   */
  movieRow(title, year){
    // Get the parent element
    const rootElement = document.getElementById(this.rootId);
    // Create the new div
    const row = document.createElement('li');
    // Adding the class and text to the element we created
    row.classList.add('row');
    row.textContent = `${title} (${year})`;
    // Add the new elements we created to the DOM.
    rootElement.appendChild(row);
  }

  /**
   * Generate all rows in our movie list - Read.
   * This function wil call movieRow() for each element in our movieList.
   * This will create all movies for our UI to display.
   * @function genMovieList
   */
  
  genMovieList(){
    // Loop through the movieList
    for(let i = 0; i < this.movieList.length; i++){
      let movie = this.movieList[i];
      console.log(movie);
      // Call the movieRow function to generate a row
      this.movieRow(movie.title, movie.year);
    }
  }

  /**
   * Generates a movie list based on our search term - Read.
   * @param {Array} list - The list of movies to display based on the    
   * search term.
   */
  
  genMovieSearchList(list){
    // Remove all elements from the display
    this.removeElements();
    // Generate a new list, with the list we passed through.
    // Loop through the passed in list
    for(let i = 0; i < list.length; i++){
      let movie = list[i];
      // Call the movieRow function to generate a row
      this.movieRow(movie.title, movie.year);
    }
  }

  /**
   * Remove all list elements from the DOM.
   * Allows a new list to be displayed.
   * @function removeElements 
   */
  
  removeElements(){
    // Get the parent element
    const rootElement = document.getElementById(this.rootId);
    // Get all elements with the class name of row.
    const childNodes = document.getElementsByClassName('row');
    // childNodes is an array of htmlElements. [0,1,2,3,4,5,6,7,8]
    // How many children do we have.
    const len = childNodes.length - 1;
    for(let i = len; i >= 0; i--){
      // Pull out the last child
      const child = childNodes[i];
      // Remove this child from the DOM
      rootElement.removeChild(child);
    }
  }

  /**
   * A function that will return a row / movie from the movie list.
   * @param {number} id - The index of the movie we wish to find.
   * @returns {object} a movie from the list based on the index.
   */
  getRow(id){
    console.log("Get ROW id:", id);
    const row = this.movieList.find((movie, index) => index === id);
    console.log(row);
    return row;
  }

  /**
   * Calls the removeElements() to remove elements from the UI.
   * Calls genMovieList() to add elements to the UI.
   * @function refresh
   * 
   */
  refresh(){
    // We need to remove all elements.
    this.removeElements();
    // We generate the list to display
    this.genMovieList();
  }
  
  /**
   * Adding a new movie to the movieList - Create.
   * @param {string} title - The movie title.
   * @param {number} year - The year the movie was made.
   */

  add(title, year){
    // Add a new movie to the end of the list.
    this.movieList.push({ title: title, year: year });
    // Write this code another way (ES6)
    // this.movieList.push({ title, year});
    this.refresh();
  }

  
  /**
   * Update a movie in the movie list - Update
   * @param {number} index - The index of the movie to update
   * @param {string} title - The new movie title
   * @param {number} year  - The new year the movie was made.
   */
  update(index, title, year){
    // Update title
    this.movieList[index].title = title;
    // Update the year
    this.movieList[index].year = year;
    // Refresh the list.
    this.refresh();
  }

  
  /**
   * Delete a movie from the movie list - Delete
   * @param {number} index - The index of the movie to delete
   */
  delete(index){
    // Remove one index from the array
    // NOTE: we should validate the index here
    // Test for out of bounds.
    this.movieList.splice(index, 1);
    // Refresh the list
    this.refresh();
  }

  /**
   * Sort the movieList from A to Z, in ascending order
   */
    sortA2Z(){
    this.movieList.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
    this.refresh();
  }
  
  /**
   * Sort the movieList from Z to A, in descending order
   */
  sortZ2A(){
    this.movieList.sort(function (a, b) {
      return b.title.localeCompare(a.title);
    });
    this.refresh();
  }

  /**
   * Search the movieList titles for a partial match based on a search string.
   * Will call the genMovieSearchList() method when done to show the results in the UI
   * @param {string} nameString - The partial title to search for
   * 
   */
  search(nameString){
    // Create a new list to hold search results
    let shortList = [];
    // Use a loop to check to see if the nameString is in a movie title
    for (let movie of this.movieList){
      // check if the nameString is in the movie title.
      if(movie.title.includes(nameString)){
        // if the nameString  is in the movie title, add this to our shortlist
        shortList.push(movie);
      }
    }
    // Generate the list to display
    this.genMovieSearchList(shortList);
  }
}