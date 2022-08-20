const mysql = require('mysql2');
const { db } = require('../helpers/connection');
const utils = require('util');

db.query = utils.promisify(db.query);

const viewDept = async () => {
    const data = await db.query(`
        SELECT id ID, name Department
        FROM department
        `);
    return data;
};

const addDept = async () => {
    console.log("Adding Department");
};

module.exports = { viewDept, addDept };
