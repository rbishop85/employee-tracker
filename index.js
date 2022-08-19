const mysql = require('mysql2');
const inquirer = require('inquirer');
const utils = require('util')
const { addDept, addRole, addEmp } = require('./helpers/add');
const { viewDept, viewRole, viewEmp } = require('./helpers/view');
const { updateEmp } = require('./helpers/edit');

const db = require('./helpers/connection');

// db.query = utils.promisify(db.query);

async function whatToDo() {

  console.log("");

  const toDo = {
    departments: departments,
    roles: roles,
    employees: employees
  }

  const options = await inquirer.prompt([
    {
      type: 'list',
      message: "What system would you like to interact with?",
      name: 'choice',
      choices: [
        {
          name: 'Departments',
          value: 'departments'
        },
        {
          name: 'Roles',
          value: 'roles'
        },
        {
          name: 'Employees',
          value: 'employees'
        },
        {
          name: 'Quit Program',
          value: 'quit'
        }
      ],
      prefix: '-'
    }
  ]);

  if (options.choice === 'quit') {
    process.exit();
  } else {
    toDo[options.choice]();
  }

};

async function departments() {

  console.log("");

  const toDo = {
    viewDept: viewDept,
    addDept: addDept
  }

  const options = await inquirer.prompt([
    {
      type: 'list',
      message: "How would you like to interact with Departments?",
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
          name: 'Go Back',
          value: 'back'
        }
      ],
      prefix: '-'
    }
  ]);

  if (options.choice === 'back') {
    whatToDo();
  } else {
    toDo[options.choice]();
  }

};

async function roles() {

  console.log("");

  const toDo = {
    viewRole: viewRole,
    addRole: addRole
  }

  const options = await inquirer.prompt([
    {
      type: 'list',
      message: "How would you like to interact with Roles?",
      name: 'choice',
      choices: [
        {
          name: 'View All Roles',
          value: 'viewRole'
        },
        {
          name: 'Add A Role',
          value: 'addRole'
        },
        {
          name: 'Go Back',
          value: 'back'
        }
      ],
      prefix: '-'
    }
  ]);

  if (options.choice === 'back') {
    whatToDo();
  } else {
    toDo[options.choice]();
  }

};

async function employees() {

  console.log("");

  const toDo = {
    viewEmp: viewEmp,
    addEmp: addEmp,
    updateEmp: updateEmp
  }

  const options = await inquirer.prompt([
    {
      type: 'list',
      message: "How would you like to interact with Employees?",
      name: 'choice',
      choices: [
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
        },
        {
          name: 'Go Back',
          value: 'back'
        }
      ],
      prefix: '-'
    }
  ]);

  if (options.choice === 'back') {
    whatToDo();
  } else {
    toDo[options.choice]();
  }

};

function init() {
  console.log("");
  console.log("Greetings Business Owner!");
  whatToDo();
}

init();