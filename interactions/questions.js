const inquirer = require('inquirer');
const { deptList, newDept, deleteDept } = require('./department');
const { roleList, newRole, deleteRole } = require('./role');
const { empList, newEmp, updateEmp, managerList } = require('./employee');
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
  console.log('');
  console.log('New department added.')
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
      addRole: addRole,
      remRole: remRole
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
            name: 'Remove A Role',
            value: 'remRole'
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

async function viewRole() {
  const info = await roleList();
  table(info);
  roles();
};

async function addRole() {

  const depts = await deptList();

  const deptChoices = depts.map(dept => ({
    name: dept.Department,
    value: dept.ID
  }) );

  console.log("Adding New Role...")
  const roleObject = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the new role?',
      name: 'name',
      prefix: '-',
      validate: Boolean
    },
    {
      type: 'input',
      message: 'What is the salary for the new role?',
      name: 'salary',
      prefix: '-',
      validate: function(value) {
        var pass = !isNaN(value)
        if (pass) {
          return true
        }
        return 'Please enter a valid number for the salary'
      },
    },
    {
      type: 'list',
      message: 'Which department does the role belong to?',
      name: 'dept',
      choices: deptChoices,
      prefix: '-'
    },
    {
      type: 'list',
      message: 'Is this role considered a manager?',
      name: 'manager',
      choices: [
        {
          name: 'Yes',
          value: true
        },
        {
          name: 'No',
          value: false
        }
      ],
      prefix: '-'
    }
  ]);
  newRole(roleObject);
  console.log("");
  console.log('New role added.')
  roles();

};

async function remRole() {

  const allRoles = await roleList();

  // console.log(allRoles);

  const roleChoices = allRoles.map(role => ({
    name: role.Title,
    value: role.ID
  }) );

  const chosenRole = await inquirer.prompt([
    {
      type: 'list',
      message: 'Which Department would you like to remove?',
      name: 'choice',
      choices: roleChoices,
      prefix: '-'
    }
  ]);

  deleteRole(chosenRole.choice);
  console.log("Chosen role removed.")
  roles();

};
  
async function employees() {
  
    console.log('');
  
    const toDo = {
      viewEmp: viewEmp,
      addEmp: addEmp,
      updateEmpRole: updateEmpRole
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
            value: 'updateEmpRole'
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

async function viewEmp() {
  const info = await empList();
  table(info);
  employees();
};

async function addEmp() {

  const roleOptions = await roleList();

  const roleChoices = roleOptions.map(role => ({
    name: role.Title,
    value: role.ID
  }) );

  const managerOptions = await managerList();

  const managerChoices = managerOptions.map(manager => ({
    name: manager.name,
    value: manager.id
  }) );

  console.log("Adding New Employee...")
  const empObject = await inquirer.prompt([
    {
      type: 'input',
      message: `What is the employee's first name?`,
      name: 'first',
      prefix: '-',
      validate: Boolean
    },
    {
      type: 'input',
      message: `What is the employee's last name?`,
      name: 'last',
      prefix: '-',
      validate: Boolean
    },
    {
      type: 'list',
      message: `What is this employee's role?`,
      name: 'role',
      choices: roleChoices,
      prefix: '-'
    },
    {
      type: 'list',
      message: `Who is this employee's manager?`,
      name: 'manager',
      choices: managerChoices,
      prefix: '-'
    },
  ]);
  newEmp(empObject);
  console.log("");
  console.log('New employee added.')
  employees();
};


module.exports = { whatToDo };