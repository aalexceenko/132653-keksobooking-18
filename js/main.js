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

var DESCRIPTIONS = ['Сдам жилье 1'];
var TITLES = ['Заголовок'];


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
    var selectedElement = restFeatures.splice(getRandomInteger(0, restFeatures.length - 1), 1);
    result.push(selectedElement);
  }

  return result;
};

var generateCards = function (n) {
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


document.querySelector('.map').classList.remove('map--faded');


var mapPinsElement = document.querySelector('.map__pins');

for (var i = 0; i < COUNT_CARDS; i++) {
  var card = generateCards(i + 1);

  var pinElementTemplate = document.querySelector('#pin').content;

  var pinElement = pinElementTemplate.cloneNode(true);
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  pinElement.querySelector('.map__pin').style = 'left: ' + (card.location.x - PIN_WIDTH / 2) + 'px; top: ' + (card.location.y - PIN_HEIGHT) + 'px';

  var pinImageElement = pinElement.querySelector('.map__pin img');
  pinImageElement.src = card.author.avatar;
  pinImageElement.alt = card.offer.title;


  mapPinsElement.appendChild(pinElement);
}


