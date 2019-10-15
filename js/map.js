'use strict';

(function () {

  var mainPinElement = document.querySelector('.map__pin--main');
  var isPinned = false;

  mainPinElement.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    if (isPinned === false) {
      window.load(window.successHandler, window.errorHandler);
    }
    isPinned = true;

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

      var valueX = mainPinElement.offsetLeft - shift.x;
      var valueY = mainPinElement.offsetTop - shift.y;

      minX = -mainPinElement.offsetWidth / 2;
      maxX = mapElement.offsetWidth - mainPinElement.offsetWidth / 2;

      minY = -mainPinElement.offsetHeight / 2;
      maxY = mapElement.offsetHeight - mainPinElement.offsetHeight / 2;

      mainPinElement.style.left = window.clip(valueX, minX, maxX) + 'px';
      mainPinElement.style.top = window.clip(valueY, minY, maxY) + document.body.scrollTop + 'px';
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
