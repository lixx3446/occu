'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.view4',
  'myApp.version',
  'myApp.applyForMentor',
  'myApp.browseMentor',
  'myApp.dashboard',
  'myApp.mentorDetail',
  'ui.router',
  'stormpath',
  'stormpath.templates'
])
/*
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
*/

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider
          .otherwise('/');

      $locationProvider.html5Mode({
        enabled: false, //enable would cause some confusing behavior
        requireBase: false
      });
    })
    .run(function($stormpath,$rootScope,$state){

      /*
       In this example we use UI router, and this
       is how we tell the Stormpath module which
       states we would like to use to use for login
       and post-login
       */

      $stormpath.uiRouter({
        loginState: 'login',
        defaultPostLoginState: 'home'
      });

      /*
       We want to redirect users back to the login
       state after they logout, so we watch for the
       logout event and then transition them to the
       login state
       */
      $rootScope.$on('$sessionEnd',function () {
        $state.transitionTo('login');
      });
    });



angular.module('myApp')
    .config(function ($stateProvider) {
      $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'view1/view1.html'
          })
          .state('register', {
            url: '/register',
            templateUrl: 'register/register.html'
          })
          .state('login', {
            url: '/login',
            templateUrl: 'login/login.html'
          })
          .state('browseMentor', {
              url: '/browseMentor',
              templateUrl: 'browseMentor/browseMentor.html'
          })
          .state('mentorDetail', {
              url: '/mentorDetail?id',
              templateUrl: 'browseMentor/mentorDetail.html'
          })
          .state('dashboard', {
              url: '/dashboard',
              templateUrl: 'dashboard/dashboard.html',
              sp: {authenticate: true}
          })
          .state('applyForMentor', {
            url: '/applyForMentor',
            templateUrl: 'applyForMentor/applyForMentor.html',
            sp: {authenticate: true}
        });
    });