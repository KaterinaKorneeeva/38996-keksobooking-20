'use strict';

(function () {
  var LEFT_MOUSE_CODE = 0;
  var Key = {
    ENTER: 'Enter',
    ESCAPE: 'Escape'
  };

  // проверка нажатия ENTER
  var isEnterEvent = function (evt, action) {
    if (evt.key === Key.ENTER) {
      action();
    }
  };

  // проверка нажатия ESCAPE
  var isEscEvent = function (evt, action) {
    if (evt.key === Key.ESCAPE) {
      console.log('evt.key',evt.key);
      action();
    }
  };

  // проверка нажатия левой кнопки мыши
  var isMouseDownEvent = function (evt, action) {
    if (evt.button === LEFT_MOUSE_CODE) {
      action();
    }
  };

  // Функция генерации случайного числа
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Функция генерации случайного элемента в массиве
  var getRandomItem = function (arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
  };

  window.utils = {
    Key: Key,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    isMouseDownEvent: isMouseDownEvent,
    getRandomNumber: getRandomNumber,
    getRandomItem: getRandomItem
  };
})();
