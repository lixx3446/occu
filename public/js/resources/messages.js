// messages.js

app.factory('Messages', ['$resource', function($resource) {
return $resource('/message/:other_user', null,
    {
        'update': { method:'PUT' }
    });
}]);

