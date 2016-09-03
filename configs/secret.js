'use strict';

module.exports = function() {
  return process.env.SECRET || 'secret123987';
};