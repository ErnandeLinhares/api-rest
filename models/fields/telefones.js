'use strict';

module.exports = {
    type: [{
        ddd    : { type: String, match: /[0-9]{2}/,   required: true },
        numero : { type: String, match: /[0-9]{8,9}/, required: true }
    }], 
    default : [],
    set     : (v) => {

           if(typeof v === "string"){
                
                const JSONize = (str) => {
                    return str.replace(/([\$\w]+)\s*:/g, function(_, $1){return '"'+$1+'":';}).replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"';}); 
                };

                v = JSON.parse(JSONize(v));
            }  

            return v;
    }
};