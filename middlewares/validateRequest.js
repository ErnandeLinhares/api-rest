'use strict';

const jwt      = require('jwt-simple');

module.exports = (req, res, next) => {

	const token = (req.query && (req.query.Bearer || req.query.bearer) ) || (req.headers && (req.headers.Bearer || req.headers.bearer));

	if(token){

		try{

			const decoded = jwt.decode(token, require('../configs/secret.js')());

			if (new Date(decoded.exp) <= new Date()) {
				return res.status(401).json({"mensagem": "Sessão inválida." });
			} else {
			
				next();
			}

		}catch(e){
			res.status(401).json({"mensagem": "Token inválido." });
		}

	}else{
		res.status(401).json({"mensagem": "Não autorizado"});
	} 

};