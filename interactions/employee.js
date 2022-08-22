const mysql = require("mysql2");
const inquirer = require("inquirer");
const { db } = require("../helpers/connection");
const utils = require("util");

const { roleList } = require("./role");

const { table } = require("../helpers/utils");

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

const viewEmp = async () => {
  const info = await empList();
  table(info);
};

const addEmp = async () => {
  const roleOptions = await roleList();

  const roleChoices = roleOptions.map((role) => ({
    name: role.Title,
    value: role.ID,
  }));

  const managerOptions = await managerList();

  const managerChoices = managerOptions.map((manager) => ({
    name: manager.name,
    value: manager.id,
  }));

  console.log("");
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

const updateEmpRole = async () => {

const roleOptions = await roleList();

const roleChoices = roleOptions.map(role => ({
  name: role.Title,
  value: role.ID
}) );

const employeeOptions = await empList();

const employeeChoices = employeeOptions.map(employee => ({
  name: (`${employee.FirstName} ${employee.LastName}: ${employee.Title}`),
  value: employee.ID,
}));

console.log('')
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

const updateEmpMan = async () => {

const employeeOptions = await empList();

const employeeChoices = employeeOptions.map(employee => ({
  name: (`${employee.FirstName} ${employee.LastName} - Current Manager: ${employee.Manager}`),
  value: employee.ID,
}));

const managerOptions = await managerList();

const managerChoices = managerOptions.map(manager => ({
  name: manager.name,
  value: manager.id
}) );

console.log("");
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

const remEmp = async () => {

const employeeOptions = await empList();

const employeeChoices = employeeOptions.map(emp => ({
  name: (`${emp.FirstName} ${emp.LastName}: ${emp.Title}`),
  value: emp.ID
}) );

console.log("");
const empObject = await inquirer.prompt([
  {
    type: 'list',
    message: 'Which employee would you like to remove?',
    name: 'choice',
    choices: employeeChoices,
    prefix: '-'
  }
]);

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

module.exports = {
  viewEmp,
  addEmp,
  updateEmpRole,
  updateEmpMan,
  remEmp,
};
