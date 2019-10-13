'use strict';
(function () {


  var COUNT_CARDS = 8;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  window.KEYCODE_ENTER = 13;


  var createPinElement = function (card) {
    var pinElement = document.querySelector('#pin').content.cloneNode(true);

    pinElement.querySelector('.map__pin').style = 'left: ' + (card.location.x - PIN_WIDTH / 2) + 'px; top: ' + (card.location.y - PIN_HEIGHT) + 'px';
    var pinImageElement = pinElement.querySelector('.map__pin img');
    pinImageElement.src = card.author.avatar;
    pinImageElement.alt = card.offer.title;
    pinImageElement.card = card;

    return pinElement;
  };

  var doActiveMap = function () {
    document.querySelector('.map').classList.remove('map--faded');

    if (isPinned === false) {

      window.successHandler();
    }

    isPinned = true;
  };

  var isPinned = false;
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.KEYCODE_ENTER) {
      doActiveMap();
    }
  });


  var pin = document.querySelector('.map__pin--main');
  var onPinClick = function () {

    doActiveMap();

    var formDelete = document.querySelector('.ad-form');
    formDelete.classList.remove('ad-form--disabled');

    var allFieldset = document.querySelectorAll('.ad-form__element');
    for (var i = 0; i < allFieldset.length; i++) {
      allFieldset[i].disabled = false;
    }
  };

  pin.addEventListener('mousedown', onPinClick);

  window.successHandler = function (dataCard) {
    var mapPinsElement = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < COUNT_CARDS; i++) {

      fragment.appendChild(createPinElement(dataCard[i + 1]));

      if (i === 0) {
        document.querySelector('.map').insertBefore(window.createMapCardPopupElement(dataCard[i]), document.querySelector('.map__filters-container'));
      }
    }
    mapPinsElement.appendChild(fragment);
  };

  window.errorHandler = function () {
    var errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', errorMessage);
  };

})();
