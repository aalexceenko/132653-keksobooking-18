'use strict';
(function () {

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

  var DESCRIPTIONS = ['Сдам жилье недорого', 'Сдам жилье без детей', 'Сдам жилье без животных'];
  var TITLES = ['Лучшая локация', 'Историческое место', 'Лучшее в этом городе'];


  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  };

  var getRandomElement = function (arr) {
    return arr[getRandomInteger(0, arr.length - 1)];
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

  window.generateCard = function (n) {
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
})();
