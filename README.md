# Employee Tracker

A command-line application used to manage a company's employee database.

---

Created by: Robert Bishop

This project is intended as a homework assignment for class.  Questions, comments, suggestions and constructive criticism are always welcome.

<a href="mailto: rbishop85@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a>
<a href="https://github.com/rbishop85" target="_blank"><img src="	https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>
<a href="https://www.linkedin.com/in/robert-m-bishop/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>

---

## Contents:
* [Demo](#demo)
* [Install](#install)
* [Usage](#usage)
* [Skills/Concepts Used](#skillsconcepts-used)
* [Steps Taken](#steps-taken)
* [Thoughts/Future Ideas](#thoughtsfuture-ideas)
* [Links](#links)
* [License](#license)

---

## Demo:

> Video demoing team profile generator in action.

https://user-images.githubusercontent.com/103389448/185840499-e945aa2f-8c76-4072-82b0-e6af8488b0eb.mp4

---

## Install:

To ensure that the necessary dependencies are pulled down, in this case "Inquirer" for handling command line questions and "mysql2" for dealing with the database, make sure to key in:
```
npm i
```

Before running the app you'll also want to run the schema and seeds file to ensure that you have a starting database to work with.  Make sure to log into mysql and then key:
```
source schema.sql
source seeds.sql
```

---

## Usage:

After dependencies have been loaded, simly key the following into your command prompt to start the app.
```
node index.js
```
Once up and running simply navigate through the prompts.

---

## Skills/Concepts Used:

* Javascript
  - Node.js
  - Inquirer npm
  - MySQL
  - C.R.U.D. (Create, Read, Update, Delete)

---

## Steps Taken:

- [x] Created repo and installed required dependencies.
- [x] Setup initial schema and seeds files.
- [x] Started working on initial function layout.
- [x] Setup questions for asking user what they want to do and running appropriate function.
- [x] Started separating functions into separate js files for organization.
- [x] Master questions list separated by table user is working in.
- [x] Setup functions for viewing each table's contents.
- [x] Created functions for creating and deleting within each table.
- [x] Added some additional functions for editing employees.
- [x] Moved question lists into array variables and stored them in separate file to clean up index.
- [x] Moved all individual table functions aside from starter questions into their respective separate js files.
- [x] Final format and cleanup, along with adding notes and creating README.

---

## Thoughts/Future Ideas:

Given more time I'd like to add in more functions for editing items already in the tables.  Also I had wanted to work on some checks to make sure people don't accidentally remove data.

---

## Links:

<a href="https://nodejs.org/en/" target="_blank">Node.js</a>

<a href="https://www.npmjs.com/package/mysql2" target="_blank">MySQL 2</a>

<a href="https://www.npmjs.com/package/inquirer" target="_blank">Inquirer</a>

---

## License:


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

[Top of Page](#employee-tracker)
