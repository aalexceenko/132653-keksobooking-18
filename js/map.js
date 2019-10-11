'use strict';

(function () {

  var mainPinElement = document.querySelector('.map__pin--main');

  mainPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var mapElement = document.querySelector('.map');
    var clip = function (value, min, max) {
      return Math.min(Math.max(value, min), max);
    };

    var maxX = mapElement.offsetWidth + mapElement.offsetLeft;
    var minX = mapElement.offsetLeft;
    var maxY = mapElement.offsetHeight + mapElement.offsetLeft;
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
        x: clip(moveEvt.clientX, minX, maxX),
        y: clip(moveEvt.clientY, minY, maxY)
      };

      var valueX = mainPinElement.offsetLeft - shift.x;
      var valueY = mainPinElement.offsetTop - shift.y;

      minX = -mainPinElement.offsetWidth / 2;
      maxX = mapElement.offsetWidth - mainPinElement.offsetWidth / 2;

      minY = -mainPinElement.offsetHeight / 2;
      maxY = mapElement.offsetHeight - mainPinElement.offsetHeight / 2;

      mainPinElement.style.left = clip(valueX, minX, maxX) + 'px';
      mainPinElement.style.top = clip(valueY, minY, maxY) + document.body.scrollTop + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
