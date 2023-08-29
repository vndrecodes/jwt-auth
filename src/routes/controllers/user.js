/* eslint-disable require-jsdoc */
const authentication = require('../../services/authService');
const userRepo = require('../../db/models/userRepo');

async function user(req, res) {
  const token = req.cookies.access_token;
  const userResourceId = req.params.id;
  const isAuthenticated = authentication.isAuthenticated(token);
  const isAuthorized = authentication.isAuthorized(token, userResourceId);
  let user = null;

  if ((!isAuthenticated) || (!isAuthorized)) {
    return res.status(401).send({message: 'Unauthorized'});
  }
  try {
    user = await userRepo.getUserById(userResourceId);
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

  const response = {
    user: {
      name: user.name,
      email: user.email,
    },
  };
  return res
      .status(200)
      .send(response);
}

module.exports = {
  user: user,
};