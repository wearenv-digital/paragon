var express = require('express');
var router = express.Router();
const path = require('path');
const {
	getInfo,
	getFeatures,
	getCamSpecs,
	getAudioVideo,
	getAutomation,
	getElecPhys,
	getDesc
} = require('./db.js');

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

// main product-page route

router.get('/product-page/:product_code', async function (req, res) {
	var camInfo = {};
	var camFeatures = {};
	var camSpecs = {};
	var audioVideo = {};
	var automation = {};
	var elecPhys = {};
	var description = {};

	camInfo = await getInfo(req);
	camFeatures = await getFeatures(req);
	camSpecs = await getCamSpecs(req);
	audioVideo = await getAudioVideo(req);
	automation = await getAutomation(req);
	elecPhys = await getElecPhys(req);
	description = await getDesc(req);

	// res.send(camFeatures);
	// console.log(typeof camFeatures);

	// console.log(typeof camFeatures);
	// console.log(camFeatures);
	if (camFeatures !== null) {
		camFeatures = camFeatures;
	} else {
		console.log(typeof camFeatures);
		console.log('its null');
	}

	function removeProdCode(arr) {
		arr = arr.filter((item) => !item.length < 1);
		arr = arr.slice(1, arr.length);
		return arr;
	}

	var features = [];
	var specsArray = [];
	var AVArray = [];
	var autoArray = [];
	var elecPhysArray = [];

	features = Object.values(camFeatures);
	specsArray = Object.values(camSpecs);
	AVArray = Object.values(audioVideo);
	autoArray = Object.values(automation);
	elecPhysArray = Object.values(elecPhys);

	// console.log(features);
	// console.log(typeof features);

	features = removeProdCode(features);
	specsArray = removeProdCode(specsArray);
	AVArray = removeProdCode(AVArray);
	autoArray = removeProdCode(autoArray);
	elecPhysArray = removeProdCode(elecPhysArray);

	// res.send(features);
	// return
	// console.log(typeof features);
	// console.log(features);

	// The arrays now do not have product code

	// fullListObj is now the 'wanted' object

	// create array of deadKeys to filter out
	// create array of deadVals to filter out

	// turn the following into a reuasable function to perform on every object

	var deadKeys;
	var allKeys;

	function filterDead(obj) {
		deadKeys = Object.keys(obj).filter(
			(k) => obj[k] === 'n/a' || obj[k] === '*' || obj[k] === ''
		);
		return deadKeys;
	}

	function filterGoodVals(obj) {
		goodVals = Object.values(obj).filter(
			(k) => obj[k] !== 'n/a' || obj[k] !== '*' || obj[k] !== ''
		);
		return goodVals;
	}

	// create list of keys from every pair in the data
	// create a list of values from every pair in the data

	function listAllKeys(obj) {
		allKeys = Object.keys(obj);
		return allKeys;
	}

	function listAllVals(obj) {
		allVals = Object.values(obj);
		return allVals;
	}
	// var goodSpecsKeys = filterGoodKeys(camSpecs)

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

	// goodSpecsVals = filterGoodVals(camSpecs);

	// console.log(deadAVKeys); //  works

	// console.log(deadAutomationKeys); // works

	// goodInfoKeys = checkDuplicates();

	// var allInfoKeys;
	var allSpecsKeys;
	var allAVKeys;
	var allAutoKeys;
	var allElecPhysKeys;

	var allSpecsVals;
	var allAVVals;
	var allAutovals;
	var allElecPhysVals;

	allSpecsVals = listAllVals(camSpecs);
	allAVVals = listAllVals(audioVideo);
	allAutovals = listAllVals(audioVideo);
	allElecPhysVals = listAllVals(elecPhys);

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

	var newSpecsVals = [];
	var newAVVals = [];
	var newAutoVals = [];
	var newElecPhysVals = [];
	const deadVals = ['*', 'n/a', ''];

	// Get good specs values by comparing to deadVals
	newSpecsVals = specsArray.reduce(function (prev, value) {
		var isDuplicate = false;
		for (var i = 0; i < deadVals.length; i++) {
			if (value === deadVals[i]) {
				isDuplicate = true;
				break;
			}
		}
		if (!isDuplicate) {
			prev.push(value);
		}
		return prev;
	}, []);

	// get good AV Values by comparing to deadVal

	newAVVals = AVArray.reduce(function (prev, value) {
		var isDuplicate = false;
		for (var i = 0; i < deadVals.length; i++) {
			if (value === deadVals[i]) {
				isDuplicate = true;
				break;
			}
		}
		if (!isDuplicate) {
			prev.push(value);
		}
		return prev;
	}, []);

	// Get good automation values by cmparing to deadVals

	newAutoVals = autoArray.reduce(function (prev, value) {
		var isDuplicate = false;
		for (var i = 0; i < deadVals.length; i++) {
			if (value === deadVals[i]) {
				isDuplicate = true;
				break;
			}
		}
		if (!isDuplicate) {
			prev.push(value);
		}
		return prev;
	}, []);

	// Get good ElecPhys values by comparing to deadVals

	newElecPhysVals = elecPhysArray.reduce(function (prev, value) {
		var isDuplicate = false;
		for (var i = 0; i < deadVals.length; i++) {
			if (value === deadVals[i]) {
				isDuplicate = true;
				break;
			}
		}
		if (!isDuplicate) {
			prev.push(value);
		}
		return prev;
	}, []);

	tempNewInfoKeys = newInfoKeys.shift(0);
	tempNewSpecsKeys = newSpecsKeys.shift(0);
	tempNewAVKeys = newAVKeys.shift(0);
	tempNewAutoKeys = newAutoKeys.shift(0);
	tempNewElecPhysKeys = newElecPhysKeys.shift(0);

	// console.log(newElecPhysKeys);

	// create the final object from each category to send
	function select(arr, obj) {
		let finalObj = {};
		for (let k in obj) if (arr.includes(k)) finalObj[k] = obj[k];
		return finalObj;
	}
	// finalInfo = select(newInfoKeys, camInfo);

	// finalInfo = camInfo;
	// finalSpecs = select(newSpecsKeys, newSpecsVals);
	// finalAV = select(newAVKeys, newAVVals);
	// finalAutomation = select(newAutoKeys, newAutoVals);
	// finalElecPhys = select(newElecPhysKeys, newElecPhysVals);

	// var finalInfo = {};
	var finalSpecs = {};
	var finalAV = {};
	var finalAutomation = {};
	var finalElecPhys = {};

	newSpecsKeys.forEach((element, index) => {
		finalSpecs[element] = newSpecsVals[index];
	});

	newAVKeys.forEach((element, index) => {
		finalAV[element] = newAVVals[index];
	});

	newAutoKeys.forEach((element, index) => {
		finalAutomation[element] = newAutoVals[index];
	});

	newElecPhysKeys.forEach((element, index) => {
		finalElecPhys[element] = newElecPhysVals[index];
	});

	var finalObj = {};
	// finalObj.features = featuresArray;
	finalObj.info = camInfo;
	finalObj.specs = finalSpecs;
	finalObj.av = finalAV;
	finalObj.auto = finalAutomation;
	finalObj.elecPhys = finalElecPhys;

	// var checkContent = [];
	// checkContent = [finalAV, finalAutomation, finalElecPhys];

	// for (let i = 0; i < checkContent.length; i++) {
	// 	if (checkContent[i] == '') {
	// 		checkContent.splice([i], 1);
	// 	}
	// }

	// console.log(checkContent);
	var finalArr = [];
	// var finalArr = [checkContent];
	finalArr.push(features);
	finalArr.push(camInfo);
	finalArr.push(finalSpecs);
	finalArr.push(finalAV);
	finalArr.push(finalAutomation);
	finalArr.push(finalElecPhys);

	// console.log(finalSpecs);
	// res.render('product-page-copy', {
	// 	dataArr: finalArr,
	// 	dataObj: finalObj
	// 	// features: features
	// });

	description = Object.values(description);
	// console.log(typeof description);
	var data = {};
	data = {
		features: features,
		dataObj: finalObj,
		dataArr: finalArr,
		description: description
	};

	// res.send(data);
	// return;
	data.product_code = finalObj.info.product_code;

	// res.send(data);
	// return;
	// res.send( {
	res.render('product-page-copy', {
		description: description,
		data: data,
		specs: finalSpecs,
		av: finalAV,
		auto: finalAutomation,
		elecPhys: finalElecPhys
	});
});

