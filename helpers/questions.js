// Initial line of questions for user to select what table they want to interact with.
const whatToDoQs = [
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
];   

// Line of questions asking user how they want to interact with departments.
const deptToDoQs = [
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
];

// Line of questions asking user how they want to interact with roles.
const roleToDoQs = [
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
];

// Line of questions asking user how they want to interact with employees.
const empToDoQs = [
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
      name: `Update An Employee's Manager`,
      value: 'updateEmpMan'
    },
    {
      name: `Remove An Employee`,
      value: 'remEmp'
    },
    {
      name: 'Go Back',
      value: 'back'
    }
];

// Question arrays are exported.
module.exports = { whatToDoQs, deptToDoQs, roleToDoQs, empToDoQs };