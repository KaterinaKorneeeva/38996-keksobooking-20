'use strict';
(function () {

  var MAIN_PIN_W = 65;
  var MAIN_PIN_H = 87;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  map.classList.remove('map--faded');

  // Функция добавления нового эемента к списку
  var renderPins = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(window.pin.renderPin(arr[i]));
    }
    return fragment;
  };

  // нажатие ENTER по главному пину
  var setMainPinPressListener = function (listener) {
    mainPin.addEventListener('keydown', listener);
  };

  // клик по главному пину
  var setMainPinClickListener = function (listener) {
    mainPin.addEventListener('click', listener);
  };

  // Нахождение координат главного пина
  var getPinCoord = function (pin) {
    var pinLeft = pin.style.left;
    var pinTop = pin.style.top;

    var pinX = parseInt(pinLeft, 10) - MAIN_PIN_W / 2;
    var pinY = parseInt(pinTop, 10) + MAIN_PIN_H;

    return pinX + ', ' + pinY;
  };
  window.map = {
    setMainPinClickListener: setMainPinClickListener,
    setMainPinPressListener: setMainPinPressListener,
    getPinCoord: getPinCoord,
    renderPins: renderPins
  };

})();
