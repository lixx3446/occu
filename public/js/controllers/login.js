var app = app || angular.module('occu');

app.controller('loginCtrl', function($scope, $http, tokenStore, $state, $location, $cookies) {
	$scope.isLogged = (tokenStore.isLogged());

	if ($scope.isLogged)
		$state.go('profile', {username: tokenStore.getObj().username});

	// modal code to be refactored
	var model = $scope.model = {
		username: null,
		password: null,
		rememberMe: null
	};

	$scope.submit = function() {
		$http.post('/auth/login', $scope.model, {}
		).then(function successCallback(response) {
			var token = response.data.token;
			tokenStore.set(token);

			if ($state.params.state && $state.params.state.name != "" &&//direct access?
				$state.params.state.name != "login" &&
				$state.params.state.name != "register") {
				$state.go($state.params.state, $state.params.params);
			} else {
				$state.go('profile', {username: $scope.model.username});
			}
		  }, function errorCallback(response) {
		  	alert('invalid credential');
		  	console.log(response);
		  });
	};

	$scope.logout = function() {
		tokenStore.set(null);
		$cookies.remove('token');
	};
});

//This can be moved to js of controller or page
app.config(function($stateProvider){
	$stateProvider
          .state('login', {
            url: '/login?next',
            params: {'next': null},
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
    });
});

app.config(function($stateProvider){
	$stateProvider
          .state('validate', {
            url: '/validate?token',
            params: {'token':null},
            template: '<h1>Redirecting</h1>',
            controller: function($state, tokenStore, $http) {
            	var token = $state.params.token;
            	$http.post('/auth/validate', {token: token}, {}
				).then(function successCallback(response) {
					var token = response.data.token;
					tokenStore.set(token);

					if ($state.params.state) {
						$state.go($state.params.state, $state.params.params);
					} else {
						$state.go('profile', {username: tokenStore.getObj().username});
					}
				  }, function errorCallback(response) {
				  	console.log(response);
				  });
			}
    });
});


