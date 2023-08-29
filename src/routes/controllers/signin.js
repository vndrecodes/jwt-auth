/* eslint-disable require-jsdoc */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRepo = require('../../db/models/userRepo');

async function signin(req, res) {
  const emailGiven = req.body.email;
  const passwordGiven = req.body.password;
  let user = null;

  try {
    user = await userRepo.getUserByEmail(emailGiven);
  } catch (err) {
    switch (err.message) {
      case 'User not found.':
        res.status(401).send({message: 'User not found.'});
        break;
      default:
        res.status(500).send({message: 'Internal Server Error'});
    }
    return;
  }

  const passwordIsValid = bcrypt.compareSync(passwordGiven, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({message: 'Invalid credentials.'});
  }

  const secret = process.env.SECRET;
  const token = jwt.sign({id: user.id}, secret, {expiresIn: '1h'});
  const response = {
    user: {
      id: user.id,
    },
    message: 'Login successful',
  };

  return res
      .cookie('access_token', token, {httpOnly: true})
      .status(200)
      .send(response);
}

module.exports = {
  signin: signin,
};
