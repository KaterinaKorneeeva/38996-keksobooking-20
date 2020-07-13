'use strict';
(function () {
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  window.backend = function (onSuccess, onError, url, action, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    // подписываемся на событие load
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    // отправляем данные - открываем соединение типа POST
    xhr.open(action, url);

    // передаем данные
    xhr.send(data);
  };

})();
