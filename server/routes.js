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
	// camInfo is now the full list
	var fullListObj = {};
	fullListObj = {
		...camInfo,
		...camSpecs,
		...audioVideo,
		...automation,
		...elecPhys
	};
	var deadKeys;
	var allKeys;
	// fullListObj is now the 'wanted' object

	// create array of deadKeys to filter out
	deadKeys = Object.keys(fullListObj).filter(
		(k) =>
			fullListObj[k] === 'n/a' || fullListObj[k] === '*' || fullListObj[k] === ''
	);
	// create list of keys from every pair in the data

	allKeys = Object.keys(fullListObj);
	
	// filter out deadKeys from all allkeys
	let newKeys = [];

	newKeys = allKeys.reduce(function (prev, value) {
		var isDuplicate = false;
		for (var i = 0; i < deadKeys.length; i++) {
			if (value === deadKeys[i]) {
				isDuplicate = true;
				break;
			}
		}
		if (!isDuplicate) {
			prev.push(value);
		}
		return prev;
	}, []);

	// console.log(newKeys);
	// finally create new object, with pairs from list of filtered keys 

	var finalObj;
	function select(arr, obj) {
		let finalObj = {};
		for (let k in obj) if (arr.includes(k)) finalObj[k] = obj[k];
		return finalObj;
	}
	finalObj = select(newKeys, fullListObj);
	// send the finalObject to the view for rendering and processing
	// res.send(camInfo);
	res.render('product-page', {
		camInfo: finalObj
	});
});

module.exports = router;
