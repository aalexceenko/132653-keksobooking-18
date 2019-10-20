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

  // window.debounce = function (fun) {
  //   var lastTimeout = null;
  //
  //   return function() {
  //     var args = arguments;
  //     if (lastTimeout) {
  //       window.clearTimeout(lastTimeout);
  //     }
  //     lastTimeout = window.setTimeout(function() {
  //       fun.apply(null, args);
  //     }, DEBOUNCE_INTERVAL);
  //   };

  window.debounce = debounce;
})();
