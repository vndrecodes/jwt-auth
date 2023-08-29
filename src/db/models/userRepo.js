/* eslint-disable require-jsdoc */
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/database.db');

function getUserByEmail(email) {
  const sql = `SELECT id, name, email, password
                FROM users
                WHERE email = '${email}'`;

  return queryDb(sql);
}


function getUserById(id) {
  const sql = `SELECT id, name, email, password
                FROM users
                WHERE id = '${id}'`;

  return queryDb(sql);
}


function queryDb(sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, (error, user) =>{
      if (error) {
        return reject(error);
      }
      if (!user) {
        return reject(new Error('User not found.'));
      }
      return resolve(user);
    });
  });
}

module.exports = {
  getUserByEmail: getUserByEmail,
  getUserById: getUserById,
};
