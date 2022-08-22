// Pulls in required items.
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { db } = require("../helpers/connection");
const utils = require("util");
const { table } = require("../helpers/utils");

// Connects to needed roles function.
const { roleList } = require("./role");

// Allows db.query to use async and await.
db.query = utils.promisify(db.query);

// DB query to pull employees list.
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

// Function to display list of employees.
const viewEmp = async () => {
  const info = await empList();
  table(info);
};

// Function to add a new employee.
const addEmp = async () => {
  // Pulls list of available roles and assigns them to a choice list.
  const roleOptions = await roleList();

  const roleChoices = roleOptions.map((role) => ({
    name: role.Title,
    value: role.ID,
  }));
  // Pulls list of available managers and assigns them to a choice list.
  const managerOptions = await managerList();

  const managerChoices = managerOptions.map((manager) => ({
    name: manager.name,
    value: manager.id,
  }));

  console.log("");
  // Asks the user for info about the new user.
  const empObject = await inquirer.prompt([
    {
      type: "input",
      message: `What is the employee's first name?`,
      name: "first",
      prefix: "-",
      validate: Boolean,
    },
    {
      type: "input",
      message: `What is the employee's last name?`,
      name: "last",
      prefix: "-",
      validate: Boolean,
    },
    {
      type: "list",
      message: `What is this employee's role?`,
      name: "role",
      choices: roleChoices,
      prefix: "-",
    },
    {
      type: "list",
      message: `Who is this employee's manager?`,
      name: "manager",
      choices: managerChoices,
      prefix: "-",
    },
  ]);
  // Inserts the new employee into the table.
  await db.query(
    `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)
    `,
    [empObject.first, empObject.last, empObject.role, empObject.manager]
  );

  console.log("");
  console.log("New employee added.");
  console.log("");
};

// Function to update an employee's role.
const updateEmpRole = async () => {
// Pulls list of available roles and assigns them to a choices array.
const roleOptions = await roleList();

const roleChoices = roleOptions.map(role => ({
  name: role.Title,
  value: role.ID
}) );

// Pulls list of available employees and assigns them to a choices array.
const employeeOptions = await empList();

const employeeChoices = employeeOptions.map(employee => ({
  name: (`${employee.FirstName} ${employee.LastName}: ${employee.Title}`),
  value: employee.ID,
}));

console.log('')
// Asks the user about the employee they wish to update and the new role they wish to assign.
const empObject = await inquirer.prompt([
  {
    type: 'list',
    message: `Which employee needs to have their role changed?`,
    name: 'employee',
    choices: employeeChoices,
    prefix: '-'
  },
  {
    type: 'list',
    message: `What is this employee's new role?`,
    name: 'role',
    choices: roleChoices,
    prefix: '-'
  },
]);
// Edits given employee's data in the table to reflect the new role.
await db.query(
    `
        UPDATE employee
        SET role_id = ?
        WHERE id = ?
    `,
    [empObject.role, empObject.employee]
  );

console.log("");
console.log(`Employee's role updated.`);
console.log("");
};

// Function to update an employee's manager
const updateEmpMan = async () => {
// Pulls a list of available employees and adds them to a choices array.
const employeeOptions = await empList();

const employeeChoices = employeeOptions.map(employee => ({
  name: (`${employee.FirstName} ${employee.LastName} - Current Manager: ${employee.Manager}`),
  value: employee.ID,
}));
// Pulls a list of available managers and adds them to a choices array.
const managerOptions = await managerList();

const managerChoices = managerOptions.map(manager => ({
  name: manager.name,
  value: manager.id
}) );

console.log("");
// Asks user which employee they wish to edit and which manager they wish to assign to them.
const empObject = await inquirer.prompt([
  {
    type: 'list',
    message: `Which employee needs to have their manager changed?`,
    name: 'employee',
    choices: employeeChoices,
    prefix: '-'
  },
  {
    type: 'list',
    message: `Who is this employee's new manager?`,
    name: 'manager',
    choices: managerChoices,
    prefix: '-'
  },
]);
// Edits given employee's data in the table to reflect new manager assigned.
await db.query(
    `
        UPDATE employee
        SET manager_id = ?
        WHERE id = ?
    `,
    [empObject.manager, empObject.employee]
  );

console.log("");
console.log(`Employee's manager updated.`);
console.log("");
};

// Function to remove an employee.
const remEmp = async () => {
// Pulls a list of available employees and assigns them to a choices array.
const employeeOptions = await empList();

const employeeChoices = employeeOptions.map(emp => ({
  name: (`${emp.FirstName} ${emp.LastName}: ${emp.Title}`),
  value: emp.ID
}) );

console.log("");
// Asks user which employee they wish to remove.
const empObject = await inquirer.prompt([
  {
    type: 'list',
    message: 'Which employee would you like to remove?',
    name: 'choice',
    choices: employeeChoices,
    prefix: '-'
  }
]);
// Edits employees table to remove selected employee.
await db.query(
    `
    DELETE FROM employee
    WHERE id = ?
    `,
    empObject.choice
  );

console.log('');
console.log("Chosen employee removed.");
console.log("");
};

// DB query to pull list of managers.
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

// Exports functions needed to be called elsewhere.
module.exports = {
  viewEmp,
  addEmp,
  updateEmpRole,
  updateEmpMan,
  remEmp,
};