var mysql = require('mysql');
const { Client } = require('pg');

// const client = new Client({
// 	user: 'wearenv',
// 	password: process.env.PG_PASS,
// 	port: 5432,
// 	database: paragon
// });

var config;
config = {
	mysql_pool: mysql.createPool({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'paragon'
	})
};

pool.query();
// module.exports = client;
module.exports = config;
