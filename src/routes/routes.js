const express = require('express');
const router = express.Router();
const signup = require('./controllers/signup');
const signin = require('./controllers/signin');
const dashboard = require('./controllers/dashboard');
const users = require('./controllers/user');
const path = require('path');
const staticSitesPath = path.resolve(`${__rootdir}/static`);

router.get('/', (req, res) => {
  res.sendFile(`${staticSitesPath}/pages/index.html`);
});

router.post('/signup', signup.signup, (req, res) => {});
router.get('/signup', (req, res) => {
  res.sendFile(`${staticSitesPath}/pages/signup.html`);
});

router.get('/signin', (req, res) => {
  res.sendFile(`${staticSitesPath}/pages/signin.html`);
});
router.post('/signin', signin.signin, (req, res) => {});

// authentication / authorization needed
router.get('/dashboard', dashboard.dashboard, (req, res) => {});

router.get('/users/:id', users.user, (req, res) =>{});


module.exports = {
  router: router,
};
