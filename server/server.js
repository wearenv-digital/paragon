const express = require('express');
require('dotenv').config;
const bodyParser = require('body-parser');
var mysqlConf = require('mysql');

const port = process.env.PORT || 3030;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('../public'));
app.use('/public', express.static('../public'));

app.use(require('./routes.js'));
// app.use(require('./db.js'));

var mysqlConf = require('./sqlconfig.js').mysql_pool;

app.get('/test-page', (req, res) => {
	mysqlConf.getConnection((err, connection) => {
		if (err) throw new err();
		console.log(`connected as id ${connection.threadId}`);

		connection.query('SELECT * FROM camera_info', (err, rows) => {
			connection.release();

			if (!err) {
				res.send(rows);
			} else {
				console.log(err);
			}
		});
	});
});
var rows;

// function getRows(err,rows) {
// 	mysqlConf.getConnection((err, connection) => {
// 		if (err) throw new err();
// 		console.log(`connected as id ${connection.threadId}`);
// 		connection.query('SELECT * FROM camera_info WHERE product_code = ?', [req.params.product_code], (err, rows) => {
// 			connection.release();

// 			if (!err) {
// 				res.send(rows);
// 			} else {
// 				console.log(err);
// 			}
// 		});
// 	});
// };
var product_code;
var info;
var features;
var results;
app.get('/test-page/:product_code', (req, res) => {
	mysqlConf.getConnection((err, connection) => {
		if (err) throw new err();
		console.log(`connected as id ${connection.threadId}`);
		connection.query('SELECT * FROM camera_info WHERE product_code = ?', [req.params.product_code], (err, rows) => {
			connection.release();

			if (!err) {
				results = rows;
				Object.keys(results).forEach(function (key) {
					var result = results[key];
					product_code = result.product_code;
					info = result.info;
					features = result.features;
					console.log(product_code, info, features);
				});
				res.render('product-page', results);
			} else {
				console.log(err);
			}
		});
	});
});

var server = app.listen;

var server = app.listen(port, () => {
	var host = server.address().address;
	var port = server.address().port;
	console.log(`listening on port ${port}`);
});