// router.get('/product-page', (req, res) => {
// 	res.render('product-page-copy', {
// 		data: data,
// 		description: description,
// 		specs: finalSpecs,
// 		av: finalAV,
// 		auto: finalAutomation,
// 		elecPhys: finalElecPhys
// 	});
// });
// console.log(description);
//
//
//
//
//
//
//
//
//
//
//
// Full Object Test Route

// router.get('/test-object/:product_code', async function (req, res) {
// 	var camInfo = await getInfo(req);
// 	var camFeatures = await getFeatures(req);
// 	var camSpecs = await getCamSpecs(req);
// 	var audioVideo = await getAudioVideo(req);
// 	var automation = await getAutomation(req);
// 	var elecPhys = await getElecPhys(req);
// 	var description = await getDesc(req);
// 	// console.log(typeof camFeatures);
// 	// console.log(camFeatures);

// 	function removeProdCode(arr) {
// 		arr = arr.filter((item) => !item.length < 1);
// 		arr = arr.slice(1, arr.length);
// 		return arr;
// 	}
// 	var features = Object.values(camFeatures);
// 	var specsArray = Object.values(camSpecs);
// 	var AVArray = Object.values(audioVideo);
// 	var autoArray = Object.values(automation);
// 	var elecPhysArray = Object.values(elecPhys);
// 	// console.log(features);
// 	// console.log(typeof features);

