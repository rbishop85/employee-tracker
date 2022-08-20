



// View all departments
    // SELECT * FROM department;

// View all roles
    // SELECT * FROM role;

// View all empoyees
    // SELECT * FROM empoyee (try to bring in joins to mirror example video);

// Create new department
    // INSERT INTO department (name)
        // VALUES ("Sales");

// Create a new role
    // INSERT INTO role (title, salary, department_id)
        // VALUES ("Manager", 120000, 1)


// Use object to store keys linked to functions
    // Inquirer choices list has values that point to those keys to then run the functions!
    // Look at day 3 after-class video for full walkthrough

// What would you like to interact with?
    // Departments
    // Roles
    // Employees


    //Departments
        // View Departments
        // Add Department
        // - Remove Department
        // - View tota budget of department (combined salary of all employees)

    // Roles
        // View Roles
        // Add Role
        // - Remove Role

    // Empoyees
        // View Empoyees
        // Add Employee
        // Update Employee's Role
        // - Update Employee's Manager
        // - View Employees by Manager
        // - View Employees by Department
        // - Remove Employee

        const array = [{myId: 42, name: 'John', color: 'red'}, {myId: 1337, name: 'Jane', color: 'blue'}]

// const transformed = array.reduce((acc, {myId, ...x}) => { acc[myId] = x; return acc}, {})

console.table(array)