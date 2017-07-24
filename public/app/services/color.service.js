(function(angular) {
  'use strict';

  var app = angular.module('tshirt');

  // service to interact with color REST API
  app.factory('colorservice', function($resource) {
    return $resource('/api/colors/:id', { id: '@_id' });
  });
})(angular);
