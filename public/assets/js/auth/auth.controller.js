app.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory','$routeParams', 'dataFactory',
  function($scope, $window, $location, UserAuthFactory, AuthenticationFactory, $routeParams, dataFactory) {
    $scope.user = {
      username: undefined,
      password: "",
      register: undefined
    };

    loginInit($scope);

    $scope.login = function() {

        if($scope.submit !== true){

            var username = $scope.user.username,
                password = $scope.user.password;
         
            if (username !== undefined && password !== undefined) {

                $scope.submit = true;

                UserAuthFactory.login(username, password).success(function(data) {

                    if(!data.status && data.status != 401){
                        AuthenticationFactory.isLogged = true;

                        $scope.user = data;

                        $location.path("/#/login");

                        sessionStorage.setItem('user', JSON.stringify(data));

                    }else
                        $(".msg-Error").hide().slideDown().html(data.mensagem);


                }).error(function(data) {
                    console.log(data);
                      $(".msg-Error").hide().slideDown().html(data.mensagem);
                      
                      $scope.submit = false;
                });

            }else{
                $(".msg-Error").hide().slideDown().html('Usuário ou senha inválida.');
                $scope.submit = false;
            }
            
        }
    };

  }

]);

function loginInit($scope){


    $(".register").click(function() {

        return false;

    });

}