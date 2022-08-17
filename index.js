const mysql = require('mysql2');
const inquirer = require('inquirer');
const { addDept, addRole, addEmp } = require('./helpers/add')
const { viewDept, viewRole, viewEmp } = require('./helpers/view')

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
  );

function whatToDo() {
  inquirer.prompt([
    {
      type: 'list',
      message: "What would you like to do?",
      name: 'choice',
      choices: [
        'View All Departments',
        'Add A Department',
        'View All Roles',
        'Add A Role',
        'View All Employees',
        'Add An Employee',
        `Update An Employee's Role`,
      ],
      prefix: '-'
    }
  ])
  .then((response) => {
    switch (response.choice) {
      case 'View All Departments':
        viewDept();
        break;
      case 'Add A Department':
        addDept();
        break;
      case 'View All Roles':
        viewRole();
        break;
      case 'Add A Role':
        addRole();
        break;
      case 'View All Employees':
        viewEmp();
        break;
      case 'Add An Employee':
        addEmp();
        break;
      case `Update An Employee's Role`:
        updateEmp();
        break;
    }
  })

};

function init() {
  whatToDo();
}



const updateEmp = () => {
  console.log("Updating Employees");
};

init();