const mysql = require('mysql2');
const { db } = require('../helpers/connection');
const utils = require('util');

db.query = utils.promisify(db.query);

const viewRole = async () => {
    const data = await db.query(`
        SELECT r.id ID, r.title Title, d.name Department, r.salary Salary
        FROM role r
        JOIN department d ON r.department_id = d.id
        `);
    return data;
};

const addRole = () => {
    console.log("Adding Roles");
};

module.exports = { viewRole, addRole };