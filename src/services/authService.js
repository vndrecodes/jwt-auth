/* eslint-disable require-jsdoc */
const jwt = require('jsonwebtoken');

function isAuthenticated(token) {
  let isAuthenticated = false;
  if (!token) return isAuthenticated;
  isAuthenticated = verifyToken(token);

  return isAuthenticated;
}


function isAuthorized(token, id) {
  const tokenPayload = decodeToken(token);
  const tokenUserId = tokenPayload.id;
  return tokenUserId === ~~id;
}


function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET, (err, decode) => {
    return (err) ? false : true;
  });
}


function decodeToken(token) {
  return jwt.verify(token, process.env.SECRET, (err, decode) => {
    return decode;
  });
}

module.exports = {
  isAuthenticated: isAuthenticated,
  isAuthorized: isAuthorized,
};
