'use strict';

module.exports = {
	
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
    }
};