'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ADVERTS_COUNT = 8;
var PRICE_MIN = 1500;
var PRICE_MAX = 10000;
var PIN_W = 50;
var PIN_H = 70;
var PIN_Y_FROM = 130;
var PIN_Y_TO = 630;
var MAIN_PIN_W = 65;
var MAIN_PIN_H = 87;
var LEFT_MOUSE_CODE = 0;

var map = document.querySelector('.map');
var similarPinsElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var advertForm = document.querySelector('.ad-form');
var roomsNumber = advertForm.querySelector('#room_number');
var capacity = advertForm.querySelector('#capacity');
var timein = advertForm.querySelector('#timein');
var timeout = advertForm.querySelector('#timeout');
var typeOfHousing = advertForm.querySelector('#type');
var priceInput = advertForm.querySelector('#price');
var mainPin = document.querySelector('.map__pin--main');
var address = advertForm.querySelector('#address');
var Key = {
  ENTER: 'Enter',
  ESCAPE: 'Escape'
};

// перечисления типа жилья
var Placement = {
  BUNGALO: {
    name: 'Бунгало',
    minPrice: '0',
  },
  HOUSE: {
    name: 'Дом',
    minPrice: '5000',
  },
  FLAT: {
    name: 'Квартира',
    minPrice: '1000',
  },
  PALACE: {
    name: 'Дворец',
    minPrice: '10000',
  },
  fromId: function (id) {
    return this[id.toUpperCase()];
  }
};


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция генерации случайного элемента в массиве
var getRandomItem = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

// Функция генерации массива объектов
var generateAdverts = function (count) {
  var adverts = [];
  var mapWidth = similarPinsElement.offsetWidth;

  for (var i = 0; i < count; i++) {
    var locationX = getRandomNumber(0, mapWidth - PIN_W / 2);
    var locationY = getRandomNumber(PIN_Y_FROM, PIN_Y_TO - PIN_H);
    var guestsCount = getRandomNumber(1, 4);
    var roomsCount = getRandomNumber(guestsCount, 4);
    var time = getRandomItem(TIMES);

    adverts.push({
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1, count) + '.png'
      },
      offer: {
        title: 'Заголовок #' + getRandomNumber(1, ADVERTS_COUNT),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(PRICE_MIN, PRICE_MAX),
        type: getRandomItem(TYPES),
        rooms: roomsCount,
        guests: guestsCount,
        checkin: time,
        checkout: time,
        features: getRandomItem(FEATURES),
        description: 'Описание #' + getRandomNumber(1, ADVERTS_COUNT),
        photos: getRandomItem(PHOTOS),
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }
  return adverts;
};

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

map.classList.remove('map--faded');
var adverts = generateAdverts(ADVERTS_COUNT);
similarPinsElement.appendChild(renderPins(adverts));

// перевод страницы в активное состояние
var switchMode = function (action) {
  var coordinates = getPinCoord(mainPin);

  if (action === 'active') {
    address.value = coordinates;
    map.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
  } else {
    address.value = '';
    map.classList.add('map--faded');
    advertForm.classList.add('ad-form--disabled');
  }
};

mainPin.addEventListener('mousedown', onMainPinClick);

mainPin.addEventListener('keydown', function (evt) {
  event.preventDefault();

  var mode = 'active';
  if (evt.key === Key.ENTER) {
    switchMode(mode);
  }
});

function onMainPinClick(evt) {
  var mode = 'active';
  if (evt.button === LEFT_MOUSE_CODE) {
    switchMode(mode);
  }
}

// Нахождение координат главного пина
var getPinCoord = function (pin) {
  var pinLeft = pin.style.left;
  var pinTop = pin.style.top;

  var pinX = parseInt(pinLeft, 10) - MAIN_PIN_W / 2;
  var pinY = parseInt(pinTop, 10) + MAIN_PIN_H;

  return pinX + ', ' + pinY;
};

var validateRoomsAndGuests = function () {

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
var selectTimeInTimeOut = function (evt) {
  timein.value = evt.target.value;
  timeout.value = evt.target.value;
};

// Установка минимального значения поля «Цена за ночь» зависит от поля «Типа жилья»
var setPlaceholderForPriceByHousing = function (evt) {
  var typeOfHouse = evt.target.value;
  priceInput.placeholder = Placement.fromId(typeOfHouse).minPrice;
  priceInput.min = Placement.fromId(typeOfHouse).minPrice;
};


roomsNumber.addEventListener('change', validateRoomsAndGuests);
capacity.addEventListener('change', validateRoomsAndGuests);
timein.addEventListener('change', selectTimeInTimeOut);
timeout.addEventListener('change', selectTimeInTimeOut);
typeOfHousing.addEventListener('change', setPlaceholderForPriceByHousing);

// обработчик на кнопку отправки формы
advertForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var mode = 'inactive';
  switchMode(mode);
});
