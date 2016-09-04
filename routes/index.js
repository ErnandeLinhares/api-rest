'use strict';

const router = require('./routerExpress');
const auth = require('./auth');
const Actions = require('../Actions/actions');

const Routes = [
	{
      	method: 'get',  path: '/', action: Actions.listar
    },
    {
      	method: 'get', path: '/:id', action: Actions.consultar
    },
    {
      	method: 'put', path: '/:id', action: Actions.alterar
    },
    {
      	method: 'delete', path: '/:id', action: Actions.remover
    },
    {
		method: 'post', path: '/', action: Actions.cadastrar
    },
    {
    	method: 'post', path: '/sigin', action: Actions.sigin
    }
];

Routes.forEach( (route, index) => {
    router[route.method](route.path, route.action);
});

module.exports = router;