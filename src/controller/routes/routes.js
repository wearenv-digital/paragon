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
} = require('../../config/db');

// middleware for router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

// anything helpful we need for operation

// routes

// docker testing
// router.get('/', (req, res) => {
// 	res.sendFile(path.resolve('./src/public/index.html'));
// });

router.get('/layout', (req, res) => {
	res.render('layout');
});

router.get('/docker-test', (req, res) => {
	res.send('<h1>WORKING  </h1>');
});

router.get('/product-page-template-copy', (req, res) => {
	res.sendFile(path.resolve('../../public/product-page-template-copy.html'));
});

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/about', (req, res) => {
	res.render('about');
});

router.get('/marine', (req, res) => {
	res.render('marine');
});

router.get('/law-enforcement', (req, res) => {
	res.render('law');
});

router.get('/parking', (req, res) => {
	res.render('parking');
});

router.get('/security', (req, res) => {
	res.render('security');
});

router.get('/product-category', (req, res) => {
	res.render('product-category');
});

// CCTV categories
//
//
//

router.get('/products/cctv', (req, res) => {
	res.render('cctv');
});

router.get('/products/cctv/cameras', (req, res) => {
	res.render('cameras');
});

router.get('/products/cctv/camera-housings', (req, res) => {
	res.render('camera-housings');
});

router.get('/products/cctv/cctv-transmission', (req, res) => {
	res.render('cctv-transmission');
});

router.get('/products/cctv/cctv-recording', (req, res) => {
	res.render('cctv-recording');
});

router.get('/products/cctv/cctv-analytics', (req, res) => {
	res.render('cctv-analytics');
});

router.get('/products/cctv/cctv-ancillaries', (req, res) => {
	res.render('cctv-ancillaries');
});

router.get('/products/cctv/security-management-software', (req, res) => {
	res.render('management-software');
});

//
//
//
//
// camera categories routes
//
//
//
//
//

router.get('/products/cctv/cameras/', (req, res) => {
	res.render('cameras');
});

router.get('/products/cctv/cameras/prison-cell', (req, res) => {
	res.render('prison-cell');
});

router.get('/products/cctv/cameras/marine-cameras', (req, res) => {
	res.render('marine-cameras');
});

router.get('/products/cctv/cameras/hazardous-enviornment', (req, res) => {
	res.render('hazardous-environment');
});

router.get('/products/cctv/cameras/thermal-cameras', (req, res) => {
	res.render('thermal-cameras');
});

router.get('/products/cctv/cameras/commercial', (req, res) => {
	res.render('commercial-cameras');
});

//
//
//
//

router.get('/products/camera-collection', (req, res) => {
	res.render('cameras-collection');
});

router.get('/products/access-control', (req, res) => {
	res.render('access');
});

// READERS COLLECTION
router.get('/products/access-control/readers', (req, res) => {
	res.render('readers-collection');
});

// READERS CATERGORY PAGES
router.get('/products/access-control/readers/proximity-readers', (req, res) => {
	res.render('proximity-readers');
});

router.get('/products/access-control/readers/qr', (req, res) => {
	res.render('qr-readers');
});

router.get('/products/access-control/readers/bluetooth-readers', (req, res) => {
	res.render('bluetooth-readers');
});

router.get('/products/access-control/readers/poe-readers', (req, res) => {
	res.render('poe-readers');
});

router.get('/products/access-control/readers/fingerprint-readers', (req, res) => {
	res.render('fingerprint-readers');
});

router.get('/products/access-control/readers/pin-keypad-readers', (req, res) => {
	res.render('pin-keypad-readers');
});

router.get(
	'/products/access-control/readers/universal-proximity-readers',
	(req, res) => {
		res.render('universal-proximity');
	}
);

router.get(
	'/products/access-control/readers/facial-recognition-readers',
	(req, res) => {
		res.render('facial-recognition-readers');
	}
);

router.get('/products/access-control/door-controllers', (req, res) => {
	res.render('door-controllers-collection');
});

router.get('/products/access-control/access-control-software', (req, res) => {
	res.render('access-control-software-collection');
});

router.get('/products/access-control/anpr', (req, res) => {
	res.render('anpr');
});

router.get('/products/access-control/anpr/anpr-cameras', (req, res) => {
	res.render('anpr-cameras');
});

router.get('/products/access-control/anpr/anpr-software', (req, res) => {
	res.render('anpr-software');
});

router.get('/products/access-control/anpr/anpr-signage', (req, res) => {
	res.render('anpr-signage');
});

router.get('/products/access-control/anpr/vehicle-counting', (req, res) => {
	res.render('vehicle-counting');
});

router.get('/products/interview-recorders', (req, res) => {
	res.render('interview-recorders');
});

router.get('/products/visitor-management', (req, res) => {
	res.render('visitor-management');
});

router.get('/products/panic-alarms', (req, res) => {
	res.render('panic-alarms');
});

router.get('/contact', (req, res) => {
	res.render('contact');
});

