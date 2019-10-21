'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  function debounce(last) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(last, DEBOUNCE_INTERVAL);
  }

  window.debounce = debounce;
})();
