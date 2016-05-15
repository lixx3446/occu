'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', function ($scope, $http) {
        
        

        $scope.getUser = function () {
            $http({ method: 'GET', url: '/user' }).
                success(function (data, status) {
                    $scope.isLoggedIn = data ? true : false;
                    $scope.user = data ? data : null;
                }).
                error(function (data, status) {
                    $scope.isLoggedIn = false;
                    $scope.user = null; 
                });
        }

        $scope.getUser();
        //this.action = $scope.action; //|| "Sign in";

    });