'use strict';

var myApp = angular.module('myApp.directives', []);

myApp.directive('fhheader', function() {
    return {
        scope: {},
        restrict: 'E',
        replace: true,
        templateUrl: 'views/components/header.html',
        link: function(scope, elem, attrs, ctrl) {
            var headerProps = {
                title: attrs.title,
                subtext: attrs.subtext
            };
            scope.title = headerProps;
        }
    };
});

myApp.directive('fhfooter', function() {
    return {
        scope: {},
        restrict: 'E',
        replace: true,
        templateUrl: 'views/components/footer.html',
        link: function(scope, elem, attrs, ctrl) {
            scope.version = attrs.version;
        }
    };
});