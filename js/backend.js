'use strict';

(function () {

  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;

  var HttpStatusCodes = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    USER_UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case HttpStatusCodes.SUCCESS:
          onLoad(xhr.response);
          break;
        case HttpStatusCodes.BAD_REQUEST:
          onError('Неверный запрос');
          break;
        case HttpStatusCodes.USER_UNAUTHORIZED:
          onError('Пользователь не авторизован');
          break;
        case HttpStatusCodes.NOT_FOUND:
          onError('Страница не найдена');
          break;
        case HttpStatusCodes.SERVER_ERROR:
          onError('Внутренняя ошибка сервера');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === HttpStatusCodes.SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

})();
