'use strict';

(function () {

  var map = document.querySelector('.map');
  var advertForm = document.querySelector('.ad-form');

  var mainPin = document.querySelector('.map__pin--main');
  var address = advertForm.querySelector('#address');

  // перевод страницы в активное состояние
  var switchMode = function (active) {
    var coordinates = window.pin.getPinCoord(mainPin);
    if (active) {
      address.value = coordinates;
      map.classList.remove('map--faded');
      advertForm.classList.remove('ad-form--disabled');
    } else {
      address.value = '';
      map.classList.add('map--faded');
      advertForm.classList.add('ad-form--disabled');
    }
  };

  var onMainPinClick = function (evt) {
    var activeMode = true;
    window.utils.isMouseDownEvent(evt, function () {
      switchMode(activeMode);
    });
  };

  window.main = {
    switchMode: switchMode,
    onMainPinClick: onMainPinClick
  };

})();
