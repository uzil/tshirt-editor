(function (angular){
  'use strict';

  var app = angular.module('tshirt');

  app.controller('mainController', [
      '$window',
      '$scope',
      'Fabric',
      'FabricConstants',
      'colorservice',
      'canvasservice',
      'tshirtservice',
      'toastr',
      function (
        $window,
        $scope,
        Fabric,
        FabricConstants,
        colorservice,
        canvasservice,
        tshirtservice,
        toastr) {
    var _this = this;

    // init variables to be available on html
    _this.exportData = {};
    _this.loading = {};
    _this.pageElem = {};
    _this.pageElem.canvasHistory = [];
    _this.pageElem.historyLimit = 5;
    _this.colors = [];
    _this.apparels = [];
    
    // init functions to be available on html
    _this.selectApparel = selectApparel;
    _this.selectColor = selectColor;
    _this.initCanvas = initCanvas;
    _this.save = save;
    _this.onImgUpload = onImageUpload;
    _this.textChange = textChange;
    _this.clearActive = clearActive;
    _this.loadCanvas = loadCanvas;
    _this.loadSavedCanvas = loadSavedCanvas;


    // init page
    //check for local storage if not there add a blank array
    if ($window.localStorage.getItem('canvasHistory')) {
      $window.localStorage.setItem('canvasHistory', JSON.stringify([]));
    }
    
    // initialise fabric vars to use in directive
    _this.fabric = {};
    _this.FabricConstants = FabricConstants;

    // init the canvas and page when it is canvas is created
    $scope.$on('canvas:created', function () {
      _this.initCanvas();
      init();

    });

    // fetch color from api
    function fetchColors() {
      // set state as loading
      _this.loading.color = true;
      
      colorservice.query({}, function(result) {
        _this.colors = result;

        // make first elem of result as selected by default
        selectColor(result[0]);
        _this.loading.color = false;
      }, function () {
        _this.loading.color = false;
        toastr.error('Unable to fetch colors from api', 'Error');
      })
    }
    function fetchApparels() {
      _this.loading.apparel = true;

      tshirtservice.query({}, function(result) {
        _this.apparels = result;

        // make first elem of apparel selected by default
        _this.pageElem.selectedApparel = result[0];
        selectApparel();

        _this.loading.apparel = false;
      }, function () {
        _this.loading.apparel = false;
        toastr.error('Unable to fetch apparels list from api', 'Error');
      });
    }

    function selectApparel() {
      _this.exportData.apparelId = _this.pageElem.selectedApparel.id;
    }

    function selectColor(colorCode) {
      _this.pageElem.selectedColor = colorCode;
      _this.exportData.colorCode = _this.pageElem.selectedColor;

      // make canvas background to have invisible canvas
      _this.fabric.setCanvasBackgroundColor('transparent');
    }

    function initCanvas() {
      _this.fabric = new Fabric({
        JSONExportProperties: FabricConstants.JSONExportProperties,
        textDefaults: FabricConstants.textDefaults,
        shapeDefaults: FabricConstants.shapeDefaults,
        json: {
          width: 200,
          height: 400, 
        }
      });
    }

    // check if email is set
    function hasEmail(sendToast) {
      if (_this.pageElem.email && _this.pageElem.email.length) {
        return true;
      } else {
        if(sendToast) toastr.error('Email is required', 'Error');
        return false;
      }
    }

    // check if style title is set
    function hasTitle(sendToast) {
      if (_this.pageElem.styleTitle && _this.pageElem.styleTitle.length) {
        return true;
      } else {
        if(sendToast) toastr.error('Design title is required', 'Error');
        return false;
      }
    }

    // load a saved canvas form REST Api
    function loadSavedCanvas () {
      if(!hasEmail(true)) return false;

      _this.exportData.email = _this.pageElem.email;

      // fetch data by email provided
      canvasservice.query({email: _this.exportData.email}, function (result) {
        _this.savedCanvas = result;
        toastr.success('Records loaded', 'Success');
      }, function () {
        toastr.error('Cannot fetch record', 'Error');
      });
    }

    // save canvas
    function save() {
      if(!hasEmail(true)) {
        return false;
      } else if (!hasTitle(true)) return false;

      // set the backbround color to
      // user selected one as it need to saved in db
      _this.fabric.setCanvasBackgroundColor(_this.pageElem.selectedColor);

      var canvasJSON = _this.fabric.getJSON();
      var canvasHistory = JSON.parse($window.localStorage.getItem('canvasHistory'));
      
      // set back the canvas color to transparent for user exp
      _this.fabric.setCanvasBackgroundColor('transparent');

      // define data to be exported
      _this.exportData.title = _this.pageElem.styleTitle;
      _this.exportData.canvasJSON = canvasJSON;
      _this.exportData.createdAt = new Date();
      _this.exportData.email = _this.pageElem.email;
      
      // save the data via api
      canvasservice.save(_this.exportData, function () {

        // set the history in localstorage
        canvasHistory.unshift(_this.exportData);
        $window.localStorage.setItem('canvasHistory', JSON.stringify(canvasHistory));

        fetchCanvasHistory();

        // reload saved data from database
        loadSavedCanvas();
        
        toastr.success('Successfully saved', 'Success'); 
      }, function () {
        toastr.error('Unable to save', 'Error');
      });
    }

    function onImageUpload(e, reader, file, fileList, fileOjects, fileObj) {
      _this.pageElem.img = fileObj;
      _this.fabric.addImage('data:image/png;base64,' + fileObj.base64);
    }

    function textChange() {
      if (!_this.fabric.selectedObject || !_this.fabric.selectedObject.text) {
        _this.fabric.addText(_this.pageElem.canvasText);
      }
      _this.fabric.selectActiveObject();
      _this.fabric.selectedObject.text = _this.pageElem.canvasText;

    }

    function clearActive() {
      _this.fabric.selectedObject = null;
      _this.pageElem.canvasText = '';
    }

    function init () {
      fetchColors();
      fetchApparels();
    }

    function fetchCanvasHistory() {
      _this.pageElem.canvasHistory = JSON.parse($window.localStorage.getItem('canvasHistory'));
    }

    function loadCanvas(history) {
      _this.fabric.clearCanvas();
      _this.fabric.loadJSON(history.canvasJSON);
      
      _this.pageElem.selectedColor = history.colorCode;
      _this.pageElem.selectedApparel.id = history.apparelId;
      _this.pageElem.styleTitle = history.title;

      // after canvas is fully loaded hide the background for user exp
      _this.fabric.setCanvasBackgroundColor('transparent');
    }
    
  }]);
})(angular);