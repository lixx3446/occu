'use strict';

var app = angular.module('occu', ['xeditable', 'ui.router', 'ngResource', 'ngCookies', 'ngSanitize']);

app.run(function($rootScope, $urlRouter, tokenStore, $state) {
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options) {
      if (tokenStore.isLogged() && toState.name == "login" &&
        fromState.name != "")
        return event.preventDefault();
      if (toState.name == "login" && fromState != null){
        toParams.state = fromState;
        toParams.params = fromParams;
        return;
      }

      // handle if not logged secure routes
      if (tokenStore.isLogged()) return;
      if (toState && toState.data && toState.data.secure) {
        $state.transitionTo("login", {state: toState, params: toParams});  
        event.preventDefault();
      }
  });
});
// for angular-xeditable
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      input.push(i);
    }

    return input;
  };
});

app.config(function ($urlRouterProvider, $locationProvider) {
      $urlRouterProvider
          .otherwise('/home');

      $locationProvider.html5Mode({
        enabled: false, //enable would cause some confusing behavior
        requireBase: false
      });
    });




var homeController = function($scope, $timeout){
    $(document).ready(function(){
        $('.carousel').carousel({
            interval: 3000
        })
    });

}



app.config(function($stateProvider){
	$stateProvider
          .state('home', {
            url: '/home',
            // secure to add login redirection
            // data: {secure:true},
            templateUrl: 'templates/home.html',
              controller: homeController
          });
});