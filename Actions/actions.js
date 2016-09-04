'use strict';

const usuarioModel = require('../models/usuario');
const crypto       = require('crypto');

const callback = function (err, data, res) {
  if (err){ 
    console.log(err);
    return res.status(500).json({"mensagem": err.message});
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




Actions.consultarIdEToken = (req, res) =>{
  const token = (req.query && (req.query.Bearer || req.query.bearer) ) || (req.headers && (req.headers.Bearer || req.headers.bearer));
  const query = {"id": req.params.id, "token": token };
  usuarioModel.findOne(query, (err, data) => {
    // O token eh valido mas nao eh igual ao id passado no path
    if(data === null){
      return res.status(403).json({"mensagem": "Não autorizado"});  
    }else
      res.json(data);
  });
};

Actions.sigin = (req, res) => {  
  
    const email = req.body.email || '';
    const senha = req.body.senha || '';
    
    if (email === '' || senha === '') {
      
      return res.status(401).json({ msg: ["Usuário e/ou senha vazio."]});
      
    }else{

        const query   = {"email": email, "senha": crypto.createHash('md5').update(senha).digest("hex") };
        
        usuarioModel.findOne(query, (err, data) => {
          
          if (err) 
            return res.status(500).json({"mensagem": err.message});
          else{
            if(data === null)
              return res.status(401).json({"mensagem": "Usuário e/ou senha inválidos."});
            else{
              
              const token      = criarToken(data);
              const queryToken = {"id": data.id };
                
              // Atualizar token 
              usuarioModel.update(queryToken, { "token": token }, (err, resltUp) =>{
                  
                  if(err){
                    res.stats(500).json({"mensagem": "Erro inesperado."});
                  }else{
                    res.links({
                      next: '/api/usuario/'+data.id
                    });
                    res.set('Bearer', token);
                    return res.json(data);
                  }
              });

            }

          }

        });    
    }
};


module.exports = Actions;

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

function criarToken(user){

  const token = require('jwt-simple').encode({
    exp : addMinutes(new Date(), 30),
    userId: user.id, 
    user: user,
  }, require('../configs/secret')());

  return token;
}