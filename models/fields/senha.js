'use strict';

const crypto   = require('crypto');

module.exports = { type: String, required: true, set: (senha) => { return crypto.createHash('md5').update(senha).digest("hex") } };