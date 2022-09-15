var express = require('express');
var router = express.Router();
const path = require('path');

// middleware for router

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

// routes

router.get('/', (req, res) => {
	res.sendFile('');
});

router.get('/product-page-template', (req, res) => {
	res.sendFile(path);
});



module.exports = router;
