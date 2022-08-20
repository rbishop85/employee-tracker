const mysql = require('mysql2');
const { db } = require('../helpers/connection');
const utils = require('util');

db.query = utils.promisify(db.query);

const roleList = async () => {
    const data = await db.query(`
        SELECT r.id ID, r.title Title, d.name Department, r.salary Salary
        FROM role r
        JOIN department d ON r.department_id = d.id
        `);
    return data;
};

const newRole = (data) => {
    console.log(data);
    db.query(`
        INSERT INTO role (title, salary, department_id, is_manager)
        VALUES (?, ?, ?, ?)
    `, [data.name, data.salary, data.dept, data.manager]);
};

const deleteRole = (data) => {
    db.query(`
    DELETE FROM role
    WHERE id = ?
    `, data);
};

module.exports = { roleList, newRole, deleteRole };