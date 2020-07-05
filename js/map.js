'use strict';
(function () {

  var MAIN_PIN_W = 65;
  var MAIN_PIN_H = 87;
  var MAX_SIMILAR_ADVERTS_COUNT = 5;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  map.classList.remove('map--faded');

  // Функция добавления нового эемента к списку
  var renderPins = function (adverts) {
    var takeNumber = adverts.length > MAX_SIMILAR_ADVERTS_COUNT ? MAX_SIMILAR_ADVERTS_COUNT : adverts.length;

    var fragment = document.createDocumentFragment();

    adverts.slice(0, takeNumber)
      .forEach(function (ad) {
        fragment.appendChild(window.pin.renderPin(ad));
      });

    return fragment;
  };

  // Удаление popupCard
  var closePopupCard = function () {
    var popup = document.querySelector('.map__card');
    if (popup) {
      popup.remove();
    }
  };

  // удаление пинов с карты
  var deletePinsOnMap = function () {
    var allPinsOnMap = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPinsOnMap.forEach(function (pin) {
      pin.remove();
    });
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
    renderPins: renderPins,
    deletePinsOnMap: deletePinsOnMap,
    closePopupCard: closePopupCard
  };

})();
