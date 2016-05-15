'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', function($scope, $http) {
        $scope.getAllRec = function(){
            $http({method: 'GET', url: '/db/readRecords'}).
            success(function(data, status) {
                $scope.dataset = data;
            }).
            error(function(data, status) {
                $scope.dataset = data || "Request failed ";
            });
        }

        $scope.getAllRec();
    });