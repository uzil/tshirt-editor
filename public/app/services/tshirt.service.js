(function (angular) {
  'use strict'

  var app = angular.module('tshirt');
  
  // service to interact with tshirt REST API
  app.factory('tshirtservice', function ($resource) {
    return $resource  ('/api/tshirts/:id', {id: '@_id'});
  });
})(angular);