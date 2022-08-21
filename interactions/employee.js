const mysql = require('mysql2');
const { db } = require('../helpers/connection');
const utils = require('util');

db.query = utils.promisify(db.query);

const empList = async () => {
    const data = await db.query(`
      SELECT e.id ID, e.first_name FirstName, e.last_name LastName, r.title Title, d.name AS Department, r.salary Salary, CONCAT(e2.first_name, ' ', e2.last_name) Manager
      FROM employee e
      JOIN role r ON e.role_id = r.id
      JOIN department d ON r.department_id = d.id
      LEFT JOIN employee e2 ON e.manager_id = e2.id
      `);
    return data;
};

const newEmp = (data) => {
    db.query(`
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)
    `, [data.first, data.last, data.role, data.manager]);
};

const updateEmp = () => {
    console.log("Updating Employees");
};

const managerList = async () => {
  const data = await db.query(`
    SELECT e.id, CONCAT(e.first_name, ' ', e.last_name, ' from ', d.name) name, r.is_manager
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    WHERE r.is_manager = 1
    `);
    // console.log(data);
  return data;
};

module.exports = { empList, newEmp, updateEmp, managerList };

