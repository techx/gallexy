angular.module('portal').controller('headerController', function ($scope, $http, $location) {

    $scope.showPage = false;

    // load user object, redirect to login if not logged in
    $http.get('/api/user/current').then(function (response) {
        $scope.user = response.data;
        $scope.showPage = true;
    }, function (response) {
        $location.path('/portal');
    });

    // send POST request to logout
    $scope.logout = function () {
        $http.post('/api/user/logout').then(function (response) {
            $location.path('/portal');
        }).then(function (response) {
            $location.path('/portal');
        });
    }

});
