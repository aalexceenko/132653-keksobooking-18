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
      renderPins();
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

  var cards = [];
  var renderPins = function () {
    var mapPinsElement = document.querySelector('.map__pins');

    for (var i = 0; i < COUNT_CARDS; i++) {

      var card = window.generateCard(i + 1);
      cards.push(card);
      mapPinsElement.appendChild(createPinElement(card));

      if (i === 0) {
        document.querySelector('.map').insertBefore(window.createMapCardPopupElement(card), document.querySelector('.map__filters-container'));
      }
    }
  };

})();
