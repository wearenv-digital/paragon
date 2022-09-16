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
	var featuresArray = Object.values(camFeatures);
	featuresArray = featuresArray.filter((item) => !item.length < 1);
	camInfo.featuresList = featuresArray;
	// res.send(camInfo);
	res.render('test-view', {
		camInfo: camInfo
	});
});

module.exports = router;
