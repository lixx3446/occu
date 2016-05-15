'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function($scope, $http) {
  $scope.hello = {name: "Boaz"};
  $scope.newName = "";
  $scope.sendPost = function() {
    var data = {
        name: $scope.newName
      };
    $http.post("/dashboard", data).success(function(data, status) {
      $scope.hello = data;
    })
  }


});