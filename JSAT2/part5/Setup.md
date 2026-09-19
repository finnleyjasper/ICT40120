# Setting Up the Movie Management App

## Requirements

The application requires:

- a modern web browser such as Google Chrome; and
- an internet connection to download the Inria Sans font from Google Fonts.

The app uses plain HTML, CSS and JavaScript. It does not require a web server,
database or JavaScript framework.

## Folder structure

```text
part5/
├── index.html
├── Readme.md
├── Setup.md
├── B5Test_Plan_and_Result_Template.xlsx
├── css/
│   └── style.css
└── js/
    ├── movie.js
    ├── movie-list.js
    └── app.js
```

Additional `package.json` and `package-lock.json` files provide the optional
JSDoc development dependency.

## Running the application

1. Open the `part5` folder.
2. Open `index.html` in Google Chrome or another modern browser.
3. The initial movie array will be displayed automatically.

No terminal command or build step is required to use the application.

## JavaScript loading order

The scripts are loaded at the bottom of `index.html` in this order:

1. `movie.js` defines the `Movie` class.
2. `movie-list.js` defines the `MovieList` class and uses `Movie`.
3. `app.js` creates the initial objects and connects the UI event handlers.

This order is important because each later script uses code defined by the
scripts before it.

## File responsibilities

### `index.html`

Defines the desktop UI, including:

- the movie table;
- A-Z, Z-A and rating sort controls;
- the Refresh button;
- ID and title search controls; and
- Add, Update and Delete maintenance forms.

### `css/style.css`

Controls the wireframe-based layout, Inria Sans font, colour palette, table,
tabs, buttons, form fields, hover states and selected-control styles.

### `js/movie.js`

Defines the `Movie` class containing Movie ID, title, year and rating.

### `js/movie-list.js`

Defines the `MovieList` class. It stores the movie array, renders rows, performs
ID lookups, handles CRUD operations, searches, sorts and refreshes the display.

### `js/app.js`

Creates the initial `Movie` objects and the application `MovieList`. It also
validates form values, connects buttons to event handlers, controls tabs,
manages search modes and displays user feedback.

## Optional JSDoc generation

Node.js is only required if you want to generate documentation from the JSDoc
comments.

From the `part5` directory, install the dependency:

```bash
npm install
```

Then generate the documentation:

```bash
npm run doc
```

The generated files will be placed in a `docs` folder.

## Basic testing workflow

After opening the app, test the following:

1. Search for an existing and missing Movie ID.
2. Search for part of a title using different letter cases.
3. Test A-Z, Z-A and rating sorting.
4. Press Refresh and confirm the complete list returns in Movie ID order.
5. Add a valid movie and attempt to add a duplicate ID.
6. Update a movie using its ID.
7. Delete a movie and test cancelling the confirmation dialog.
8. Confirm the list updates after each successful maintenance action.

Record the results in `B5Test_Plan_and_Result_Template.xlsx` if required for
the assessment submission.
