const mysql = require('mysql2');
const { db } = require('./connection');

const updateEmp = () => {
    console.log("Updating Employees");
  };



module.exports = { updateEmp };