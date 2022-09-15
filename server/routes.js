var express = require('express');
var router = express.Router();
const path = require('path');

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

// router.get('/product-page', (req, res) => {
// 	res.sendFile(path.resolve('../public/product-page.html'));
// });

router.get('/product-page/:product_name', (req, res) => {
	res.render('product-page');
});

module.exports = router;
