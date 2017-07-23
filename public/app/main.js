(function (angular) {
  'use strict';
  
  angular.module('tshirt', [
    'common.fabric',
    'common.fabric.utilities',
    'common.fabric.constants',
    'naif.base64',
    'ngResource',
    'toastr'
  ]);
})(angular);