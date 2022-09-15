const express = require('express');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test-page/:product_code', (req, res) => {
	mysqlConf.getConnection((err, connection) => {
		if (err) throw new err();
		console.log(`connected as id ${connection.threadId}`);

		connection.query('SELECT * FROM camera_info WHERE product_code = ?', [req.params.product_code], (err, rows) => {
			connection.release();

			if (!err) {
				res.send(rows);
			} else {
				console.log(err);
			}
		});
	});
});
