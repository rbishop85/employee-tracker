const mysql = require('mysql2');

// Sets up the connection to the database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
);

// Connection settings are exported.
module.exports = { db };