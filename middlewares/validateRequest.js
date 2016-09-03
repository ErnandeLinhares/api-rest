'use strict';

const jwt  = require('jwt-simple');


module.exports = (req, res, next) => {

	console.log("Middleware print URL", req.url);
	next();
};