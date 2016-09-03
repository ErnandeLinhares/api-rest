'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('node-uuid');

const _schema = {
    _id:          { type: String, default: uuid.v1 },
    nome:         { type: String, required: true },
    senha:        { type: String, required: true },
    token:        { type: String, required: true },
    ultimo_login: { type: Date, required: true, default: Date.now },
    email:        { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [ /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "E-mail inválido."] 
    },
    telefones: {
        type: [ {
            numero: {
                type: String,
                match: /^\d{8,9}$/,
                required: true
            },
            ddd: {
                type: String,
                match: /^\d{2}$/,
                required: true
            }
        } ],
        default: []
    },
    data_criacao:     { type: Date, default: Date.now  },
    data_atualizacao: { type: Date }
};

module.exports = mongoose.model('Usuario', new Schema(_schema) );