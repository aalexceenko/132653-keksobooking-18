'use strict';
(function () {
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
}
)();
