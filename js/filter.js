'use strict';

(function () {

  var MIN_FILTER_PRICE = 10000;
  var MAX_FILTER_PRICE = 50000;

  // var newPins = [];
  var mapFilters = document.querySelector('.map__filters');
  var pinsContainer = document.querySelector('.map__pins');

  function filterHouseType(card) {
    var typeHouseElement = document.querySelector('#housing-type');
    switch (typeHouseElement.value) {
      case 'any':
        return card;
      default:
        return card.offer.type === typeHouseElement.value;
    }
  }

  function filterPrice(card) {
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
  }

  var roomsElement = document.querySelector('#housing-rooms');
  function filterRooms(card) {
    // var roomsElement = document.querySelector('#housing-rooms');
    switch (roomsElement.value) {
      case 'any':
        return card;
      default:
        return card.offer.rooms === parseInt(roomsElement.value, 10);
    }
  }

  function filterGuests(card) {
    var guestsElement = document.querySelector('#housing-guests');
    switch (guestsElement.value) {
      case 'any':
        return card;
      default:
        return card.offer.guests === parseInt(guestsElement.value, 10);
    }
  }

  function filterFeatures(card) {
    var featuresElement = document.querySelectorAll('#housing-features .map__checkbox');
    for (var i = 0; i < featuresElement.length; i++) {
      if (featuresElement[i].checked && (card.offer.features.indexOf(featuresElement[i].value) < 0)) {
        return false;
      }
    }
    return true;
    // return card.offer.features === featuresElement.value;
  }

  function deletePin() {
    var pins = document.querySelectorAll('.map__pin');
    // console.log(pins);
    var card = document.querySelector('.map__card');
    if (document.querySelector('.map__card')) {
      document.querySelector('.map').removeChild(card);
    }
    // document.querySelector('.map').removeChild(card);

    for (var i = 1; i < pins.length; i++) {
      // pinsContainer.removeChild(cards[i - 1]);
      // console.log(56);
      pinsContainer.removeChild(pins[i]);
    }
  }

  function filterPin() {
    var fragment = document.createDocumentFragment();
    // newPins = window.sortedCards;
    var filteredPins = window.newPins.filter(filterHouseType);
    // console.log(filteredPins);
    filteredPins = filteredPins.filter(filterPrice);
    filteredPins = filteredPins.filter(filterHouseType).filter(filterRooms).filter(filterGuests).filter(filterFeatures);

    deletePin();
    var length = 5;
    if (filteredPins.length < 5) {
      length = filteredPins.length;
    }
    // for (var i = 0; i < length; i++) {
    //   fragment.appendChild(window.renderCard(filteredPins[i]));
    //   fragment.appendChild(window.renderPin(filteredPins[i], true));
    // }

    for (var i = 0; i < length; i++) {
      // for (var i = 0; i < dataCard.length; i++) {

      fragment.appendChild(window.createPinElement(filteredPins[i]));

      if (i === 0) {
        document.querySelector('.map').insertBefore(window.createMapCardPopupElement(filteredPins[i]), document.querySelector('.map__filters-container'));
      }
    }

    pinsContainer.appendChild(fragment);

  }

  var onFilterChange = function () {
    window.debounce(filterPin, window.debounce.DEBOUNCE_INTERVAL);
  };


  mapFilters.addEventListener('change', onFilterChange);


})();
