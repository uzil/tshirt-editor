(function (angular) {
  'use strict';
  
  // define tshirt module and its dependencies
  angular.module('tshirt', [
    'common.fabric',
    'common.fabric.utilities',
    'common.fabric.constants',
    'naif.base64',
    'ngResource',
    'toastr'
  ]);
})(angular);