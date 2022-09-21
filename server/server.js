const express = require('express');
require('dotenv').config('./');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
// const ejs = require('ejs');
// var mysqlConf = require('mysql');

const port = process.env.PORT || 3030;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('../public'));
app.use('/public', express.static('../public'));
app.use(require('./routes.js'));

var server = app.listen;

var server = app.listen(port, () => {
	var host = server.address().address;
	var port = server.address().port;
	console.log(`listening on port ${port}`);
});
