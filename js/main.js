'use strict';

var COUNT_CARDS = 8;
var TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_HOUSE = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var X_MAX = 900;
var X_MIN = 300;
var Y_MAX = 630;
var Y_MIN = 130;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var DESCRIPTIONS = ['Сдам жилье недорого', 'Сдам жилье без детей', 'Сдам жилье без животных'];
var TITLES = ['Лучшая локация', 'Историческое место', 'Лучшее в этом городе'];


var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

var getRandomElement = function (arr) {
  return arr[window.getRandomInteger(0, arr.length - 1)];
};

var getRandomFeatures = function (features) {
  var restFeatures = features.slice();
  var countFeatures = getRandomInteger(1, restFeatures.length);
  var result = [];
  for (var i = 0; i < countFeatures; ++i) {
    result.push(restFeatures.splice(getRandomInteger(0, restFeatures.length - 1), 1));
  }

  return result;
};

var generateCard = function (n) {
  var location = {
    x: getRandomInteger(X_MIN, X_MAX),
    y: getRandomInteger(Y_MIN, Y_MAX),
  };
  return {
    author: {
      avatar: 'img/avatars/user0' + n + '.png',
    },

    offer: {
      title: getRandomElement(TITLES),
      address: location.x + ',' + location.y,
      price: getRandomInteger(1, 1000),
      type: getRandomElement(TYPE_HOUSE),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 5),
      checkin: getRandomElement(CHECKIN),
      checkout: getRandomElement(CHECKOUT),
      features: getRandomFeatures(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photos: PHOTOS_HOUSE,
    },

    location: location,
  };
};

var createPinElement = function (card) {
  var pinElement = document.querySelector('#pin').content.cloneNode(true);

  pinElement.querySelector('.map__pin').style = 'left: ' + (card.location.x - PIN_WIDTH / 2) + 'px; top: ' + (card.location.y - PIN_HEIGHT) + 'px';
  var pinImageElement = pinElement.querySelector('.map__pin img');
  pinImageElement.src = card.author.avatar;
  pinImageElement.alt = card.offer.title;

  return pinElement;
};

var createListElement = function (card) {
  // var listElement = document.querySelector('#card').content.cloneNode(true);
  var listElement = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);

  listElement.src = card.author.avatar;
  listElement.querySelector('.popup__title').textContent = card.offer.title;
  listElement.querySelector('.popup__text--address').textContent = card.offer.address;
  listElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';

  if ((card.offer.rooms === 1) || (card.offer.guests === 1)) {
    listElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комната для ' + card.offer.guests + ' гостя';
  } else if (card.offer.rooms >= 5) {
    listElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
  } else {
    listElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  }

  listElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до' + card.offer.checkout;

  listElement.querySelector('.popup__description').textContent = card.offer.description;

  var features = listElement.querySelector('.popup__features');
  var feature = listElement.querySelector('.popup__feature');

  while (features.firstChild) {
    features.removeChild(features.firstChild);
  }

  for (var i = 0; i < card.offer.features.length; i++) {
    feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + card.offer.features[i]);
    features.appendChild(feature);
  }

  var photos = listElement.querySelector('.popup__photos');
  var photo = listElement.querySelector('.popup__photo');
  photo.src = card.offer.photos[0];
  for (i = 0; i <= card.offer.photos.length - 2; i++) {
    var photoNew = document.createElement('img');
    photoNew.classList.add('popup__photo');
    photoNew.width = '45';
    photoNew.height = '40';
    photoNew.alt = 'Фотография жилья';
    photoNew.src = card.offer.photos[i + 1];
    photos.appendChild(photoNew);
  }

  return listElement;
};

document.querySelector('.map').classList.remove('map--faded');


var mapPinsElement = document.querySelector('.map__pins');

for (var i = 0; i < COUNT_CARDS; i++) {
  var card = generateCard(i + 1);

  mapPinsElement.appendChild(createPinElement(card));
  mapPinsElement.appendChild(createListElement(card));
}
