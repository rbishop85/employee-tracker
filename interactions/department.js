// Pulls in required items.
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { db } = require("../helpers/connection");
const utils = require("util");
const { table } = require("../helpers/utils");

// Allows db.query to use async and await.
db.query = utils.promisify(db.query);

// DB query to pull departments list.
const deptList = async () => {
  const data = await db.query(`
        SELECT id ID, name Department
        FROM department
        `);
  return data;
};

// Function to display list of departments.
const viewDept = async () => {
  const info = await deptList();
  table(info);
};

// Function to add a new department.
const addDept = async () => {
  console.log("");
  // Asks the user for info about the new department.
  const deptName = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the new department?",
      name: "name",
      prefix: "-",
      validate: Boolean,
    },
  ]);
  // Inserts the created department into the table.
  await db.query(
    `
        INSERT INTO department (name)
        VALUES (?)
    `,
    deptName.name
  );
  console.log("");
  console.log("New department added.");
  console.log("");
};

// Function to remove a department.
const remDept = async () => {
  console.log("");
  // Pulls a list of departments
  const depts = await deptList();

  // Creates choice list of available departments.
  const deptChoices = depts.map((dept) => ({
    name: dept.Department,
    value: dept.ID,
  }));

  // Asks the user which department they wish to remove.
  const chosenDept = await inquirer.prompt([
    {
      type: "list",
      message: "Which Department would you like to remove?",
      name: "choice",
      choices: deptChoices,
      prefix: "-",
    },
  ]);
  // Removes the selected department from the table.
  await db.query(
    `
    DELETE FROM department
    WHERE id = ?
    `,
    chosenDept.choice
  );
  console.log("");
  console.log("Chosen department removed.");
  console.log("");
}

// Exports functions needed to be called elsewhere.
module.exports = { viewDept, deptList, addDept, remDept };