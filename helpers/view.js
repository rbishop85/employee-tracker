const mysql = require('mysql2');
const { db } = require('./connection');

const viewDept = () => {
    console.log("Viewing Departments");
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
      });
};

const viewRole = () => {
    console.log("Viewing Roles");
    db.query('SELECT * FROM role', function (err, results) {
        console.log(results);
      });
};

const viewEmp = () => {
    console.log("Viewing Employees");
    db.query('SELECT * FROM employee', function (err, results) {
        console.log(results);
      });
};

module.exports = { viewDept, viewRole, viewEmp };