'use strict';

(function () {

  var BORDER_TOP = 130;
  var BORDER_BOTTOM = 630;
  var mainPinElement = document.querySelector('.map__pin--main');
  window.isPinned = false;

  var windowWidth = window.innerWidth;
  var overlayWidth = document.querySelector('.map__overlay').offsetWidth;
  var deltaWidth = (windowWidth - overlayWidth) / 2;
  var mainPinElementHalf = mainPinElement.offsetWidth / 2;

  var loadNewPins = function () {
    if (window.isPinned === false) {
      window.load(window.successHandler, window.errorHandler);
      document.querySelector('.ad-form').querySelector('#address').value = Math.round(mainPinElement.offsetLeft + mainPinElementHalf) + ', ' + (mainPinElement.offsetTop + mainPinElement.offsetHeight);

    }
    window.isPinned = true;
  };

  mainPinElement.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    loadNewPins();

    var mapElement = document.querySelector('.map');

    var maxX = mapElement.offsetWidth + mapElement.offsetLeft;
    var minX = mapElement.offsetLeft;
    var maxY = mapElement.offsetHeight + mapElement.offsetTop;
    var minY = mapElement.offsetTop;

    var startCoordinate = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoordinate.x - moveEvt.clientX,
        y: startCoordinate.y - moveEvt.clientY
      };

      startCoordinate = {
        x: window.clip(moveEvt.clientX, minX, maxX),
        y: window.clip(moveEvt.clientY, minY, maxY)
      };

      var valueX = moveEvt.clientX - shift.x;
      var valueY = mainPinElement.offsetTop - shift.y;

      minX = deltaWidth;
      maxX = mapElement.offsetWidth + deltaWidth;

      minY = BORDER_TOP - mainPinElement.offsetHeight;
      maxY = BORDER_BOTTOM - mainPinElement.offsetHeight;

      mainPinElement.style.left = window.clip(valueX, minX, maxX) - deltaWidth - mainPinElementHalf + 'px';
      mainPinElement.style.top = window.clip(valueY, minY, maxY) + 'px';

      document.querySelector('.ad-form').querySelector('#address').value = Math.round(window.clip(valueX, minX, maxX) + mainPinElementHalf) + ', ' + (window.clip(valueY, minY, maxY) + mainPinElementHalf + mainPinElementHalf);

    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  mainPinElement.addEventListener('keydown', function (evt) {
    evt.preventDefault();

    if (evt.keyCode === window.KEYCODE_ENTER) {
      loadNewPins();
    }
  });

})();
