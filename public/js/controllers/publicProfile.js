var app = app || angular.module('occu');

var publicProfileController = function
	($scope, $filter, $stateParams, tokenStore, Users, $q, $sce) {
	
	var username = $scope.username = $stateParams.username;
	$scope.page = $stateParams.page;
	var $profile = $scope.$profile =
	Users.get({username: username},function(){
        $scope.$profile.self_description_detail = $scope.$profile.self_description_detail.replace(/\n/g, '<br>');
        $scope.$profile.self_description_simple = $scope.$profile.self_description_simple.replace(/\n/g, '<br>');
	});



    $scope.HTMLself_description_detail = function() {
        if($profile.self_description_detail){
            return $sce.trustAsHtml($profile.self_description_detail.replace(/\n/g, '<br>'));
        }
    };
    $scope.HTMLself_description_simple = function() {
        if($profile.self_description_simple){
            return $sce.trustAsHtml($profile.self_description_simple.replace(/\n/g, '<br>'));
        }
    };
};

// This can be moved to js of controller or page
app.config(function($stateProvider){
	$stateProvider
          .state('publicProfile', {
            url: '/publicProfile/:username',
            //params: {page: 'Profile'},
            templateUrl: 'templates/publicProfile/',
            controller: publicProfileController
	});
});