// 	features = removeProdCode(features);
// 	specsArray = removeProdCode(specsArray);
// 	AVArray = removeProdCode(AVArray);
// 	autoArray = removeProdCode(autoArray);
// 	elecPhysArray = removeProdCode(elecPhysArray);

// 	// console.log(typeof features);
// 	// console.log(features);

// 	// The arrays now do not have product code

// 	// fullListObj is now the 'wanted' object

// 	// create array of deadKeys to filter out
// 	// create array of deadVals to filter out

// 	// turn the following into a reuasable function to perform on every object

// 	var deadKeys;
// 	var allKeys;

// 	function filterDead(obj) {
// 		deadKeys = Object.keys(obj).filter(
// 			(k) => obj[k] === 'n/a' || obj[k] === '*' || obj[k] === ''
// 		);
// 		return deadKeys;
// 	}

// 	function filterGoodVals(obj) {
// 		goodVals = Object.values(obj).filter(
// 			(k) => obj[k] !== 'n/a' || obj[k] !== '*' || obj[k] !== ''
// 		);
// 		return goodVals;
// 	}

// 	// create list of keys from every pair in the data
// 	// create a list of values from every pair in the data

// 	function listAllKeys(obj) {
// 		allKeys = Object.keys(obj);
// 		return allKeys;
// 	}

// 	function listAllVals(obj) {
// 		allVals = Object.values(obj);
// 		return allVals;
// 	}
// 	// var goodSpecsKeys = filterGoodKeys(camSpecs)

// 	var deadInfoKeys;
// 	var deadSpecsKeys;
// 	var deadAVKeys;
// 	var deadAutomationKeys;
// 	var deadElecPhysKeys;

// 	deadInfoKeys = filterDead(camInfo);
// 	deadSpecsKeys = filterDead(camSpecs);
// 	deadAVKeys = filterDead(audioVideo);
// 	deadAutomationKeys = filterDead(automation);
// 	deadElecPhysKeys = filterDead(elecPhys);

// 	// goodSpecsVals = filterGoodVals(camSpecs);

// 	// console.log(deadAVKeys); //  works

// 	// console.log(deadAutomationKeys); // works

// 	// goodInfoKeys = checkDuplicates();

// 	// var allInfoKeys;
// 	var allSpecsKeys;
// 	var allAVKeys;
// 	var allAutoKeys;
// 	var allElecPhysKeys;

// 	var allSpecsVals;
// 	var allAVVals;
// 	var allAutovals;
// 	var allElecPhysVals;

// 	allSpecsVals = listAllVals(camSpecs);
// 	allAVVals = listAllVals(audioVideo);
// 	allAutovals = listAllVals(audioVideo);
// 	allElecPhysVals = listAllVals(elecPhys);

