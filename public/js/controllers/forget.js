var app = app || angular.module('occu');

app.controller('forgetCtrl', function($scope, $http, tokenStore, $state, $location) {

    $scope.submit = function() {
        $scope.creating = true;
        var obj = $scope.model;
        $http.post('/auth/' + $scope.model.username + '/forgot', $scope.model, {}
        ).then(function successCallback(response) {
            $state.go('home');
            // }
            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
            console.log(response);
          });
        //login logic to move here
    };
});

//This can be moved to js of controller or page
app.config(function($stateProvider){
    $stateProvider
          .state('forget', {
            url: '/forget',
            //params: {'token':''},
            templateUrl: 'templates/forget.html',
            controller: 'forgetCtrl'
    });
});