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

var KEYCODE_ESC = 27;
var KEYCODE_ENTER = 13;

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
var counter1 = 1;
var createPinElement = function (card) {
  var pinElement = document.querySelector('#pin').content.cloneNode(true);

  pinElement.querySelector('.map__pin').style = 'left: ' + (card.location.x - PIN_WIDTH / 2) + 'px; top: ' + (card.location.y - PIN_HEIGHT) + 'px';
  var pinImageElement = pinElement.querySelector('.map__pin img');
  pinImageElement.src = card.author.avatar;
  pinImageElement.alt = card.offer.title;
  pinImageElement.id = counter1;

  // pinElement.querySelector('.map__pin').id = counter1;
  counter1++;

  return pinElement;
};

var createMapCardPopupElement = function (card) {

  var mapCardPopupElement = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);

  var mapCardPopupElementImg = mapCardPopupElement.querySelector('.map__card img');
  mapCardPopupElementImg.src = card.author.avatar;
  mapCardPopupElement.querySelector('.popup__title').textContent = card.offer.title;
  mapCardPopupElement.querySelector('.popup__text--address').textContent = card.offer.address;
  mapCardPopupElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';

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

  for (i = 0; i <= card.offer.photos.length - 2; i++) {
    var photoNew = document.createElement('img');
    photoNew.classList.add('popup__photo');
    photoNew.width = '45';
    photoNew.height = '40';
    photoNew.alt = 'Фотография жилья';
    photoNew.src = card.offer.photos[i + 1];
    photos.appendChild(photoNew);
  }

  mapCardPopupElement.classList.add('hidden');

  return mapCardPopupElement;
};