router.get('/frequently-asked', (req, res) => {
	res.render('faq');
});

router.get('/sell', (req, res) => {
	res.render('sell');
});

router.get('/terms-conditions', (req, res) => {
	res.render('terms');
});

router.get('/services', (req, res) => {
	res.render('services-collection');
});

router.get('/services/system-design', (req, res) => {
	res.render('system-design-build');
});

router.get('/services/service-support', (req, res) => {
	res.render('service-support');
});

router.get('/services/installations', (req, res) => {
	res.render('installations');
});

router.get('/services/cctv-alarm-monitoring', (req, res) => {
	res.render('cctv-alarm-monitoring');
});

router.get('/services/training', (req, res) => {
	res.render('training');
});

router.get('/services/consultancy', (req, res) => {
	res.render('consultancy');
});

router.get('/services/risk', (req, res) => {
	res.render('risk-assessment');
});

router.get('/services/risk/security-risk', (req, res) => {
	res.render('security-risk');
});

router.get('/services/risk/fire-risk', (req, res) => {
	res.render('fire-risk');
});

router.get('/services/site-maintenance', (req, res) => {
	res.render('site-maintenance');
});

// resources routes

router.get('/resources', (req, res) => {
	res.render('resources');
});

router.get('/resources/datasheets', (req, res) => {
	res.render('datasheets');
});

router.get('/resources/gallery', (req, res) => {
	res.render('gallery');
});

router.get('/resources/knowledge', (req, res) => {
	res.render('knowledge-centre');
});

router.get('/resources/tools', (req, res) => {
	res.render('tools');
});

router.get('/resources/press', (req, res) => {
	res.render('press');
});


// router.get('/product-page', (req, res) => {
// 	res.render('new');
// });

// main product-page route
// we might need to change this slug at some point

router.get('/product-page/:product_code', async function (req, res) {
	if (!req.params || req.params == undefined) {
		res.render('new');
	} else {
		var camInfo = await getInfo(req);
		var camFeatures = await getFeatures(req);
		var camSpecs = await getCamSpecs(req);
		var audioVideo = await getAudioVideo(req);
		var automation = await getAutomation(req);
		var elecPhys = await getElecPhys(req);
		var description = await getDesc(req);
		// console.log(typeof camFeatures);
		// console.log(camFeatures);
		function removeProdCode(arr) {
			arr = arr.filter((item) => !item.length < 1);
			arr = arr.slice(1, arr.length);
			return arr;
		}
		var features = Object.values(camFeatures);
		var specsArray = Object.values(camSpecs);
		var AVArray = Object.values(audioVideo);
		var autoArray = Object.values(automation);
		var elecPhysArray = Object.values(elecPhys);

		features = removeProdCode(features);
		specsArray = removeProdCode(specsArray);
		AVArray = removeProdCode(AVArray);
		autoArray = removeProdCode(autoArray);
		elecPhysArray = removeProdCode(elecPhysArray);

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

		// var allInfoKeys;
		var allSpecsKeys;
		var allAVKeys;
		var allAutoKeys;
		var allElecPhysKeys;

		allSpecsVals = listAllVals(camSpecs);
		allAVVals = listAllVals(audioVideo);
		allAutovals = listAllVals(audioVideo);
		allElecPhysVals = listAllVals(elecPhys);

		allInfoKeys = listAllKeys(camInfo);
		allSpecsKeys = listAllKeys(camSpecs);
		allAVKeys = listAllKeys(audioVideo);
		allAutoKeys = listAllKeys(automation);
		allElecPhysKeys = listAllKeys(elecPhys);

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

		const deadVals = ['*', 'n/a', ''];
		var newSpecsVals = [];
		var newAVVals = [];
		var newAutoVals = [];
		var newElecPhysVals = [];

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

		// create the final object from each category to send
		function select(arr, obj) {
			let finalObj = {};
			for (let k in obj) if (arr.includes(k)) finalObj[k] = obj[k];
			return finalObj;
		}

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

		description = Object.values(description);

		var finalObj = {};
		// finalObj.features = featuresArray;
		finalObj.info = camInfo;
		finalObj.specs = finalSpecs;
		finalObj.av = finalAV;
		finalObj.auto = finalAutomation;
		finalObj.elecPhys = finalElecPhys;

		var finalArr = [];
		// finalArr.push(features);
		finalArr.push(camInfo);
		finalArr.push(finalSpecs);
		finalArr.push(finalAV);
		finalArr.push(finalAutomation);
		finalArr.push(finalElecPhys);

		var data = {};
		data = {
			features: features,
			dataObj: finalObj,
			dataArr: finalArr,
			description: description
		};
		data.product_code = finalObj.info.product_code;
		// data.image_link =

		res.render('product-page-with-partials', {
			description: description,
			data: data,
			specs: finalSpecs,
			av: finalAV,
			auto: finalAutomation,
			elecPhys: finalElecPhys
		});
		console.log(finalSpecs);
	}
});

module.exports = router;
