const mysql = require('mysql2');
const inquirer = require('inquirer');
const utils = require('util')

const { whatToDo } = require('./interactions/questions');

const db = require('./helpers/connection');

// db.query = utils.promisify(db.query);

function init() {
  console.log('');
  console.log('Greetings Business Owner!');
  whatToDo();
}

init();