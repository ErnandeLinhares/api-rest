'use strict';

module.exports =  { 
        
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [ /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "E-mail inválido."] 
};