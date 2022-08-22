const mysql = require("mysql2");
const inquirer = require("inquirer");
const { db } = require("../helpers/connection");
const utils = require("util");

const { deptList } = require("./department");

const { table } = require("../helpers/utils");

db.query = utils.promisify(db.query);

const roleList = async () => {
  const data = await db.query(`
        SELECT r.id ID, r.title Title, d.name Department, r.salary Salary
        FROM role r
        JOIN department d ON r.department_id = d.id
        `);
  return data;
};

async function viewRole() {
  const info = await roleList();
  table(info);
}

async function addRole() {
  const depts = await deptList();

  const deptChoices = depts.map((dept) => ({
    name: dept.Department,
    value: dept.ID,
  }));

  console.log("");
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

async function remRole() {
  const allRoles = await roleList();

  const roleChoices = allRoles.map((role) => ({
    name: role.Title,
    value: role.ID,
  }));

  const chosenRole = await inquirer.prompt([
    {
      type: "list",
      message: "Which Role would you like to remove?",
      name: "choice",
      choices: roleChoices,
      prefix: "-",
    },
  ]);

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

module.exports = { viewRole, roleList, addRole, remRole };
