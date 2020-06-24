'use strict';

(function () {

  var map = document.querySelector('.map');
  var advertForm = document.querySelector('.ad-form');
  var similarPinsElement = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var address = advertForm.querySelector('#address');
  var adverts = window.data.generateAdverts(window.data.ADVERTS_COUNT);
  var pageEnabled = false;

  similarPinsElement.appendChild(window.map.renderPins(adverts));

  // перевод страницы в активное состояние
  var setPageEnabled = function (enabled) {
    if (enabled) {
      var coordinates = window.map.getPinCoord(mainPin);
      address.value = coordinates;
      map.classList.remove('map--faded');
      advertForm.classList.remove('ad-form--disabled');
    } else {
      address.value = '';
      map.classList.add('map--faded');
      advertForm.classList.add('ad-form--disabled');
    }
  };

  // ?? при нажатии на ENTER идет в эту функцию, а затем setMainPinClickListener ???
  window.map.setMainPinPressListener(function (evt) {
    window.utils.isEnterEvent(evt, function () {
      pageEnabled = true;
      // pageEnabled = !pageEnabled;
      setPageEnabled(pageEnabled);
    });
  });

  window.map.setMainPinClickListener(function (evt) {
    window.utils.isMouseDownEvent(evt, function () {
      // pageEnabled = !pageEnabled;
      pageEnabled = true;
      setPageEnabled(pageEnabled);
    });
  });

  window.form.setSubmitClickListener(function (evt) {
    evt.preventDefault();
    pageEnabled = !pageEnabled;
    setPageEnabled(pageEnabled);
  });

})();
