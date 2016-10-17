angular.module('portal', ['ngRoute'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        // routing definitions
    $routeProvider
        .when('/portal', {
            redirectTo: '/login'
        })
        .when('/login', {
            templateUrl: '/views/login.html',
            controller: 'loginController'
        })
        .when('/home', {
            templateUrl: '/views/home.html',
            controller: 'homeController'
        })
        .when('/apply', {
            templateUrl: '/views/apply.html',
            controller: 'applyController'
        })
        .when('/profile/:email', {
            templateUrl: '/views/profile.html',
            controller: 'profileController'
        })
        .when('/project/:projectId', {
            templateUrl: '/views/project.html',
            controller: 'projectController'
        })
        .when('/admin', {
            templateUrl: '/views/admin.html',
            controller: 'adminController'
        })
        .when('/terms', {
            templateUrl: '/views/terms.html',
            controller: 'termsController'
        })
        .otherwise({
            redirectTo: '/portal'
        });

        // remove # from URL
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
])
.directive('headerInclude', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/header.html',
        controller: 'headerController'
    };
})
.directive('loaderInclude', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/loader.html'
    };
})
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
