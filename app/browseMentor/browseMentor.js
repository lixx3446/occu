'use strict';

angular.module('myApp.browseMentor', [])
.controller('browseMentorCtrl', function($scope, $http, $user) {
    //play with data return from db
    $scope.getAllRec = function(){
      $http({method: 'GET', url: '/db/readRecords'}).
      success(function(data, status) {
        $scope.dataset = data;
          console.log(data);
          //log each entry (each mentor)
          data.forEach(function(entry){
              console.log(entry);
          });
      }).
      error(function(data, status) {
        $scope.dataset = data || "Request failed ";
      });
    };


    $scope.getAllRec();
});



