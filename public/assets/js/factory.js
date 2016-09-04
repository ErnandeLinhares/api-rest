app.factory('dataFactory', function($http) {
 
  return {
  	buscarUsuarioLogado: function(id,success, error){
        $http.get(BASE_API+"/usuarioEToken/"+id).success(success).error(error);
    }
  };

});