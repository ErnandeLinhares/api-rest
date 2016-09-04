app.factory('AuthenticationFactory', function() {
  var auth = {
    isLogged: false,
    check: function() {
      if (sessionStorage.getItem("token")) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        delete this.user;
      }
    }
  };
  return auth;
});

app.factory('UserAuthFactory', function($window, $location, $http, AuthenticationFactory) {
  return {
    login: function(username, password) {
      return $http.post(URL_SIGIN, {
        email: username,
        senha: password
      });

    },
    logout: function() {

      if (AuthenticationFactory.isLogged) {

        AuthenticationFactory.isLogged = false;
        delete AuthenticationFactory.user;
        
        sys.logout();

      }
    }
  };
});

app.factory('TokenInterceptor', function($q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};      

      if(sessionStorage.getItem("token")){
        config.headers['Bearer'] = sessionStorage.getItem("token");
        config.headers['Content-Type'] = "application/json";
        //config.headers['X-Lang'] = "pt-br";        
      }
      
      return config || $q.when(config);
    },

    response: function(response) {
      
      var bearer = response.headers().bearer || '';
      
      if(bearer !== '')
        sessionStorage.setItem('token', bearer);
      
      return response || $q.when(response);
    }
  };
});