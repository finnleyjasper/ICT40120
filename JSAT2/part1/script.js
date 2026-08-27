function runArrayTasks() {
    // Create an array of numbers
    const numbers = [11, 5, 8, 3, 25, 16, 31, 45, 14, 20];
    // Log the original array to the console
    console.log("The number array is:", numbers);

    // Sort the array in ascending order
    // Simply using sort() will not work as expected because it sorts elements as strings by default.
    numbers.sort(function(a, b){return a - b});
    console.log("The array in ascending order is:", numbers);

    // Insert three more numbers and keep the array in ascending order
    numbers.push(19, 23, 30);
    numbers.sort(function(a, b){return a - b});
    console.log("The array with the new numbers is:", numbers);

    // Remove 8 and 31 and make sure the remaining numbers stay in ascending order
    // Use splice to remove elements by their index - delete() will leave undefined holes!
    numbers.splice(numbers.indexOf(8), 1); // At the index of 8, remove 1 element
    numbers.splice(numbers.indexOf(31), 1); // At the index of 31, remove 1 element
    console.log("The array after removing 8 and 31 is:", numbers);

    /**
     * Searches an array one element at a time for a target value.
     * @param {number[]} array - The array to search.
     * @param {number} value - The target value to find.
     * @returns {number} The target value's index, or -1 if it is not found.
     */
    function sequentialSearch(array, value) {
      // While the index is less than the length, search for the value
      for (let index = 0; index < array.length; index++) {
        // If the element at the current index is equal to the value, return the index
        if (array[index] === value) {
          return index;
        }
      }
      // If the value is not found, return -1
      return -1;
    }

    console.log("The index of 25 is:", sequentialSearch(numbers, 25));
    console.log("Searching for an element not in the array returns:", sequentialSearch(numbers, 100));

    /**
     * Searches a sorted array for a target value using binary search.
     * @param {number[]} array - The sorted array to search.
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
            if (array[mid] === key) {
                found = mid;
                break;
            } else if (array[mid] < key) {
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

    console.log("The index of 25 using binary search is:", binarySearch(numbers, 25));
    console.log("Searching for an element not in the array using binary search returns:", binarySearch(numbers, 100));
}

// Add an event listener to the button to run the array tasks when clicked
document.getElementById("run-script").addEventListener("click", runArrayTasks);
