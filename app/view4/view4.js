'use strict';

angular.module('myApp.view4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view4', {
    templateUrl: 'view4/view4.html',
    controller: 'View4Ctrl'
  });
}])

.controller('View4Ctrl', function($scope, $http) {
    $scope.username = '';
    $scope.fName = '';
    $scope.lName = '';
    $scope.email = '';

    $scope.getAllRec = function(){
      $http({method: 'GET', url: '/db/readRecords'}).
      success(function(data, status) {
        $scope.dataset = data;
      }).
      error(function(data, status) {
        $scope.dataset = data || "Request failed ";
      });
    }


    $scope.addRecord = function(){
      $http({method: 'GET', url: '/db/addRecord?fName='+$scope.fName+'&lName='+
      $scope.lName+'&email='+$scope.email+'&username='+$scope.username}).
      success(function(data, status) {
        alert('Record Added');
        $scope.getAllRec();
      });
    }

    $scope.delRecord = function(username){
      console.log(username);
      if(confirm('Are you sure you want to delete this record ? '))
      {
        $http({method: 'GET', url: '/db/delRecord?username='+username}).
        success(function(data, status) {
          $scope.getAllRec();
        });
      }
    }

  $scope.updRecord = function(username) {
    $http({method: 'GET', url: '/db/updRecord?fName='+$scope.fNameUpdate+'&lName='+
    $scope.lNameUpdate+'&email='+$scope.emailUpdate+'&username='+$scope.usernameUpdate}).
    success(function(data, status) {
      alert('Record Updated');
      $scope.getAllRec();
    });
  }

    $scope.getAllRec();


});



