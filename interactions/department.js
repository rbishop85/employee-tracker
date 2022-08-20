const mysql = require('mysql2');
const { db } = require('../helpers/connection');
const utils = require('util');

db.query = utils.promisify(db.query);

const deptList = async () => {
    const data = await db.query(`
        SELECT id ID, name Department
        FROM department
        `);
    return data;
};

const newDept = (data) => {
    const name = data.name;
    // console.log(name);
    db.query(`
        INSERT INTO department (name)
        VALUES (?)
    `, name);
};

const deleteDept = (data) => {
    db.query(`
    DELETE FROM department
    WHERE id = ?
    `, data)
};

module.exports = { deptList, newDept, deleteDept };
