'use strict';

(function () {
  window.clip = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
  };
})();
