'use strict';
(function () {

  var MAIN_PIN_W = 65;
  var MAIN_PIN_H = 87;

  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // Функция создания DOM элемента c объектами
  var renderPin = function (advert) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.querySelector('img').alt = advert.offer.title;
    pinElement.style.left = advert.location.x + 'px';
    pinElement.style.top = advert.location.y + 'px';

    return pinElement;
  };

  // Функция добавления нового эемента к списку
  var renderPins = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPin(arr[i]));
    }
    return fragment;
  };

  // Нахождение координат главного пина
  var getPinCoord = function (pin) {
    var pinLeft = pin.style.left;
    var pinTop = pin.style.top;

    var pinX = parseInt(pinLeft, 10) - MAIN_PIN_W / 2;
    var pinY = parseInt(pinTop, 10) + MAIN_PIN_H;

    return pinX + ', ' + pinY;
  };

  window.pin = {
    renderPins: renderPins,
    getPinCoord: getPinCoord
  };

})();