// 	allInfoKeys = listAllKeys(camInfo);
// 	allSpecsKeys = listAllKeys(camSpecs);
// 	allAVKeys = listAllKeys(audioVideo);
// 	allAutoKeys = listAllKeys(automation);
// 	allElecPhysKeys = listAllKeys(elecPhys);
// 	// console.log('allInfoKeys= ' + allInfoKeys);
// 	// console.log('all elec keys = ' + allElecPhysKeys);

// 	var newInfoKeys = [];
// 	var newSpecsKeys = [];
// 	var newAVKeys = [];
// 	var newAutoKeys = [];
// 	var newElecPhysKeys = [];

// 	// The next function expressions return a list of goodkeys to create
// 	// the final objects from.

// 	newInfoKeys = allInfoKeys.reduce(function (prev, value) {
// 		var isDuplicate = false;
// 		for (var i = 0; i < deadInfoKeys.length; i++) {
// 			if (value === deadInfoKeys[i]) {
// 				isDuplicate = true;
// 				break;
// 			}
// 		}
// 		if (!isDuplicate) {
// 			prev.push(value);
// 		}
// 		return prev;
// 	}, []);

// 	newSpecsKeys = allSpecsKeys.reduce(function (prev, value) {
// 		var isDuplicate = false;
// 		for (var i = 0; i < deadSpecsKeys.length; i++) {
// 			if (value === deadSpecsKeys[i]) {
// 				isDuplicate = true;
// 				break;
// 			}
// 		}
// 		if (!isDuplicate) {
// 			prev.push(value);
// 		}
// 		return prev;
// 	}, []);

// 	newAVKeys = allAVKeys.reduce(function (prev, value) {
// 		var isDuplicate = false;
// 		for (var i = 0; i < deadAVKeys.length; i++) {
// 			if (value === deadAVKeys[i]) {
// 				isDuplicate = true;
// 				break;
// 			}
// 		}
// 		if (!isDuplicate) {
// 			prev.push(value);
// 		}
// 		return prev;
// 	}, []);

// 	newAutoKeys = allAutoKeys.reduce(function (prev, value) {
// 		var isDuplicate = false;
// 		for (var i = 0; i < deadAutomationKeys.length; i++) {
// 			if (value === deadAutomationKeys[i]) {
// 				isDuplicate = true;
// 				break;
// 			}
// 		}
// 		if (!isDuplicate) {
// 			prev.push(value);
// 		}
// 		return prev;
// 	}, []);

// 	newElecPhysKeys = allElecPhysKeys.reduce(function (prev, value) {
// 		var isDuplicate = false;
// 		for (var i = 0; i < deadElecPhysKeys.length; i++) {
// 			if (value === deadElecPhysKeys[i]) {
// 				isDuplicate = true;
// 				break;
// 			}
// 		}
// 		if (!isDuplicate) {
// 			prev.push(value);
// 		}
// 		return prev;
// 	}, []);

// 	var newSpecsVals = [];
// 	var newAVVals = [];
// 	var newAutoVals = [];
// 	var newElecPhysVals = [];
// 	const deadVals = ['*', 'n/a', ''];

// 	// Get good specs values by comparing to deadVals
// 	newSpecsVals = specsArray.reduce(function (prev, value) {
// 		var isDuplicate = false;
// 		for (var i = 0; i < deadVals.length; i++) {
// 			if (value === deadVals[i]) {
// 				isDuplicate = true;
// 				break;
// 			}
// 		}
// 		if (!isDuplicate) {
// 			prev.push(value);
// 		}
// 		return prev;
// 	}, []);

// 	// get good AV Values by comparing to deadVal

// 	newAVVals = AVArray.reduce(function (prev, value) {
// 		var isDuplicate = false;
// 		for (var i = 0; i < deadVals.length; i++) {
// 			if (value === deadVals[i]) {
// 				isDuplicate = true;
// 				break;
// 			}
// 		}
// 		if (!isDuplicate) {
// 			prev.push(value);
// 		}
// 		return prev;
// 	}, []);

// 	// Get good automation values by cmparing to deadVals

// 	newAutoVals = autoArray.reduce(function (prev, value) {
// 		var isDuplicate = false;
// 		for (var i = 0; i < deadVals.length; i++) {
// 			if (value === deadVals[i]) {
// 				isDuplicate = true;
// 				break;
// 			}
// 		}
// 		if (!isDuplicate) {
// 			prev.push(value);
// 		}
// 		return prev;
// 	}, []);

