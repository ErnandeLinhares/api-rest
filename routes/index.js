'use strict';

const router = require('./routerExpress');
const Actions = require('../Actions/actions');

// ROTAS INICIADAS COM /API NECESSITAM DO HEADER => Bearer  
const Routes = [
	  {	method: 'get',  path: '/api/usuario/listar', action: Actions.listar },
    {	method: 'get', path: '/api/usuario/:id', action: Actions.consultar  },
    { method: 'put', path: '/api/usuario/:id', action: Actions.alterar    },
    { method: 'delete', path: '/api/usuario/:id', action: Actions.remover },
    { method: 'post', path: '/api/usuario', action: Actions.cadastrar     },
    
    { method: 'post', path: '/sigin', action: Actions.sigin       },
    { method: 'post', path: '/usuario', action: Actions.cadastrar },
    { method: 'get', path: '/api/usuarioEToken/:id', action: Actions.consultarIdEToken }
];

const RoutesExpress = require('./routesExpress.js')(Routes, router);

module.exports = RoutesExpress;