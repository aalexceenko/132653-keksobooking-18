'use strict';

var COUNT_CARDS = 8;
var TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_HOUSE = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var X_MAX = 900;
var X_MIN = 300;
var Y_MAX = 630;
var Y_MIN = 130;


var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

var getRandomElement = function (arr) {
  return arr[window.getRandomInteger(0, arr.length - 1)];
};

var featureArr = [];
var FEATURES_MIN = 0;
var FEATURES_MAX = 6;
var FEATURES_LENGTH = getRandomInteger(FEATURES_MIN, FEATURES_MAX);

for (var i = 0; i < FEATURES_LENGTH; i++) {
   featureArr[i] = FEATURES[i];
}



var generateCards = function () {
  return {
        author: 'img/avatars/user0' + [i + 1] + '.png',

        offer: {
          title: '',
          address: location.x + ',' + location.y,
          price: Math.ceil(Math.random() * 1000),
          type: getRandomElement(TYPE_HOUSE),
          rooms: Math.ceil(Math.random() * 5),
          guests: Math.ceil(Math.random() * 5),
          checkin: getRandomElement(CHECKIN),
          checkout: getRandomElement(CHECKOUT),
          features: featureArr,
          description: '',
          photos: PHOTOS_HOUSE,
        },

        location: {
          x: getRandomInteger(X_MIN, X_MAX),
          y: getRandomInteger(Y_MIN, Y_MAX)
        }}
      };

      for (var i = 0; i < COUNT_CARDS; i++) {
        var card = generateCards();

    }
document.querySelector('.map').classList.remove('map--faded');
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var pointTemplate = document.querySelector('.map__pin');


