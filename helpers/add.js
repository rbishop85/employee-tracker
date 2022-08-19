const mysql = require('mysql2');
const { db } = require('./connection');

const addDept = () => {
    console.log("Adding Department");
};
  
const addRole = () => {
    console.log("Adding Roles");
};
  
const addEmp = () => {
    console.log("Adding Employees");
};

module.exports = { addDept, addRole, addEmp };