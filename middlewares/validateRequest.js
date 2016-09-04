'use strict';

const jwt                   = require('jwt-simple');

module.exports = (req, res, next) => {

	const token = (req.query && req.query.Bearer) || (req.headers && req.headers.Bearer);
	
	if(token){

		try{

			const decoded = jwt.decode(token, require('../configs/secret.js')());

			if (decoded.exp <= Date.now()) {
				res.status(400).json({"mensagem": "Sessão inválida." });
				return;
			} else {
				
				console.log("token decoded", decoded);

				next();
			}

		}catch(e){
			res.status(500).json({"mensagem": "Ops, erro inesperado."});
		}

	}else{
		res.status(401).json({"mensagem": "Não autorizado"});
	} 

};