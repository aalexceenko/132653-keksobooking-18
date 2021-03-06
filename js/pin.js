'use strict';
(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  window.COUNT_PINS = 5;
  window.KEYCODE_ENTER = 13;


  window.createPinElement = function (card) {
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
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains('map__pin--main') && evt.keyCode === window.KEYCODE_ENTER) {
      onPinClick();
    }
  });


  var pin = document.querySelector('.map__pin--main');

  var doFormActive = function () {
    var formDelete = document.querySelector('.ad-form');
    formDelete.classList.remove('ad-form--disabled');

    document.querySelector('.ad-form-header').disabled = false;

    var allFieldset = document.querySelectorAll('.ad-form__element');
    for (var i = 0; i < allFieldset.length; i++) {
      allFieldset[i].disabled = false;
    }

    var allFormSelect = document.querySelectorAll('.map__filter');
    for (var j = 0; j < allFormSelect.length; j++) {
      allFormSelect[j].disabled = false;
    }

    document.querySelector('.map__features').disabled = false;
  };

  var onPinClick = function () {
    doFormActive();
    doActiveMap();
  };

  pin.addEventListener('mousedown', onPinClick);

  window.successHandler = function (dataCard) {
    var mapPinsElement = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    window.newPins = dataCard;
    var randomArrays = window.shuffle(dataCard);
    randomArrays = randomArrays.slice(0, window.COUNT_PINS);

    for (var i = 0; i < window.COUNT_PINS; i++) {

      fragment.appendChild(window.createPinElement(randomArrays[i]));

      if (i === 0) {
        document.querySelector('.map').insertBefore(window.createMapCardPopupElement(dataCard[i]), document.querySelector('.map__filters-container'));
      }
    }
    mapPinsElement.appendChild(fragment);

  };

  window.errorHandler = function () {
    window.errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    document.querySelector('main').insertAdjacentElement('afterbegin', window.errorMessage);
    window.errorMessage.addEventListener('mousedown', function () {
      document.querySelector('main').removeChild(window.errorMessage);
    });

  };

})();
