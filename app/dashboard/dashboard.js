'use strict';

angular.module('myApp.dashboard', [])
.controller('dashboardCtrl', function($scope, $http, $user) {

    $user.get()
        .then(function (user) {
            //console.log('The current user is', user);
            $http({method: 'GET', url: '/db/getRecordByUsername?username=' + user.username}).
            success(function(data, status) {
                $scope.userInfo = data[0];
                $scope.assignFields(data);
            }).
            error(function(data, status) {
                console.log(data);
            });
        })
        .catch(function (error) {
            console.log('Error getting user', error);
        });

    $scope.assignFields = function(data){
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
        $scope.initServicePrice();
    };

    $scope.initServicePrice = function() {
        if($scope.servicePrice == null){
            $scope.servicePrice = [];
            $scope.servicePrice.push({
                type:"30min Career Talk",
                check:false,
                price:0
            });
            $scope.servicePrice.push({
                type:"60min Career Talk",
                check:false,
                price:0
            });
            $scope.servicePrice.push({
                type:"30min Resume Review",
                check:false,
                price:0
            });
            $scope.servicePrice.push({
                type:"60min Resume Review",
                check:false,
                price:0
            });
            $scope.servicePrice.push({
                type:"30min Mock Interview",
                check:false,
                price:0
            });
            $scope.servicePrice.push({
                type:"60min Mock Interview",
                check:false,
                price:0
            });
        }
    }


    $scope.addMoreEducation = function () {
        if($scope.education == null){
            $scope.education = [];
        }
        $scope.education.push({
            university: "",
            year: "",
            major: ""
        });
    };

    $scope.addMoreInterviewExp = function () {
        if($scope.interviewExp == null){
            $scope.interviewExp = [];
        }
        $scope.interviewExp.push({
            company: ""
        });
    };

    $scope.addMoreWorkingExp = function () {
        if($scope.workingExp == null){
            $scope.workingExp = [];
            console.log("i'm in the add and it's init");
        }
        $scope.workingExp.push({
            time: "",
            company: "",
            position: "",
            location: ""
        });
    };

    $scope.addMoreAvailability = function() {
        if($scope.availability == null){
            $scope.availability = [];
        }
        $scope.availability.push({
            day: "",
            start: "",
            end: ""
        });
    };



//to do: complete the update function (create a new one for completing profile)
    $scope.updRecordPost = function(){
        var data = {
            fName: $scope.fName,
            lName: $scope.lName,
            education: JSON.stringify($scope.education),
            workingExp: JSON.stringify($scope.workingExp),
            availability: JSON.stringify($scope.availability),
            nickname: $scope.nickname,
            interviewExp: JSON.stringify($scope.interviewExp),
            seldescdetail: $scope.seldescdetail,
            seldescsimple: $scope.seldescsimple,
            servicePrice: JSON.stringify($scope.servicePrice)
        };
        $http.post("/db/updRecordProfile", data).success(function(data, status) {
            alert('Submit successfully');
        });
    };
});



