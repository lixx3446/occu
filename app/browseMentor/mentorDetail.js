'use strict';

angular.module('myApp.mentorDetail', [])
.controller('mentorDetailCtrl', function($scope, $http, $user, $state) {
    $scope.getMentorInfo = function(){
        $http({method: 'GET', url: '/db/getRecordByUsername?username=' + $state.params.id}).
        success(function(data, status) {
            $scope.userInfo = data[0];
            $scope.assignField();
        }).
        error(function(data, status) {
            console.log(data);
        });
    };

    $scope.assignField = function() {
        $scope.fName = $scope.userInfo.firstname;
        $scope.lName = $scope.userInfo.lastname;
        $scope.nickname = $scope.userInfo.nickname;
        $scope.education = $scope.userInfo.education;
        $scope.interviewExp = $scope.userInfo.interviewexp;
        $scope.workingExp = $scope.userInfo.workingexp;
        $scope.seldescdetail = $scope.userInfo.seldescdetail;
        $scope.seldescsimple = $scope.userInfo.seldescsimple;
        $scope.availability = $scope.userInfo.availability;
        $scope.servicePrice = $scope.userInfo.serviceprice;
    };

    $scope.getMentorInfo();



});



