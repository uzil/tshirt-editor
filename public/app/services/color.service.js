(function(angular) {
  'use strict';

  var app = angular.module('tshirt');

  app.factory('colorservice', function($resource) {
    return $resource('/api/colors/:id', { id: '@_id' });
  });
})(angular);
