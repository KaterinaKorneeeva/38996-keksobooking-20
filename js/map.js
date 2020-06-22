'use strict';
(function () {

  var map = document.querySelector('.map');
  var similarPinsElement = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var activeMode = false;
  var adverts = window.data.generateAdverts(window.data.ADVERTS_COUNT);

  map.classList.remove('map--faded');

  // функция отрисовывает метки на карте
  similarPinsElement.appendChild(window.pin.renderPins(adverts));

  // клик по главному пину
  mainPin.addEventListener('click', window.main.onMainPinClick);

  // нажатие ENTER по главному пину
  mainPin.addEventListener('keydown', function (evt) {
    event.preventDefault();
    activeMode = true;
    window.utils.isEnterEvent(evt, function () {
      window.main.switchMode(activeMode);
    });
  });
})();
