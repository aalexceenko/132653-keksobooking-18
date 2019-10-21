'use strict';

(function () {

  var MIN_FILTER_PRICE = 10000;
  var MAX_FILTER_PRICE = 50000;

  var mapFilters = document.querySelector('.map__filters');
  var pinsContainer = document.querySelector('.map__pins');

  var filterHouseType = function (card) {
    var typeHouseElement = document.querySelector('#housing-type');
    switch (typeHouseElement.value) {
      case 'any':
        return card;
      default:
        return card.offer.type === typeHouseElement.value;
    }
  };

  var filterPrice = function (card) {
    var priceElement = document.querySelector('#housing-price');
    switch (priceElement.value) {
      case 'any':
        return card;
      case 'low':
        return card.offer.price < MIN_FILTER_PRICE;
      case 'middle':
        return (card.offer.price >= MIN_FILTER_PRICE) && (card.offer.price <= MAX_FILTER_PRICE);
      case 'high':
        return card.offer.price > MAX_FILTER_PRICE;
      default:
        return card.offer.price === priceElement.value;
    }
  };

  var roomsElement = document.querySelector('#housing-rooms');
  var filterRooms = function (card) {
    switch (roomsElement.value) {
      case 'any':
        return card;
      default:
        return card.offer.rooms === parseInt(roomsElement.value, 10);
    }
  };

  var filterGuests = function (card) {
    var guestsElement = document.querySelector('#housing-guests');
    switch (guestsElement.value) {
      case 'any':
        return card;
      default:
        return card.offer.guests === parseInt(guestsElement.value, 10);
    }
  };

  var filterFeatures = function (card) {
    var featuresElement = document.querySelectorAll('#housing-features .map__checkbox');
    for (var i = 0; i < featuresElement.length; i++) {
      if (featuresElement[i].checked && (card.offer.features.indexOf(featuresElement[i].value) < 0)) {
        return false;
      }
    }
    return true;
  };

  var deletePin = function () {
    var pins = document.querySelectorAll('.map__pin');
    var card = document.querySelector('.map__card');

    if (document.querySelector('.map__card')) {
      document.querySelector('.map').removeChild(card);
    }

    for (var i = 1; i < pins.length; i++) {
      pinsContainer.removeChild(pins[i]);
    }
  };

  var filterPin = function () {
    var fragment = document.createDocumentFragment();
    var filteredPins = window.newPins.filter(filterHouseType);
    filteredPins = filteredPins.filter(filterPrice);
    filteredPins = filteredPins.filter(filterHouseType).filter(filterRooms).filter(filterGuests).filter(filterFeatures);

    deletePin();
    var MAX_COUNT_PINS = 5;
    if (filteredPins.length < window.COUNT_PINS) {
      MAX_COUNT_PINS = filteredPins.length;
    }
    filteredPins = window.shuffle(filteredPins);

    for (var i = 0; i < MAX_COUNT_PINS; i++) {

      fragment.appendChild(window.createPinElement(filteredPins[i]));

      if (i === 0) {
        document.querySelector('.map').insertBefore(window.createMapCardPopupElement(filteredPins[i]), document.querySelector('.map__filters-container'));
      }
    }

    pinsContainer.appendChild(fragment);

  };

  var onFilterChange = function () {
    window.debounce(filterPin, window.debounce.DEBOUNCE_INTERVAL);
  };

  mapFilters.addEventListener('change', onFilterChange);

})();
