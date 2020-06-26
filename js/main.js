'use strict';

(function () {

  var map = document.querySelector('.map');
  var advertForm = document.querySelector('.ad-form');
  var similarPinsElement = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var address = advertForm.querySelector('#address');
  var pageEnabled = false;

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

  window.map.setMainPinPressListener(function (evt) {
    window.utils.isEnterEvent(evt, function () {
      pageEnabled = true;
      setPageEnabled(pageEnabled);
    });
  });

  window.map.setMainPinClickListener(function (evt) {
    window.utils.isMouseDownEvent(evt, function () {
      pageEnabled = true;
      setPageEnabled(pageEnabled);
    });
  });

  window.form.setSubmitClickListener(function (evt) {
    evt.preventDefault();
    pageEnabled = !pageEnabled;
    setPageEnabled(pageEnabled);
  });

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHandler = function (adverts) {
    similarPinsElement.appendChild(window.map.renderPins(adverts));
  };

  window.load(successHandler, errorHandler);

})();
