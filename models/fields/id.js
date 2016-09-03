'use strict';

const uuid = require('node-uuid');

module.exports = { type: String, default: () => uuid.v1() };