// 	// Get good ElecPhys values by comparing to deadVals

// 	newElecPhysVals = elecPhysArray.reduce(function (prev, value) {
// 		var isDuplicate = false;
// 		for (var i = 0; i < deadVals.length; i++) {
// 			if (value === deadVals[i]) {
// 				isDuplicate = true;
// 				break;
// 			}
// 		}
// 		if (!isDuplicate) {
// 			prev.push(value);
// 		}
// 		return prev;
// 	}, []);

// 	tempNewInfoKeys = newInfoKeys.shift(0);
// 	tempNewSpecsKeys = newSpecsKeys.shift(0);
// 	tempNewAVKeys = newAVKeys.shift(0);
// 	tempNewAutoKeys = newAutoKeys.shift(0);
// 	tempNewElecPhysKeys = newElecPhysKeys.shift(0);

// 	// console.log(newElecPhysKeys);

// 	// create the final object from each category to send
// 	function select(arr, obj) {
// 		let finalObj = {};
// 		for (let k in obj) if (arr.includes(k)) finalObj[k] = obj[k];
// 		return finalObj;
// 	}
// 	// finalInfo = select(newInfoKeys, camInfo);

// 	// finalInfo = camInfo;
// 	// finalSpecs = select(newSpecsKeys, newSpecsVals);
// 	// finalAV = select(newAVKeys, newAVVals);
// 	// finalAutomation = select(newAutoKeys, newAutoVals);
// 	// finalElecPhys = select(newElecPhysKeys, newElecPhysVals);

// 	// var finalInfo = {};

// 	var finalSpecs = {};
// 	var finalAV = {};
// 	var finalAutomation = {};
// 	var finalElecPhys = {};

// 	newSpecsKeys.forEach((element, index) => {
// 		finalSpecs[element] = newSpecsVals[index];
// 	});

// 	newAVKeys.forEach((element, index) => {
// 		finalAV[element] = newAVVals[index];
// 	});

// 	newAutoKeys.forEach((element, index) => {
// 		finalAutomation[element] = newAutoVals[index];
// 	});

// 	newElecPhysKeys.forEach((element, index) => {
// 		finalElecPhys[element] = newElecPhysVals[index];
// 	});

// 	var finalObj = {};
// 	// finalObj.features = featuresArray;
// 	finalObj.info = camInfo;
// 	finalObj.specs = finalSpecs;
// 	finalObj.av = finalAV;
// 	finalObj.auto = finalAutomation;
// 	finalObj.elecPhys = finalElecPhys;

// 	var finalArr = [];
// 	// finalArr.push(features);
// 	finalArr.push(camInfo);
// 	finalArr.push(finalSpecs);
// 	finalArr.push(finalAV);
// 	finalArr.push(finalAutomation);
// 	finalArr.push(finalElecPhys);
// 	// console.log(finalSpecs);
// 	// res.render('product-page-copy', {
// 	// 	dataArr: finalArr,
// 	// 	dataObj: finalObj
// 	// 	// features: features
// 	// });
// 	// var checkContent = [];
// 	// checkContent = [finalAV, finalAutomation, finalElecPhys];

// 	// checkContent.forEach((element) => {
// 	// 	if (element === '') {
// 	// 		element = element;
// 	// 	} else {
// 	// 		checkContent.(element);
// 	// 	}
// 	// });

// 	// console.log(checkContent);

// 	description = Object.values(description);
// 	// console.log(typeof description);
// 	var data = {};
// 	data = {
// 		features: features,
// 		dataObj: finalObj,
// 		dataArr: finalArr,
// 		description: description
// 	};
// 	data.product_code = finalObj.info.product_code;
// 	// data.image_link =
// 	res.send({
// 		description: description,
// 		data: data,
// 		specs: finalSpecs,
// 		av: finalAV,
// 		auto: finalAutomation,
// 		elecPhys: finalElecPhys
// 	});
// 	// console.log(finalSpecs);
// 	// console.log(description);
// 	// res.send({ data: data });
// 	// res.send({ features: features, dataObj: finalObj, dataArr: finalArr });
// 	// res.send(finalArr);
// 	// console.log(finalInfo);
// });

module.exports = router;
