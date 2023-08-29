global.__rootdir = __dirname;
const express = require('express');
const app = express();
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use(express.static(__dirname+ '/static'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(routes.router);

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
