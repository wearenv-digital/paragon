var express = require('express');
const { appendFile } = require('fs');
var router = express.Router();
const path = require('path');
const {
	getInfo,
	getFeatures,
	getCamSpecs,
	getAudioVideo,
	getAutomation,
	getElecPhys
} = require('./db');

// middleware for router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

// anything helpful we need for operation

// routes

router.get('/', (req, res) => {
	res.sendFile(path.resolve('../public/index.html'));
});

router.get('/product-page-template-copy', (req, res) => {
	res.sendFile(path.resolve('../public/product-page-template-copy.html'));
});

// main product-page route

function removeEmpty(obj) {
	return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

router.get('/product-page/:product_code', async function (req, res) {
	var camInfo = await getInfo(req);
	var camFeatures = await getFeatures(req);
	var camSpecs = await getCamSpecs(req);
	var audioVideo = await getAudioVideo(req);
	var automation = await getAutomation(req);
	var elecPhys = await getElecPhys(req);

	var featuresArray = Object.values(camFeatures);

	// filter and mutate the array to omit any empties and the first element
	featuresArray = featuresArray.filter((item) => !item.length < 1);
	featuresArray = featuresArray.slice(1, featuresArray.length);
	camInfo.featuresList = featuresArray;
	var fullListObj = {};
	fullListObj = {
		...camInfo,
		...camSpecs,
		...audioVideo,
		...automation,
		...elecPhys
	};
	var keys;
	keys = Object.keys(fullListObj).filter(
		(k) =>
			fullListObj[k] === 'n/a' || fullListObj[k] === '*' || fullListObj[k] === ''
	);

	console.log(keys);

	// console.log(typeof keys);

	// delete fullListObj
	// res.send(camInfo);
	res.render('product-page', {
		camInfo: fullListObj
	});
});

module.exports = router;
