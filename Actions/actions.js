'use strict';

const usuarioModel = require('../models/usuario');
const crypto       = require('crypto');

const callback = function (err, data, res) {
  if (err){ 
    console.log(err);
    return res.status(500).json({"messagem": err.message});
  }
  return res.json(data);
};

const Actions = {};
Actions.listar = (req, res) => {
  const query = {};
  usuarioModel.find(query, (err, data) => {
    callback(err, data, res);
  });
};
Actions.consultar = (req, res) => {
  const query = {id: req.params.id};
  usuarioModel.findOne(query, (err, data) => {
    callback(err, data, res);
  });
};
Actions.alterar = (req, res) => {
  const query = {id: req.params.id};
  const body = req.body;
  usuarioModel.update(query, body, (err, data) => {
    callback(err, data, res);
  });
};
Actions.remover = (req, res) => {
  const query = {id: req.params.id};
  usuarioModel.remove(query, (err, data) => {
    callback(err, data, res);
  });
};
Actions.cadastrar = (req, res) => {
  const body = req.body;  
  usuarioModel.create(body,(err, data) => {
    callback(err, data, res);
  });

};
Actions.sigin = (req, res) => {  
  const body    = req.body;
  const query   = {"email": body.email, "senha": crypto.createHash('md5').update(body.senha).digest("hex") };
  usuarioModel.findOne(query, (err, data) => {
    if (err) 
      return res.status(500).json({"messagem": err.message});
    else{
      if(data === null)
        return res.status(401).json({"messagem": "Usuário e/ou senha inválidos."});
      return res.json(data);
    }

  });
};

module.exports = Actions;