var isPinned = false;
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE_ENTER) {
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

var doActiveMap = function () {
  document.querySelector('.map').classList.remove('map--faded');

  if (isPinned === false) {
    renderPins();
  }

  isPinned = true;
};

pin.addEventListener('mousedown', onPinClick);


var renderPins = function () {
  var mapPinsElement = document.querySelector('.map__pins');

  for (var i = 0; i < COUNT_CARDS; i++) {
    var card = generateCard(i + 1);
    mapPinsElement.appendChild(createPinElement(card));

    if (i === 0) {
      document.querySelector('.map').insertBefore(createMapCardPopupElement(card), document.querySelector('.map__filters-container'));
    }
  }
};


var typeHouse = document.querySelector('#type');
var ontypeHouseChange = function () {

  var priceForHouse = document.querySelector('#price');

  if (typeHouse.options.selectedIndex === 1) {
    priceForHouse.min = '1000';
    priceForHouse.placeholder = '1000';
  } else if (typeHouse.options.selectedIndex === 0) {
    priceForHouse.min = '0';
    priceForHouse.placeholder = '0';
  } else if (typeHouse.options.selectedIndex === 2) {
    priceForHouse.min = '5000';
    priceForHouse.placeholder = '5000';
  } else if (typeHouse.options.selectedIndex === 3) {
    priceForHouse.min = '10000';
    priceForHouse.placeholder = '10000';
  }
};
typeHouse.addEventListener('change', ontypeHouseChange);

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

var ontimeInChange = function () {
  if (timeIn.options.selectedIndex === 0) {
    timeOut.options.selectedIndex = 0;
  } else if (timeIn.options.selectedIndex === 1) {
    timeOut.options.selectedIndex = 1;
  } else if (timeIn.options.selectedIndex === 2) {
    timeOut.options.selectedIndex = 2;
  }
};
timeIn.addEventListener('change', ontimeInChange);

var ontimeOutChange = function () {
  if (timeOut.options.selectedIndex === 0) {
    timeIn.options.selectedIndex = 0;
  } else if (timeOut.options.selectedIndex === 1) {
    timeIn.options.selectedIndex = 1;
  } else if (timeOut.options.selectedIndex === 2) {
    timeIn.options.selectedIndex = 2;
  }
};
timeOut.addEventListener('change', ontimeOutChange);

var room = document.querySelector('#room_number');
var guests = document.querySelector('#capacity');

var onroomChange = function () {
  for (var i = 0; i < guests.options.length; i++) {
    guests.options[i].disabled = true;
  }
  if (room.options.selectedIndex === 0) {
    guests.options.selectedIndex = 2;
    for (i = 0; i < guests.options.length; i++) {
      if (guests.options[i].text === 'для 1 гостя') {
        guests.options[i].disabled = false;
      }
    }
  } else if (room.options.selectedIndex === 1) {
    guests.options.selectedIndex = 2;
    for (i = 0; i < guests.options.length; i++) {
      if ((guests.options[i].text === 'для 1 гостя') || (guests.options[i].text === 'для 2 гостей')) {
        guests.options[i].disabled = false;
      }
    }
  } else if (room.options.selectedIndex === 2) {
    guests.options.selectedIndex = 2;
    for (i = 0; i < guests.options.length; i++) {
      if (guests.options[i].text !== 'не для гостей') {
        guests.options[i].disabled = false;
      }
    }
  } else if (room.options.selectedIndex === 3) {
    guests.options.selectedIndex = 3;
    for (i = 0; i < guests.options.length; i++) {
      if (guests.options[i].text === 'не для гостей') {
        guests.options[i].disabled = false;
      }
    }
  }
};

room.addEventListener('change', onroomChange);

var onguestsChange = function () {
  for (var i = 0; i < room.options.length; i++) {
    room.options[i].disabled = true;
  }
  if (guests.options.selectedIndex === 0) {
    room.options.selectedIndex = 2;
    for (i = 0; i < room.options.length; i++) {
      if (room.options[i].text === '3 комнаты') {
        room.options[i].disabled = false;
      }
    }
  } else if (guests.options.selectedIndex === 1) {
    room.options.selectedIndex = 2;
    for (i = 0; i < room.options.length; i++) {
      if ((room.options[i].text === '2 комнаты') || (room.options[i].text === '3 комнаты')) {
        room.options[i].disabled = false;
      }
    }
  } else if (guests.options.selectedIndex === 2) {
    room.options.selectedIndex = 2;
    for (i = 0; i < room.options.length; i++) {
      if (room.options[i].text !== '100 комнат') {
        room.options[i].disabled = false;
      }
    }
  } else if (guests.options.selectedIndex === 3) {
    room.options.selectedIndex = 3;
    for (i = 0; i < room.options.length; i++) {
      if (room.options[i].text === 'не для гостей') {
        room.options[i].disabled = false;
      }
    }
  }
};

guests.addEventListener('change', onguestsChange);

window.onMapPinClick = function (event) {
  var buttonPins = event.target.parentElement;
  var buttonPinsId = event.target.id;
  if (buttonPins.classList.contains('map__pin')) {
    if (!buttonPins.classList.contains('map__pin--main')) {
      document.querySelector('.map').removeChild(document.querySelector('.map__card'));
      document.querySelector('.map').insertBefore(createMapCardPopupElement(generateCard(buttonPinsId)), document.querySelector('.map__filters-container'));
      document.querySelector('.map__card').classList.remove('hidden');
    }
  }
};

document.querySelector('.map__pins').addEventListener('click', window.onMapPinClick);

// document.addEventListener('keydown', function (e) {
//   console.log(e.target);
//   if (e.target.classList.contains('map__pin')) {
//     if (e.keyCode === KEYCODE_ENTER) {
//       window.onMapPinClick();
//     }
//   }

// });

var articleCard = document.querySelector('.map');
var onarticleCardClick = function (e) {
  var button = e.target;
  if (button.classList.contains('popup__close')) {
    var cardElement = button.parentNode;
    cardElement.classList.add('hidden');
  }
};
articleCard.addEventListener('click', onarticleCardClick);

articleCard.addEventListener('keydown', function (event) {
  if (event.keyCode === KEYCODE_ESC) {
    document.querySelector('.map__card').classList.add('hidden');
  }
});
