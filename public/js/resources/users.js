var app = app || angular.module('occu');

app.factory('Users', ['$resource', function($resource) {
return $resource('/user/:username', null,
    {
        'update': { method:'PUT' }
    });
}]);

app.factory('tokenStore', function($cookies) {
  var tokenHandler = {};
  var token = null;
  var object = null;

  tokenHandler.decode = function(t) {
    return JSON.parse(atob(t.split('.')[1]));
  }

  tokenHandler.set = function(n_token) {
    if (n_token != null) {
    try {
      object = tokenHandler.decode(n_token);
      token = n_token;
    } catch (e){
      return false;
    }          
    } else {
      token = null;
      object = null;
    }
    $cookies.put('token', token);
  };
  
  tokenHandler.set($cookies.get('token'));

  tokenHandler.get = function() {
    return token;
  };
  tokenHandler.isLogged = function(){
        return (token != null);
  };
  tokenHandler.getObj = function() {
    return object;
  };

  return tokenHandler;
});