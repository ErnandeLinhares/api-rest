'use strict';

module.exports = (req, res, next) => {

	// CORS headers
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Bearer');

    if (req.method == 'OPTIONS')
      res.status(200).end();
    else 
      next();
};