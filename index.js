const mysql = require('mysql2');
const inquirer = require("inquirer");

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'employee_tracker_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );