const inquirer = require('inquirer');
const { deptList, newDept, deleteDept } = require('./department');
const { viewRole, addRole } = require('./role');
const { viewEmp, addEmp, updateEmp } = require('./employee');
const { table } = require('../helpers/utils');

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
      console.log('');
      console.log('Goodbye.');
      process.exit();
    } else {
      toDo[options.choice]();
    }
  
};

async function departments() {

    console.log('');
  
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
            name: 'Remove A Department',
            value: 'remDept'
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

async function viewDept() {
  const info = await deptList();
  table(info);
  departments();
};

async function addDept() {
  console.log("Adding New Department...")
  const deptName = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the new department?',
      name: 'name',
      prefix: '-',
      validate: Boolean
    }
  ]);
  newDept(deptName);
  console.log("");
  console.log(`${deptName.name} added to Departments list.`)
  departments();

};

async function remDept() {

  const depts = await deptList();

  const deptChoices = depts.map(dept => ({
    name: dept.Department,
    value: dept.ID
  }) );

  const chosenDept = await inquirer.prompt([
    {
      type: 'list',
      message: 'Which Department would you like to remove?',
      name: 'choice',
      choices: deptChoices,
      prefix: '-'
    }
  ]);

  console.log(chosenDept.choice);
  deleteDept(chosenDept.choice);
  console.log("Chosen department removed.")
  departments();


};
  
async function roles() {
  
    console.log('');
  
    const toDo = {
      viewRole: viewRole,
      addRole: addRole
    }
  
    const options = await inquirer.prompt([
      {
        type: 'list',
        message: 'How would you like to interact with Roles?',
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
      const info = await toDo[options.choice]();
      table(info);
      roles();
    }
  
};
  
async function employees() {
  
    console.log('');
  
    const toDo = {
      viewEmp: viewEmp,
      addEmp: addEmp,
      updateEmp: updateEmp
    }
  
    const options = await inquirer.prompt([
      {
        type: 'list',
        message: 'How would you like to interact with Employees?',
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
      const info = await toDo[options.choice]();
      table(info);
      employees();
    }
  
};












module.exports = { whatToDo };