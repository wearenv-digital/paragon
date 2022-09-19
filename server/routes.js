var express = require('express');
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

// function removeEmpty(obj) {
// 	return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
// }

router.get('/product-page/:product_code', async function (req, res) {
	var camInfo = await getInfo(req);
	var camFeatures = await getFeatures(req);
	var camSpecs = await getCamSpecs(req);
	var audioVideo = await getAudioVideo(req);
	var automation = await getAutomation(req);
	var elecPhys = await getElecPhys(req);

	function removeProdCode(arr, obj) {
		arr = arr.filter((item) => !item.length < 1);
		arr = arr.slice(1, arr.length);
		return arr;
	}
	var infoArray = Object.values(camInfo);
	var featuresArray = Object.values(camFeatures);
	var specsArray = Object.values(camSpecs);
	var AVArray = Object.values(audioVideo);
	var autoArray = Object.values(automation);
	var elecPhysArray = Object.values(elecPhys);

	featuresArray = removeProdCode(featuresArray, camFeatures);
	specsArray = removeProdCode(specsArray, camSpecs);
	AVArray = removeProdCode(AVArray, audioVideo);
	autoArray = removeProdCode(autoArray, automation);
	elecPhysArray = removeProdCode(elecPhysArray, elecPhys);

	// The arrays now do not have product code

	// camFeatures.featuresList = featuresArray;
	// camSpecs.specsList = specsArray;
	// audioVideo.avList = AVArray;
	// automation.autoSpecsList = autoArray;
	// elecPhys.elecPhysList = elecPhysArray;

	// filter and mutate the array to omit any empties and the first element
	// featuresArray = featuresArray.filter((item) => !item.length < 1);
	// featuresArray = featuresArray.slice(1, featuresArray.length);
	// camInfo.featuresList = featuresArray;

	// camInfo is now the full list

	var deadKeys;
	var allKeys;

	// fullListObj is now the 'wanted' object

	// create array of deadKeys to filter out

	// turn the following into a reuasable function to perform on every object

	function filterDead(obj) {
		deadKeys = Object.keys(obj).filter(
			(k) => obj[k] === 'n/a' || obj[k] === '*' || obj[k] === ''
		);
		return deadKeys;
	}

	function filterGoodKeys(obj) {
		goodKeys = Object.keys(obj).filter(
			(k) => obj[k] !== 'n/a' || obj[k] !== '*' || obj[k] !== ''
		);
		return goodKeys;
	}
	// deadKeys = Object.keys(fullListObj).filter(
	// 	(k) =>
	// 		fullListObj[k] === 'n/a' || fullListObj[k] === '*' || fullListObj[k] === ''
	// );

	// create list of keys from every pair in the data

	function listAllKeys(obj) {
		allKeys = Object.keys(obj);
		return allKeys;
	}

	// function checkDupes(allkeys, deadKeys) {
	// 	let newKeys;
	// 	newKeys = allKeys.reduce(function (prev, value) {
	// 		var isDuplicate = false;
	// 		for (var i = 0; i < deadKeys.length; i++) {
	// 			if (value === deadKeys[i]) {
	// 				isDuplicate = true;
	// 				break;
	// 			}
	// 		}
	// 		if (!isDuplicate) {
	// 			prev.push(value);
	// 		}
	// 		return prev;
	// 	}, []);
	// }

	var deadInfoKeys;
	var deadSpecsKeys;
	var deadAVKeys;
	var deadAutomationKeys;
	var deadElecPhysKeys;

	deadInfoKeys = filterDead(camInfo);
	deadSpecsKeys = filterDead(camSpecs);
	deadAVKeys = filterDead(audioVideo);
	deadAutomationKeys = filterDead(automation);
	deadElecPhysKeys = filterDead(elecPhys);

	// console.log(deadAVKeys); //  works

	// console.log(deadAutomationKeys); // works

	// goodInfoKeys = checkDuplicates();

	var allInfoKeys;
	var allSpecsKeys;
	var allAVKeys;
	var allAutoKeys;
	var allElecPhysKeys;

	allInfoKeys = listAllKeys(camInfo);
	allSpecsKeys = listAllKeys(camSpecs);
	allAVKeys = listAllKeys(audioVideo);
	allAutoKeys = listAllKeys(automation);
	allElecPhysKeys = listAllKeys(elecPhys);
	// console.log('allInfoKeys= ' + allInfoKeys);
	// console.log('all elec keys = ' + allElecPhysKeys);

	var newInfoKeys = [];
	var newSpecsKeys = [];
	var newAVKeys = [];
	var newAutoKeys = [];
	var newElecPhysKeys = [];

	// The next function expressions return a list of goodkeys to create
	// the final objects from.

	newInfoKeys = allInfoKeys.reduce(function (prev, value) {
		var isDuplicate = false;
		for (var i = 0; i < deadInfoKeys.length; i++) {
			if (value === deadInfoKeys[i]) {
				isDuplicate = true;
				break;
			}
		}
		if (!isDuplicate) {
			prev.push(value);
		}
		return prev;
	}, []);

	newSpecsKeys = allSpecsKeys.reduce(function (prev, value) {
		var isDuplicate = false;
		for (var i = 0; i < deadSpecsKeys.length; i++) {
			if (value === deadSpecsKeys[i]) {
				isDuplicate = true;
				break;
			}
		}
		if (!isDuplicate) {
			prev.push(value);
		}
		return prev;
	}, []);

	newAVKeys = allAVKeys.reduce(function (prev, value) {
		var isDuplicate = false;
		for (var i = 0; i < deadAVKeys.length; i++) {
			if (value === deadAVKeys[i]) {
				isDuplicate = true;
				break;
			}
		}
		if (!isDuplicate) {
			prev.push(value);
		}
		return prev;
	}, []);

	newAutoKeys = allAutoKeys.reduce(function (prev, value) {
		var isDuplicate = false;
		for (var i = 0; i < deadAutomationKeys.length; i++) {
			if (value === deadAutomationKeys[i]) {
				isDuplicate = true;
				break;
			}
		}
		if (!isDuplicate) {
			prev.push(value);
		}
		return prev;
	}, []);

	newElecPhysKeys = allElecPhysKeys.reduce(function (prev, value) {
		var isDuplicate = false;
		for (var i = 0; i < deadElecPhysKeys.length; i++) {
			if (value === deadElecPhysKeys[i]) {
				isDuplicate = true;
				break;
			}
		}
		if (!isDuplicate) {
			prev.push(value);
		}
		return prev;
	}, []);

	TempNewInfoKeys = newInfoKeys.shift(0);
	TempNewSpecsKeys = newSpecsKeys.shift(0);
	TempNewAVKeys = newAVKeys.shift(0);
	TempNewAutoKeys = newAutoKeys.shift(0);
	TempNewElecPhysKeys = newElecPhysKeys.shift(0);

	// console.log(newElecPhysKeys);

	var finalObj;
	var finalInfo;
	var finalSpecs;
	var finalAV;
	var finalAutomation;
	var finalElecPhys;

	// create the final object from each category to send
	function select(arr, obj) {
		let finalObj = {};
		for (let k in obj) if (arr.includes(k)) finalObj[k] = obj[k];
		return finalObj;
	}
	finalInfo = select(newInfoKeys, camInfo);
	finalSpecs = select(newSpecsKeys, camSpecs);
	finalAV = select(newAVKeys, audioVideo);
	finalAutomation = select(newAutoKeys, automation);
	finalElecPhys = select(newElecPhysKeys, elecPhys);

	// specsArray = Object.values(finalSpecs);
	// specsArray = specsArray.filter((item) => !item.length < 1);
	// specsArray = specsArray.slice(1, specsArray.length);
	// finalSpecs.specsList = specsArray;

	// console.log(finalSpecs);
	var finalObj;
	finalObj = {
		...finalInfo,
		...finalSpecs,
		...finalAV,
		...finalAutomation,
		...finalElecPhys
	};
	finalObj.newSpecsKeys = newSpecsKeys;
	finalObj.newAVKeys = newAVKeys;
	finalObj.newAutoKeys = newAutoKeys;
	finalObj.newElecPhysKeys = newElecPhysKeys;

	finalObj.info = finalInfo;
	finalObj.featuresList = featuresArray;
	finalObj.specs = specsArray;
	finalObj.AV = AVArray;
	finalObj.automation = autoArray;
	finalObj.elecPhys = elecPhysArray;
	// res.send(finalObj.newElecPhysKeys);
	// res.send(newSpecsKeys);
	// console.log(deadSpecsKeys);
	// console.log();
	// console.log(specsArray);
	// console.log(finalObj.newElecPhysKeys);
	res.render('product-page', { camInfo: finalObj });
});

module.exports = router;
