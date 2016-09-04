'use strict';

const crypto       = require('crypto');
const jwt          = require('jwt-simple');
const usuarioModel = require('../models/usuario');


const auth = {

	validarUsuario: (user) => {

		return true;

	},
	sigin: (req, res) => {

	}
};

module.exports = auth;