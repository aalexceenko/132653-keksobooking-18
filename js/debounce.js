'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  var debounce = function (cb) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    var parameters = arguments;
    lastTimeout = window.setTimeout(function () {
      cb.apply(null, parameters);
    }, DEBOUNCE_INTERVAL);
  };

  window.debounce = debounce;
})();
