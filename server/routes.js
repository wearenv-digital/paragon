var express = require('express');
const { appendFile } = require('fs');
var router = express.Router();
const path = require('path');
const { getInfo, getFeatures } = require('./db');
var mysqlConf = require('./sqlconfig.js').mysql_pool;

// middleware for router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});
// middleware

// routes

router.get('/', (req, res) => {
	res.sendFile(path.resolve('../public/index.html'));
});

router.get('/product-page-template-copy', (req, res) => {
	res.sendFile(path.resolve('../public/product-page-template-copy.html'));
});

router.get('/product-page/:product_code', async function (req, res) {
	var camInfo = await getInfo(req);
	var camFeatures = await getFeatures(req);
	res.render('test-view', { info: camInfo, features: camFeatures });
});

module.exports = router;
