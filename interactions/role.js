// Pulls in required items.
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { db } = require("../helpers/connection");
const utils = require("util");
const { table } = require("../helpers/utils");

// Connects to needed departments function.
const { deptList } = require("./department");

// Allows db.query to use async and await.
db.query = utils.promisify(db.query);

// DB query to pull roles list.
const roleList = async () => {
  const data = await db.query(`
        SELECT r.id ID, r.title Title, d.name Department, r.salary Salary
        FROM role r
        JOIN department d ON r.department_id = d.id
        `);
  return data;
};

// Function to display list of roles.
const viewRole = async () => {
  const info = await roleList();
  table(info);
}

// Function to add a new role
const addRole = async () => {
  // Pulls a list of available departments and assigns them to a choices list.
  const depts = await deptList();

  const deptChoices = depts.map((dept) => ({
    name: dept.Department,
    value: dept.ID,
  }));

  console.log("");
  // Asks the user for info about the new role, and selects a department to assign it to.
  const roleObject = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the new role?",
      name: "name",
      prefix: "-",
      validate: Boolean,
    },
    {
      type: "input",
      message: "What is the salary for the new role?",
      name: "salary",
      prefix: "-",
      validate: function (value) {
        var pass = !isNaN(value);
        if (pass) {
          return true;
        }
        return "Please enter a valid number for the salary";
      },
    },
    {
      type: "list",
      message: "Which department does the role belong to?",
      name: "dept",
      choices: deptChoices,
      prefix: "-",
    },
    {
      type: "list",
      message: "Is this role considered a manager?",
      name: "manager",
      choices: [
        {
          name: "Yes",
          value: true,
        },
        {
          name: "No",
          value: false,
        },
      ],
      prefix: "-",
    },
  ]);

  // Inserts the new role into the table.
  await db.query(
    `
        INSERT INTO role (title, salary, department_id, is_manager)
        VALUES (?, ?, ?, ?)
    `,
    [roleObject.name, roleObject.salary, roleObject.dept, roleObject.manager]
  );

  console.log("");
  console.log("New role added.");
  console.log("");
}

// Function to remove a role.
const remRole = async () => {
  // Pulls a list of available roles and assigns them to a choices list.
  const allRoles = await roleList();

  const roleChoices = allRoles.map((role) => ({
    name: role.Title,
    value: role.ID,
  }));

  // Asks the user which role they wish to remove.
  console.log("");
  const chosenRole = await inquirer.prompt([
    {
      type: "list",
      message: "Which Role would you like to remove?",
      name: "choice",
      choices: roleChoices,
      prefix: "-",
    },
  ]);

  // Removes the selected role from the table.
  await db.query(
    `
        DELETE FROM role
        WHERE id = ?
        `,
    chosenRole.choice
  );

  console.log("");
  console.log("Chosen role removed.");
  console.log("");
}

// Exports functions needed to be called elsewhere.
module.exports = { viewRole, roleList, addRole, remRole };