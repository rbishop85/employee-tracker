const mysql = require('mysql2');
const inquirer = require('inquirer');
const utils = require('util')

const db = require('./helpers/connection');

const { viewDept, deptList, addDept, remDept } = require('./interactions/department');
const { roleList, newRole, deleteRole } = require('./interactions/role');
const { empList, newEmp, updEmpRole, managerList, updEmpMan, deleteEmp } = require('./interactions/employee');
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

async function updateEmpRole() {

const roleOptions = await roleList();

const roleChoices = roleOptions.map(role => ({
  name: role.Title,
  value: role.ID
}) );

const employeeOptions = await empList();

const employeeChoices = employeeOptions.map(employee => ({
  name: (`${employee.FirstName} ${employee.LastName}: ${employee.Title}`),
  value: employee.ID,
}));

console.log('')

const empObject = await inquirer.prompt([
  {
    type: 'list',
    message: `Which employee needs to have their role changed?`,
    name: 'employee',
    choices: employeeChoices,
    prefix: '-'
  },
  {
    type: 'list',
    message: `What is this employee's new role?`,
    name: 'role',
    choices: roleChoices,
    prefix: '-'
  },
]);
updEmpRole(empObject)
console.log("");
console.log(`Employee's role updated.`)
employees();
};

async function updateEmpMan() {

const employeeOptions = await empList();

const employeeChoices = employeeOptions.map(employee => ({
  name: (`${employee.FirstName} ${employee.LastName} - Current Manager: ${employee.Manager}`),
  value: employee.ID,
}));

const managerOptions = await managerList();

const managerChoices = managerOptions.map(manager => ({
  name: manager.name,
  value: manager.id
}) );

const empObject = await inquirer.prompt([
  {
    type: 'list',
    message: `Which employee needs to have their manager changed?`,
    name: 'employee',
    choices: employeeChoices,
    prefix: '-'
  },
  {
    type: 'list',
    message: `Who is this employee's new manager?`,
    name: 'manager',
    choices: managerChoices,
    prefix: '-'
  },
]);
updEmpMan(empObject)
console.log("");
console.log(`Employee's manager updated.`)
employees();

};

async function remEmp() {

const employeeOptions = await empList();

const employeeChoices = employeeOptions.map(emp => ({
  name: (`${emp.FirstName} ${emp.LastName}: ${emp.Title}`),
  value: emp.ID
}) );

const empObject = await inquirer.prompt([
  {
    type: 'list',
    message: 'Which employee would you like to remove?',
    name: 'choice',
    choices: employeeChoices,
    prefix: '-'
  }
]);
deleteEmp(empObject.choice);
console.log('');
console.log("Chosen employee removed.");
employees();
};

function init() {
  console.log('');
  console.log('Greetings Business Owner!');
  whatToDo();
}

init();