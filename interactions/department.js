const mysql = require("mysql2");
const inquirer = require("inquirer");
const { db } = require("../helpers/connection");
const utils = require("util");

const { table } = require("../helpers/utils");

db.query = utils.promisify(db.query);

const viewDept = async () => {
  const info = await deptList();
  table(info);
};

const deptList = async () => {
  const data = await db.query(`
        SELECT id ID, name Department
        FROM department
        `);
  return data;
};

const addDept = async () => {
  console.log("Adding New Department...");
  const deptName = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the new department?",
      name: "name",
      prefix: "-",
      validate: Boolean,
    }
  ]);

  await db.query(
    `
        INSERT INTO department (name)
        VALUES (?)
    `,
    deptName.name
  );
  console.log("");
  console.log("New department added.");
};

async function remDept() {
  const depts = await deptList();

  const deptChoices = depts.map((dept) => ({
    name: dept.Department,
    value: dept.ID,
  }));

  const chosenDept = await inquirer.prompt([
    {
      type: "list",
      message: "Which Department would you like to remove?",
      name: "choice",
      choices: deptChoices,
      prefix: "-",
    }
  ]);
  await db.query(
    `
    DELETE FROM department
    WHERE id = ?
    `,
    chosenDept.choice
  );
  console.log("");
  console.log("Chosen department removed.");
};

module.exports = { viewDept, deptList, addDept, remDept };