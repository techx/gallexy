angular.module('portal').controller('loginController', function ($scope, $http, $location) {

    $scope.showPage = false;

    // redirect home if logged in
    $http.get('/api/user/current').then(function (response) {
        $location.path('/home');
    }, function (response) {
        $scope.showPage = true;
        // $scope.login(); // attempt to redirect automatically
    });

    // log in with certificates by redirecting
    $scope.login = function () {
        $http.post('/api/user/assignkey').then(function (response) {
            window.location = response.data;
        }, function (response) {
            swal('Oops...', 'An error occurred...', 'error');
        });
    }

});
