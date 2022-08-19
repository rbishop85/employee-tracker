const mysql = require('mysql2');
const inquirer = require('inquirer');
const utils = require('util')
const { addDept, addRole, addEmp } = require('./helpers/add');
const { viewDept, viewRole, viewEmp } = require('./helpers/view');
const { updateEmp } = require('./helpers/edit');

const db = require('./helpers/connection');

// db.query = utils.promisify(db.query);

async function whatToDo() {

  const choiceRes = {
    viewDept: viewDept,
    addDept: addDept,
    viewRole: viewRole,
    addRole: addRole,
    viewEmp: viewEmp,
    addEmp: addEmp,
    updateEmp: updateEmp
  }

  const questions = await inquirer.prompt([
    {
      type: 'list',
      message: "What would you like to do?",
      name: 'choice',
      choices: [
        {
          name: 'View All Departments',
          value: 'viewDept'
        },
        {
          name: 'Add A Department',
          value: 'addDept'
        },
        {
          name: 'View All Roles',
          value: 'viewRole'
        },
        {
          name: 'Add A Role',
          value: 'addRole'
        },
        {
          name: 'View All Employees',
          value: 'viewEmp'
        },
        {
          name: 'Add An Employee',
          value: 'addEmp'
        },
        {
          name: `Update An Employee's Role`,
          value: 'updateEmp'
        }
      ],
      prefix: '-'
    }
  ]);

  choiceRes[questions.choice]();

};

function init() {
  whatToDo();
}



init();