'use strict';

var TITLES = ['Заголовок #1', 'Заголовок #2', 'Заголовок #3', 'Заголовок #4', 'Заголовок #5', 'Заголовок #6', 'Заголовок #7', 'Заголовок #8'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Описание #1', 'Описание #2', 'Описание #3', 'Описание #4', 'Описание #5', 'Описание #6', 'Описание #7', 'Описание #8'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var NUMBER_OF_PINS = 8;

var mapBlock = document.querySelector('.map');

var similarPinsElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var mapWidth = similarPinsElement.offsetWidth;

// Функция генерации случайного числа от и до
var getRandomNumber = function (min, max) {
  return Math.floor((Math.random() * max) + min);
};

// Функция генерации случайного элемента в массиве
var getRandomItem = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
};

// Функция генерации массива объектов
var generatePins = function () {
  var pinsArr = [];

  for (var i = 0; i < NUMBER_OF_PINS; i++) {
    var locationX = getRandomNumber(0, mapWidth - 50);
    var locationY = getRandomNumber(130, 630);

    pinsArr.push({
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1, NUMBER_OF_PINS) + '.png'
      },
      offer: {
        title: getRandomItem(TITLES),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(1500, 10000),
        type: getRandomItem(TYPES),
        rooms: getRandomNumber(1, 4),
        guests: getRandomNumber(1, 4),
        checkin: getRandomItem(TIMES),
        checkout: getRandomItem(TIMES),
        features: getRandomItem(FEATURES),
        description: getRandomItem(DESCRIPTION),
        photos: getRandomItem(PHOTOS),
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }
  return pinsArr;
};

// Функция создания DOM элемента c объектами
var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';

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

mapBlock.classList.remove('map--faded');
var pins = generatePins();
similarPinsElement.appendChild(renderPins(pins));


