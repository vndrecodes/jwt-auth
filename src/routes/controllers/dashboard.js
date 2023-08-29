/* eslint-disable require-jsdoc */
const authentication = require('../../services/authService');

function dashboard(req, res) {
  const token = req.cookies.access_token;
  const isAuthenticated = authentication.isAuthenticated(token);

  if (isAuthenticated) {
    return res.sendFile(`${__rootdir}/static/pages/dashboard.html`);
  }
  return res.redirect('/signin');
}

module.exports = {
  dashboard: dashboard,
};
