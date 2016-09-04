var app = angular.module('app', ['ngRoute', 'angular-loading-bar']);


var BASE_URL = window.location.protocol+ "//" + window.location.hostname;
var BASE_API =    BASE_URL+"/api";
URL_SIGIN = BASE_URL+"/sigin";

app.config(function($routeProvider, $httpProvider) {

  $httpProvider.interceptors.push('TokenInterceptor');

  $routeProvider
    .when('/login', { templateUrl: 'partials/login.html', controller: 'LoginCtrl', access: { requiredLogin: false} })
    .when('/', { templateUrl: 'partials/home.html', controller: 'HomeCtrl', access: { requiredLogin: true}})
    .otherwise({redirectTo: '/login'});

});

app.run(function($rootScope, $window, $location, AuthenticationFactory) {
  // Quando a pagina e atualizada, verifique se o usuario ja estiver logado
  AuthenticationFactory.check();

  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
      $location.path("/login");
    } else {
      // check se existe usuario senao busca-lo.
      if (!AuthenticationFactory.user) AuthenticationFactory.user =  sessionStorage.getItem("token2");//$window.sessionStorage.user;
      //if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.isLogged = AuthenticationFactory.isLogged;
    //$rootScope.role = AuthenticationFactory.userRole;
    // se o usuario ja esta conectado, leva-lo para a pagina inicial
    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/');
    }
  });
});


var sys = {

  logout: function(){
    sessionStorage.clear();
    location.reload();
  }

};