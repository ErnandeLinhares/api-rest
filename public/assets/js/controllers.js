
app.controller("HomeCtrl", ['$scope', 'UserAuthFactory', 'dataFactory',
  function($scope, UserAuthFactory, dataFactory) {


    $scope.logout = function () {
    
        UserAuthFactory.logout();
        
    };

    $scope.buscarUsuario = function(){
    	
    	var printResult = function(data){
    		$("#infoUser").hide().slideDown('fast').html("<pre>"+JSON.stringify(data, null, 2)+"</pre>");
    	};

    	dataFactory.buscarUsuarioLogado($scope.user.id, function(data){
    		
    		printResult(data);

    	}, function(e){

    		printResult(e);
    	});

    };

    $scope.user = JSON.parse(sessionStorage.getItem("user"));

  }

]);