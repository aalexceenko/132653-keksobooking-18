'use strict';
(function () {
  var MIN_LENGTH_SYMBOLS = 30;
  var MAX_LENGTH_SYMBOLS = 100;

  var typeHouse = document.querySelector('#type');
  var onTypeHouseChange = function () {

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
  typeHouse.addEventListener('change', onTypeHouseChange);

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var onTimeInChange = function () {
    if (timeIn.options.selectedIndex === 0) {
      timeOut.options.selectedIndex = 0;
    } else if (timeIn.options.selectedIndex === 1) {
      timeOut.options.selectedIndex = 1;
    } else if (timeIn.options.selectedIndex === 2) {
      timeOut.options.selectedIndex = 2;
    }
  };
  timeIn.addEventListener('change', onTimeInChange);

  var onTimeOutChange = function () {
    if (timeOut.options.selectedIndex === 0) {
      timeIn.options.selectedIndex = 0;
    } else if (timeOut.options.selectedIndex === 1) {
      timeIn.options.selectedIndex = 1;
    } else if (timeOut.options.selectedIndex === 2) {
      timeIn.options.selectedIndex = 2;
    }
  };
  timeOut.addEventListener('change', onTimeOutChange);

  var room = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');

  var onRoomChange = function () {
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
  onRoomChange();
  room.addEventListener('change', onRoomChange);

  var onGuestsChange = function () {
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

  guests.addEventListener('change', onGuestsChange);

  var form = document.querySelector('.ad-form');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), formUpload, window.errorHandler);
  });

  var formUpload = function () {
    var userDialog = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    document.querySelector('main').insertAdjacentElement('afterbegin', userDialog);

    userDialog.addEventListener('mousedown', function () {
      document.querySelector('main').removeChild(userDialog);
    });

    window.doNotActiveMap();

  };


  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.KEYCODE_ESC && evt.target.classList.contains('') && (document.querySelector('main').firstChild.classList.contains('success') || document.querySelector('main').firstChild.classList.contains('error'))) {
      document.querySelector('main').removeChild(document.querySelector('main').firstChild);
    }
  });

  window.doNotActiveMap = function () {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    document.querySelector('.map__pin--main').style = 'left: ' + 570 + 'px; top: ' + 375 + 'px';
    var allFieldset = document.querySelectorAll('.ad-form__element');
    for (var i = 0; i < allFieldset.length; i++) {
      allFieldset[i].disabled = true;
    }
    document.querySelector('.ad-form').reset();
    var pins = document.querySelectorAll('.map__pin');

    for (var j = 1; j < pins.length; j++) {
      document.querySelector('.map__pins').removeChild(pins[j]);
    }
    window.isPinned = false;
  };


  var title = document.querySelector('#title');
  title.addEventListener('input', function () {

    if (title.value.length < MIN_LENGTH_SYMBOLS || title.value.length > MAX_LENGTH_SYMBOLS) {
      title.setCustomValidity('Заголовок объявления должен содержать от 30 до 100 символов');
    } else {
      title.setCustomValidity('');
    }
  });
}

)();
