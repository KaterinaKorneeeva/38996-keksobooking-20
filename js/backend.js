'use strict';
(function () {

  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200
  };

  var Url = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    POST:' https://javascript.pages.academy/keksobooking'
  }

  var createRequest = function (onSuccess, onError) {
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
    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr =  createRequest(onSuccess, onError);
    // отправляем данные - открываем соединение типа POST
    console.log('Url.GET', Url.GET);
    xhr.open('GET', Url.GET);
    // передаем данные
    xhr.send();
  };

  var save = function (onSuccess, onError, data) {
    var xhr =  createRequest(onSuccess, onError);
    // отправляем данные - открываем соединение типа POST
    console.log('Url.GET', Url.GET);
    xhr.open('POST', Url.POST);

    // передаем данные
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
