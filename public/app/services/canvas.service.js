(function(angular) {
  'use strict';

  var app = angular.module('tshirt');

  app.factory('canvasservice', function($resource) {
    return $resource('/api/canvases/:id', { id: '@_id' });
  });
})(angular);
