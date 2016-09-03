'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const id               = require('./fields/id');
const data_criacao     = require('./fields/data_criacao');
const data_atualizacao = require('./fields/data_atualizacao');
const email            = require('./fields/email');
const telefones        = require('./fields/telefones');
const senha            = require('./fields/senha');


const _schema = {
    id,
    nome:         { type: String, required: true },
    ultimo_login: { type: Date, required: true, default: Date.now },
    token:        { type: String },
    senha,
    email,
    telefones,
    data_criacao,
    data_atualizacao
};

module.exports = mongoose.model('Usuario', new Schema(_schema) );