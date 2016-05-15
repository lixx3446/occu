var app = app || angular.module('occu');

app.controller('resetCtrl', function($scope, $http, tokenStore, $state, $location) {
	var resetToken = $state.params.token;
	var username = $state.params.username;

    console.log(resetToken);
    // modal code to be refactored
    var model = $scope.model = {
        new_password: null,
        confirmpassword: null //Verify Not implemented
    };
    $scope.submit = function() {
        $scope.creating = true;
        var obj = $scope.model;
        obj.token = resetToken;
        $http.post('/auth/' + username + '/reset', $scope.model, {}
        ).then(function successCallback(response) {
            $scope.creating = false;
            $state.go('home');
            // }
            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
            $scope.creating = false;
            console.log(response);
          });
        //login logic to move here
    };
});

//This can be moved to js of controller or page
app.config(function($stateProvider){
    $stateProvider
          .state('reset', {
            url: '/:username/reset?token',
            params: {'token':''},
            templateUrl: 'templates/reset.html',
            controller: 'resetCtrl'
    });
});