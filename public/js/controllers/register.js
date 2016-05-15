var app = app || angular.module('occu');

app.controller('registerCtrl', function($scope, $http, tokenStore, $state, $location) {
    $scope.isLogged = (tokenStore.isLogged);

    // modal code to be refactored
    var model = $scope.model = {
        username: null,
        password: null,
        nickname: null,
        confirmpassword: null //Verify Not implemented
    };
    $scope.submit = function() {
        $scope.creating = true;
        $http.post('/auth/register', $scope.model, {}
        ).then(function successCallback(response) {
            $scope.creating = false;
            // var token = response.data.token;
            // tokenStore.set(token);
            // if ($scope.callBack)
            //  $scope.callBack();
            alert("please patiently wait for email to confirm your registration");
            // if ($state.params.next) {
            //     $location.path($state.params.next);         
            // } else {
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
          .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'registerCtrl'
    });
});