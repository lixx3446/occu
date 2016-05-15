var app = app || angular.module('occu');

var leaveMessageController = function ($scope, $filter, $stateParams, tokenStore, Users, $q, Messages,$state) {
	
	var username = $scope.username = $stateParams.username;
	$scope.page = $stateParams.page;
	var $profile = $scope.$profile =
	Users.get({username: username});

    $scope.enable = false;

    if (tokenStore.isLogged()){
        $scope.enable = true;
    }
    else{
        $scope.enable = false;
    }



    $scope.postMessage = function(msg){
        var msgObj = {message: msg,
            to_username: $scope.username, token: tokenStore.get()};

        Messages.save(msgObj, function(msg) {
            $("#myModal").modal();
        });
    };


    $('#myModal').on('hidden.bs.modal', function () {
        $state.go('browse');
    })

};

// This can be moved to js of controller or page
app.config(function($stateProvider){
	$stateProvider
          .state('leaveMessage', {
            url: '/leaveMessage/:username',
            //params: {page: 'Profile'},
            templateUrl: 'templates/leaveMessage/',
            controller: leaveMessageController
	});
});

