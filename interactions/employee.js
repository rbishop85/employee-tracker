const mysql = require('mysql2');
const { db } = require('../helpers/connection');
const utils = require('util');

db.query = utils.promisify(db.query);

const viewEmp = async () => {
    // const data = await db.query('SELECT * FROM employee');
    const data = await db.query(`
      SELECT e.id ID, e.first_name FirstName, e.last_name LastName, r.title Title, d.name AS Department, r.salary Salary, CONCAT(e2.first_name, ' ', e2.last_name) Manager
      FROM employee e
      JOIN role r ON e.role_id = r.id
      JOIN department d ON r.department_id = d.id
      LEFT JOIN employee e2 ON e.manager_id = e2.id
      `);
    return data;
};

const addEmp = () => {
    console.log("Adding Employees");
};

const updateEmp = () => {
    console.log("Updating Employees");
  };

module.exports = { viewEmp, addEmp, updateEmp };


// 'SELECT * FROM employee AS e JOIN role AS r ON e.role_id = r.id'

// SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, e2.first_name