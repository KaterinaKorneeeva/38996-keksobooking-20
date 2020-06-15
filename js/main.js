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

var map = document.querySelector('.map');
var similarPinsElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

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
        checkin: getRandomItem(TIMES),
        checkout: getRandomItem(TIMES),
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


