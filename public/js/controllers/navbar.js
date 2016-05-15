var app = app || angular.module('occu');

app.controller('navbarCtrl', function($scope, tokenStore, $cookies, $state, Users){
    if (($scope.isLogged = (tokenStore.isLogged()))) {
    	$scope.username = (tokenStore.getObj().username);

        var $profile = $scope.$profile =
            Users.get({username: $scope.username});
    }
    $scope.logout = function() {
    	tokenStore.set(null);
		$state.go($state.current, $state.params || {},
			{reload: true});
	}

    $scope.goApply = function(){
        $state.go('apply', {username: $scope.username});
    }
});