'use strict';

(function () {
  var MAIN_PIN_W = 65;
  var map = document.querySelector('.map');
  var pinHandle = document.querySelector('.map__pin--main');

  var limitOfMap = {
    top: 130,
    right: map.offsetWidth - MAIN_PIN_W / 2,
    bottom: 630,
    left: 0 - MAIN_PIN_W / 2
  };

  // клик по эл-ту
  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // стартовые координаты
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // перемещение курсора (событие)
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      // считаем разницу (передвижение курсора по сетке)
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // переписываем стартовые координаты
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // перезаписываем стили
      var mainPinX = pinHandle.offsetLeft - shift.x;
      var mainPinY = pinHandle.offsetTop - shift.y;

      if (mainPinX < limitOfMap.left) {
        setСoords(limitOfMap.left, mainPinY);
      } else if (mainPinX > limitOfMap.right) {
        setСoords(limitOfMap.right, mainPinY);
      } else if (mainPinY < limitOfMap.top) {
        setСoords(mainPinX, limitOfMap.top);
      } else if (mainPinY > limitOfMap.bottom) {
        setСoords(mainPinX, limitOfMap.bottom);
      } else {
        setСoords(mainPinX, mainPinY);
      }
    };

    // отпускание кнопки мыши(событие)
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var setСoords = function (x, y) {
    pinHandle.style.left = x + 'px';
    pinHandle.style.top = y + 'px';
  };
})();
