'use strict';

angular.module('projectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/moviemapping', {
        template: '<moviemapping></moviemapping>'
      });
  });
