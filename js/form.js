'use strict';

(function () {
  var advertForm = document.querySelector('.ad-form');
  var roomsNumber = advertForm.querySelector('#room_number');
  var capacity = advertForm.querySelector('#capacity');
  var timein = advertForm.querySelector('#timein');
  var timeout = advertForm.querySelector('#timeout');
  var typeOfHousing = advertForm.querySelector('#type');
  var priceInput = advertForm.querySelector('#price');
  var resetFormBtn = advertForm.querySelector('.ad-form__reset');

  var onRoomsAndGuestsChange = function () {
    var error = '';
    var roomsNum = parseInt(roomsNumber.value, 10);
    var capacityNum = parseInt(capacity.value, 10);

    if (roomsNum === 100 && capacityNum !== 0) {
      error = 'Не для гостей';
    } else if (roomsNum !== 100 && capacityNum === 0) {
      error = 'Для гостей';
    } else if (capacityNum > roomsNum) {
      error = roomsNum === 1
        ? 'Для 1 гостя'
        : 'Для ' + roomsNum + ' гостей';
    }

    capacity.setCustomValidity(error);
  };

  // синхронизация Поля «Время заезда» и «Время выезда»
  var onTimeInTimeOutChange = function (evt) {
    var time = evt.target.value;
    timein.value = time;
    timeout.value = time;
  };

  // Установка минимального значения поля «Цена за ночь» зависит от поля «Типа жилья»
  var onTypeChange = function (evt) {
    var typeOfHouse = evt.target.value;
    var minPrice = window.data.Placement.fromId(typeOfHouse).minPrice;
    priceInput.placeholder = minPrice;
    priceInput.min = minPrice;
  };

  var onResetClick = function (evt) {
    evt.preventDefault();
    advertForm.reset();
  };

  roomsNumber.addEventListener('change', onRoomsAndGuestsChange);
  capacity.addEventListener('change', onRoomsAndGuestsChange);
  timein.addEventListener('change', onTimeInTimeOutChange);
  timeout.addEventListener('change', onTimeInTimeOutChange);
  typeOfHousing.addEventListener('change', onTypeChange);

  // обработчик на кнопку отправки формы
  var setSubmitClickListener = function (listener) {
    advertForm.addEventListener('submit', listener);
  };

  resetFormBtn.addEventListener('click', onResetClick);

  window.form = {
    setSubmitClickListener: setSubmitClickListener
  };
})();
