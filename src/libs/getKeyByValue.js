const express = require('express');
const app = express();
// Gets an objects key by value (paramter)
const getKeyByValue = (obj, value) => {
	Object.keys(obj).find((key) => obj[key] === value);
};

exports.getKeyByValue = getKeyByValue;
