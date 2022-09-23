var mysql = require('mysql');
// const { Client } = require('pg');

// const client = new Client({
// 	user: 'wearenv',
// 	password: process.env.PG_PASS,
// 	port: 5432,
// 	database: paragon
// });

// var config;
// config = {
// 	mysql_pool: mysql.createPool({
// 		host: 'localhost',
// 		user: 'admin',
// 		password: 'drubbinggeldfrontally',
// 		database: 'paragon'
// 	})
// };

// THE FOLLOWING CONFIG WORKS FOR LOCAL TESTING. do NOT change.
var config;
config = {
	mysql_pool: mysql.createPool({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'paragon'
	})
};

// end working local config

// module.exports = client;
module.exports = config;
