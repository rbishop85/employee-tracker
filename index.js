const mysql = require('mysql2');
const inquirer = require('inquirer');
const utils = require('util')

const db = require('./helpers/connection');

const { viewDept, addDept, remDept } = require('./interactions/department');
const { viewRole, addRole, remRole } = require('./interactions/role');
const { viewEmp, addEmp, updateEmpRole, updateEmpMan, remEmp } = require('./interactions/employee');
const { whatToDoQs, deptToDoQs, roleToDoQs, empToDoQs } = require('./helpers/questions');

const { table } = require('./helpers/utils');

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

async function roles() {

  console.log('');

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

async function employees() {

  console.log('');

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

function init() {
  console.log('');
  console.log('Greetings Business Owner!');
  whatToDo();
}

init();