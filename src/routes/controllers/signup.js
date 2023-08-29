/* eslint-disable require-jsdoc */
const bcrypt = require('bcrypt');
const User = require('../../db/models/user');
const sqlite3 = require('sqlite3');
// TODO provide db service, since relative path differ (eg. app.js and signup.js different nesting)
const db = new sqlite3.Database('./db/database.db');
const {validateUserRegistration} = require('../../services/formValidationService');

function signup(req, res) {
  const isValidUserData = validateUserRegistration(req.body);
  if (!isValidUserData.isValid) {
    return res
        .status(400)
        .json({
          message: isValidUserData.message,
          msg: 'here',
        });
  };

  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const user = new User(req.body.name, req.body.email, hashedPassword);
  const sql = `
    INSERT INTO users (name, email, password) 
    VALUES ('${user.name}', '${user.email}', '${user.password}')
  `;

  db.run(sql, (error) => {
    if (error) {
      const code = error.code;
      console.error(error);
      res.status(500).send({message: code});
    } else {
      res.status(200).send({message: 'Registered successfully'});
    }
  });
}

module.exports = {
  signup: signup,
};
