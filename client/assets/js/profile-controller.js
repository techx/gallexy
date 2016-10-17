angular.module('portal').controller('profileController', function ($scope, $http, $location, $routeParams) {

    // page title
    $scope.title = 'profile';
    $scope.editStatus = false;

    // specify which fields to display (maps field name to key in project object)
    $scope.profileFields = {
        'email': 'email',
        'name': 'name',
        'course': 'course',
        'year': 'year',
        'interests': 'interests'
    };

    // get profile user
    var getProfileInfo = function () {
        $http.get('/api/user?email=' + $routeParams.email).then(function (response) {
            console.log(response.data);
            $scope.profileUser = response.data;
        }, function (response) {
            sweetAlert("Oops...", "User not found!", "error");
        });
    }

    // edit profile
    $scope.editProfile = function () {
        if ($scope.editStatus === true) {
            saveProfile($scope.profileUser, function () {
                getProfileInfo();
                $scope.editStatus = false;
            });
        } else {
            $scope.editStatus = true;
        }
    }

    var saveProfile = function (user, callback) {
        $http.post('/api/user/update', {
            'user': user
        }).then(function (result) {
            swal({
                title: "Woo!",
                text: "Profile saved successfully.",
                type: "success",
                timer: 1500,
                showConfirmButton: false
            });
            callback();
        }, function (result) {
            sweetAlert("Oops...", "Something went wrong with saving!", "error");
            callback();
        });
    }

    // get info right away
    getProfileInfo();


});
