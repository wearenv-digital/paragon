const express = require('express');
require('dotenv').config;
var mysql = require('mysql');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3030;

const app = express();

app.use(bodyParser());
app.use(express.static('../public'));
app.use(express.static('/client'))
app.use(require('./routes.js'));


// not needed as were using routes.js
// app.get('/', (req, res) => {
// 	res.send('<h2>Hello Again</h2>');
// });

var server = app.listen

var server = app.listen(port, () => {
	var host = server.address().address;
	var port = server.address().port;
	console.log(`listening on port ${port}`);
});
