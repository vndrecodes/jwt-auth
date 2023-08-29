/* eslint-disable require-jsdoc */
const stringUtils = require('./stringUtils');

function isValidEmail(email) {
  if (stringUtils.isEmpty(email)) return false;
  const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const regex = new RegExp(pattern);
  return regex.test(email);
}


function isValidName(name) {
  if (stringUtils.isEmpty(name)) return false;
  const pattern = /^[a-zA-Z0-9_-]{4,20}$/;
  const regex = new RegExp(pattern);
  return regex.test(name);
}


function isValidPassword(password) {
  if (stringUtils.isEmpty(password)) return false;
  const pattern = /^[a-zA-Z0-9]+$/;
  const regex = new RegExp(pattern);
  return regex.test(password);
}


function validateUserRegistration(reqBody) {
  const userKeys = ['name', 'email', 'password'];
  const reqBodyKeySet = new Set(Object.keys(reqBody));
  const validationResult = {isValid: true, message: ''};

  let bodyIsValid = true;
  userKeys.forEach((i) => {
    if (!reqBodyKeySet.has(i)) bodyIsValid = false;
  });

  if (!bodyIsValid) {
    return invalidate(validationResult, 'Invalid request body (missing keys)');
  }

  if (!isValidEmail(reqBody.email)) {
    return invalidate(validationResult, 'Invalid E-Mail address');
  }

  if (!isValidName(reqBody.name)) {
    return invalidate(validationResult, 'Invalid name');
  };

  if (!isValidPassword(reqBody.password)) {
    return invalidate(validationResult, 'Invalid password');
  }

  return validationResult;
}


function invalidate(validationResult, message) {
  validationResult.isValid = false;
  validationResult.message = message;
  return validationResult;
}

module.exports = {
  validateUserRegistration: validateUserRegistration,
};
