(function (angular) {
  'use strict'

  var app = angular.module('tshirt');
  
  app.factory('tshirtservice', function ($resource) {
    return $resource  ('/api/tshirts/:id', {id: '@_id'});
  });
})(angular);