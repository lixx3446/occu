var app = app || angular.module('occu');

var payController = function ($scope, $filter, $stateParams, tokenStore, Users, $q) {
	
	var mentor = $scope.username = $stateParams.username;
	var $profile = $scope.$profile =
	Users.get({username: mentor});

    $scope.enable = false;

    if (tokenStore.isLogged()){
        $scope.enable = true;
    }
    else{
        $scope.enable = false;
    }


    $scope.service = {};
    $scope.serviceStr = "";


    $scope.availability = {
        day: "",
        start: "",
        end: ""
    };

    $scope.updateService = function() {
        var obj = JSON.parse($scope.serviceStr);
        $scope.service.type = obj.type;
        $scope.service.price = obj.price;
    }

};

// This can be moved to js of controller or page
app.config(function($stateProvider){
	$stateProvider
          .state('pay', {
            url: '/pay/:username',
            //params: {page: 'Profile'},
            templateUrl: 'templates/pay/',
            controller: payController
	});
});

