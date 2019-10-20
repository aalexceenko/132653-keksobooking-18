'use strict';
(function () {
  window.KEYCODE_ESC = 27;

  window.createMapCardPopupElement = function (card) {

    var mapCardPopupElement = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);

    var mapCardPopupElementImg = mapCardPopupElement.querySelector('.map__card img');
    mapCardPopupElementImg.src = card.author.avatar;
    mapCardPopupElement.querySelector('.popup__title').textContent = card.offer.title;
    mapCardPopupElement.querySelector('.popup__text--address').textContent = card.offer.address;
    mapCardPopupElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    mapCardPopupElement.querySelector('.popup__type').textContent = card.offer.type;

    if ((card.offer.rooms === 1) || (card.offer.guests === 1)) {
      mapCardPopupElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комната для ' + card.offer.guests + ' гостя';
    } else if (card.offer.rooms >= 5) {
      mapCardPopupElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
    } else {
      mapCardPopupElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    }

    mapCardPopupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до' + card.offer.checkout;

    mapCardPopupElement.querySelector('.popup__description').textContent = card.offer.description;

    var features = mapCardPopupElement.querySelector('.popup__features');
    var feature = mapCardPopupElement.querySelector('.popup__feature');

    while (features.firstChild) {
      features.removeChild(features.firstChild);
    }

    for (var i = 0; i < card.offer.features.length; i++) {
      feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add('popup__feature--' + card.offer.features[i]);
      features.appendChild(feature);
    }

    var photos = mapCardPopupElement.querySelector('.popup__photos');
    var photo = mapCardPopupElement.querySelector('.popup__photo');
    photo.src = card.offer.photos[0];

    if (card.offer.photos.length !== 0) {
      for (i = 0; i <= card.offer.photos.length - 2; i++) {
        var photoNew = document.createElement('img');
        photoNew.classList.add('popup__photo');
        photoNew.width = '45';
        photoNew.height = '40';
        photoNew.alt = 'Фотография жилья';
        photoNew.src = card.offer.photos[i + 1];
        photos.appendChild(photoNew);
      }
    } else {
      mapCardPopupElement.removeChild(photos);
    }

    mapCardPopupElement.classList.add('hidden');

    return mapCardPopupElement;
  };

  var updateMapCardPopup = function (card) {
    document.querySelector('.map').removeChild(document.querySelector('.map__card'));
    document.querySelector('.map').insertBefore(window.createMapCardPopupElement(card), document.querySelector('.map__filters-container'));
    document.querySelector('.map__card').classList.remove('hidden');
  };

  window.onMapPinClick = function (evt) {
    var buttonPins = evt.target.parentElement;
    if (buttonPins.classList.contains('map__pin') && !buttonPins.classList.contains('map__pin--main')) {
      updateMapCardPopup(evt.target.card);
    }
  };

  document.querySelector('.map__pins').addEventListener('click', window.onMapPinClick);

  document.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains('map__pin') && evt.keyCode === window.KEYCODE_ENTER) {
      updateMapCardPopup(evt.target.querySelector('img').card);
    }
  });

  var articleCard = document.querySelector('.map');
  var onarticleCardClick = function (evt) {
    var button = evt.target;
    if (button.classList.contains('popup__close')) {
      var cardElement = button.parentNode;
      cardElement.classList.add('hidden');
    }
  };
  articleCard.addEventListener('click', onarticleCardClick);

  articleCard.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.KEYCODE_ESC) {
      document.querySelector('.map__card').classList.add('hidden');
    }
  });

})();
