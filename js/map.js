'use strict';

(function () {

  var BORDER_TOP = 130;
  var BORDER_BOTTOM = 630;
  var mainPinElement = document.querySelector('.map__pin--main');
  window.isPinned = false;

  mainPinElement.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    if (window.isPinned === false) {
      window.load(window.successHandler, window.errorHandler);
    }
    window.isPinned = true;

    var mapElement = document.querySelector('.map');

    var maxX = mapElement.offsetWidth + mapElement.offsetLeft;
    var minX = mapElement.offsetLeft;
    var maxY = mapElement.offsetHeight + mapElement.offsetTop;
    var minY = mapElement.offsetTop;

    var startCoordinate = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.querySelector('.ad-form').querySelector('#address').value = startCoordinate.x + ', ' + startCoordinate.y;

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

      window.lastCoordinate = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      document.querySelector('.ad-form').querySelector('#address').value = window.lastCoordinate.x + ', ' + window.lastCoordinate.y;


      var valueX = mainPinElement.offsetLeft - shift.x;
      var valueY = mainPinElement.offsetTop - shift.y;

      minX = -mainPinElement.offsetWidth / 2;
      maxX = mapElement.offsetWidth - mainPinElement.offsetWidth / 2;

      minY = BORDER_TOP - mainPinElement.offsetHeight;
      maxY = BORDER_BOTTOM - mainPinElement.offsetHeight;

      mainPinElement.style.left = window.clip(valueX, minX, maxX) + 'px';
      mainPinElement.style.top = window.clip(valueY, minY, maxY) + 'px';

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
      window.load(window.successHandler, window.errorHandler);
    }
  });
})();
