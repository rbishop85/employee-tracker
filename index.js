// Pulling in required items.
const inquirer = require('inquirer');
const utils = require('util')

// Pulling in needed functions and data from other files.
const { viewDept, addDept, remDept } = require('./interactions/department');
const { viewRole, addRole, remRole } = require('./interactions/role');
const { viewEmp, addEmp, updateEmpRole, updateEmpMan, remEmp } = require('./interactions/employee');
const { whatToDoQs, deptToDoQs, roleToDoQs, empToDoQs } = require('./helpers/questions');

// Function to ask what table the user wishes to work in and then send them to the related function.
async function whatToDo() {

  console.log('');

  const toDo = {
    departments: departments,
    roles: roles,
    employees: employees
  }

  const options = await inquirer.prompt([
    {
      type: 'list',
      message: 'What system would you like to interact with?',
      name: 'choice',
      choices: whatToDoQs,
      prefix: '-'
    }
  ]);

  console.log("");

  if (options.choice === 'quit') {
    console.log('');
    console.log('Goodbye.');
    process.exit();
  } else {
    toDo[options.choice]();
  }

};

// Function to ask the user what task they wish to perform in the departments table, and then direct them to the selected function.
async function departments() {

  const toDo = {
    viewDept: viewDept,
    addDept: addDept,
    remDept: remDept
  }

  const options = await inquirer.prompt([
    {
      type: 'list',
      message: 'How would you like to interact with Departments?',
      name: 'choice',
      choices: deptToDoQs,
      prefix: '-'
    }
  ]);

  if (options.choice === 'back') {
    whatToDo();
  } else {
    await toDo[options.choice]();
    departments();
  }
};

// Function to ask the user what task they wish to perform in the roles table, and then direct them to the selected function.
async function roles() {

  const toDo = {
    viewRole: viewRole,
    addRole: addRole,
    remRole: remRole
  }

  const options = await inquirer.prompt([
    {
      type: 'list',
      message: 'How would you like to interact with Roles?',
      name: 'choice',
      choices: roleToDoQs,
      prefix: '-'
    }
  ]);

  if (options.choice === 'back') {
    whatToDo();
  } else {
    await toDo[options.choice]();
    roles();
  }
};

// Function to ask the user what task they wish to perform in the employees table, and then direct them to the selected function.
async function employees() {

  const toDo = {
    viewEmp: viewEmp,
    addEmp: addEmp,
    updateEmpRole: updateEmpRole,
    updateEmpMan: updateEmpMan,
    remEmp: remEmp
  }

  const options = await inquirer.prompt([
    {
      type: 'list',
      message: 'How would you like to interact with Employees?',
      name: 'choice',
      choices: empToDoQs,
      prefix: '-'
    }
  ]);

  if (options.choice === 'back') {
    whatToDo();
  } else {
    await toDo[options.choice]();
    employees();
  }

};

// Initial program to welcome the user and then direct them to the Function for them to select their desired task.
function init() {
  console.log('');
  console.log('Greetings Business Owner!');
  whatToDo();
}

// Calling the app's initial function.
init();