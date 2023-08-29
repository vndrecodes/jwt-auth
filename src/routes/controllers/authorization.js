/* eslint-disable require-jsdoc */
const jwt = require('jsonwebtoken');

function verifyToken(req, res) {
  let validHeader = req?.headers?.authorization;
  validHeader &&= (req.headers.authorization.split(' ')[0] === 'JWT');
  const loginStatus = {authenticated: false, error: ''};

  if (!validHeader) {
    loginStatus.error = 'Missing JWT.';
    return loginStatus;
  }

  const tokenGiven = req.headers.authorization.split(' ')[1];
  jwt.verify(tokenGiven, process.env.SECRET, (err, decode) => {
    if (err) {
      loginStatus.error = err;
      return loginStatus;
    } else {
      loginStatus.authenticated = true;
      return loginStatus;
    }
  });
}

module.exports = {
  verifyToken: verifyToken,
};
