'use strict';

(function () {
  window.clip = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
  };

  window.shuffle = function (array) {
    var i = array.length;
    var j = 0;
    var temp;

    while (i--) {
      j = Math.floor(Math.random() * (i + 1));

      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  };

})();
