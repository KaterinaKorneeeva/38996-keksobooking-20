'use strict';

var advertForm = document.querySelector('.ad-form');
var roomsNumber = advertForm.querySelector('#room_number');
var capacity = advertForm.querySelector('#capacity');
var timein = advertForm.querySelector('#timein');
var timeout = advertForm.querySelector('#timeout');
var typeOfHousing = advertForm.querySelector('#type');
var priceInput = advertForm.querySelector('#price');

var onRoomsAndGuestsChange = function () {

  var error;
  var roomsNum = parseInt(roomsNumber.value, 10);
  var capacityNum = parseInt(capacity.value, 10);

  if (roomsNum === 1) {
    error = 'для 1 гостя';
  } else if (roomsNum === 2) {
    error = 'для 2 гостей или для 1 гостя';
  } else if (roomsNum === 3) {
    error = 'для 1, 2 или 3 гостей';
  } else {
    error = '';
  }

  if ((roomsNum === 100) && (capacityNum !== 0)) {
    capacity.setCustomValidity('не для гостей');
  } else if (!(roomsNum >= capacityNum) || (capacityNum === 0)) {
    if ((roomsNum === 100) && (capacityNum === 0)) {
      capacity.setCustomValidity('');
    } else {
      capacity.setCustomValidity(error);
    }
  } else {
    capacity.setCustomValidity('');
  }
};

// синхронизация Поля «Время заезда» и «Время выезда»
var onTimeInTimeOutChange = function (evt) {
  timein.value = evt.target.value;
  timeout.value = evt.target.value;
};

// Установка минимального значения поля «Цена за ночь» зависит от поля «Типа жилья»
var onMinPriceChange = function (evt) {
  var typeOfHouse = evt.target.value;
  var minPrice = window.data.Placement.fromId(typeOfHouse).minPrice;
  priceInput.placeholder = minPrice;
  priceInput.min = minPrice;
};

roomsNumber.addEventListener('change', onRoomsAndGuestsChange);
capacity.addEventListener('change', onRoomsAndGuestsChange);
timein.addEventListener('change', onTimeInTimeOutChange);
timeout.addEventListener('change', onTimeInTimeOutChange);
typeOfHousing.addEventListener('change', onMinPriceChange);

// обработчик на кнопку отправки формы
advertForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  window.main.activeMode = false;
  window.main.switchMode(window.main.activeMode);
});
