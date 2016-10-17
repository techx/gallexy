angular.module('portal').controller('adminController', function ($scope, $http, $location) {

    // page title
    $scope.title = 'admin';

    // specify which fields to display (maps field name to key in project object)
    $scope.projectFields = {
        'name': 'name',
        'team': 'teamDisplay'
    };

    // sorting state
    $scope.sortKey = 'pointDisplay';
    $scope.sortReverse = true;

    // get all projects
    $http.get('/api/project/all').then(function (response) {
        $scope.projects = response.data;
        $scope.projects.forEach(function (project) {
            addDisplayFields(project);
        });
        $scope.sortBy('name');
    }, function (response) {
        $location.path('/portal'); // not admin, redirect back to root
    });

    var dateFromObjectId = function (objectId) {
    	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    };

    var prettyDate = function (date) {
      var secs = Math.floor((Date.now() - date.getTime()) / 1000);
      if (secs < 60) return secs + " sec ago";
      if (secs < 3600) return Math.floor(secs / 60) + " min ago";
      if (secs < 86400) return Math.floor(secs / 3600) + " hour ago";
      if (secs < 604800) return Math.floor(secs / 86400) + " day ago";
      return date.toDateString();
    }

    // adds pretty display fields to project object
    var addDisplayFields = function (project) {

        // team
        var teamDisplay = '';
        project.public.team.forEach(function (email) {
            teamDisplay += email.replace(/@mit.edu/g, '') + ', ';
        })
        teamDisplay = teamDisplay.substring(0, teamDisplay.length - 2);
        project.teamDisplay = teamDisplay;

        // date
        project.date = prettyDate(dateFromObjectId(project._id));

        return project;
    }

    // sort by given key; reverse if already sorted by given key
    $scope.sortBy = function (key) {
        if (key === $scope.sortKey) {
            $scope.sortReverse = !$scope.sortReverse;
        } else {
            $scope.sortKey = key;
            $scope.sortReverse = false;
        }
    }

});
