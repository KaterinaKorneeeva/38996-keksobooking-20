'use strict';
(function () {

  var MAIN_PIN_W = 65;
  var MAIN_PIN_H = 87;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  map.classList.remove('map--faded');

  // Функция добавления нового эемента к списку
  var renderPins = function (adverts) {
    var fragment = document.createDocumentFragment();
    adverts.forEach(function (ad) {
      fragment.appendChild(window.pin.renderPin(ad));
    });

    return fragment;
  };

  // удаление пинов с карты
  var deletePinsOnMap = function () {
    var allPinsOnMap = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPinsOnMap.forEach(function (pin) {
      pin.remove();
    });
  };

  // нажатие ENTER по главному пину
  var setMainPinPressListener = function (onMainPinPress) {
    mainPin.addEventListener('keydown', onMainPinPress);
  };

  // клик по главному пину
  var setMainPinClickListener = function (onMainPinClick) {
    mainPin.addEventListener('click', onMainPinClick);
  };

  // клик по пину
  var setPinClickListener = function (onPinClick) {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.addEventListener('click', onPinClick);
    });
  };

  // Нахождение дефолтных координат главного пина
  var getDefaultPinCoord = function (pin) {

    var pinW = pin.clientWidth;
    var pinH = pin.clientHeight;

    var pinLeft = pin.offsetLeft;
    var buttonTop = pin.offsetTop;

    var pinX = pinLeft + pinW / 2;
    var pinY = buttonTop + pinH / 2;

    return pinX + ', ' + pinY;
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
    setPinClickListener: setPinClickListener,
    getPinCoord: getPinCoord,
    renderPins: renderPins,
    deletePinsOnMap: deletePinsOnMap,
    getDefaultPinCoord: getDefaultPinCoord
  };
})();
