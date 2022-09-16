const express = require('express');
const bodyParser = require('body-parser');
const util = require('node:util');
var mysqlConf = require('./sqlconfig.js').mysql_pool;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// dont touch this IT WORKS

async function getFeatures(req) {
	var connection = await util.promisify(
		mysqlConf.getConnection.bind(mysqlConf)
	)();
	console.log(`connected as id ${connection.threadId}`);
	var rows = await util.promisify(connection.query.bind(connection))(
		'SELECT * FROM cam_features WHERE product_code = ?',
		[req.params.product_code]
	);
	connection.release();
	var result;
	Object.keys(rows).forEach(function (key) {
		result = rows[key];
		console.log(result);
	});
	return result;
}

// This gets the row from

async function getInfo(req) {
	var connection = await util.promisify(
		mysqlConf.getConnection.bind(mysqlConf)
	)();
	console.log(`connected as id ${connection.threadId}`);
	var rows = await util.promisify(connection.query.bind(connection))(
		'SELECT * FROM camera_info WHERE product_code = ?',
		[req.params.product_code]
	);
	connection.release();
	var result;
	Object.keys(rows).forEach(function (key) {
		result = rows[key];
		// console.log(result);
	});
	return result;
}

exports.getInfo = getInfo;
exports.getFeatures = getFeatures;
