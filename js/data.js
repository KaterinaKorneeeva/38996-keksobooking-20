// модуль, который создаёт данные
'use strict';

(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PRICE_MIN = 1500;
  var PRICE_MAX = 10000;
  var PIN_W = 50;
  var PIN_H = 70;
  var MAP_Y_FROM = 130;
  var MAP_Y_TO = 630;
  var ADVERTS_COUNT = 8;

  var similarPinsElement = document.querySelector('.map__pins');
  // Функция генерации массива объектов
  var generateAdverts = function (count) {
    var adverts = [];
    var mapWidth = similarPinsElement.offsetWidth;

    for (var i = 0; i < count; i++) {
      var locationX = window.utils.getRandomNumber(0, mapWidth - PIN_W / 2);
      var locationY = window.utils.getRandomNumber(MAP_Y_FROM, MAP_Y_TO - PIN_H);
      var guestsCount = window.utils.getRandomNumber(1, 4);
      var roomsCount = window.utils.getRandomNumber(guestsCount, 4);
      var time = window.utils.getRandomItem(TIMES);

      adverts.push({
        author: {
          avatar: 'img/avatars/user0' + window.utils.getRandomNumber(1, count) + '.png'
        },
        offer: {
          title: 'Заголовок #' + window.utils.getRandomNumber(1, ADVERTS_COUNT),
          address: locationX + ', ' + locationY,
          price: window.utils.getRandomNumber(PRICE_MIN, PRICE_MAX),
          type: window.utils.getRandomItem(TYPES),
          rooms: roomsCount,
          guests: guestsCount,
          checkin: time,
          checkout: time,
          features: window.utils.getRandomItem(FEATURES),
          description: 'Описание #' + window.utils.getRandomNumber(1, ADVERTS_COUNT),
          photos: window.utils.getRandomItem(PHOTOS),
        },
        location: {
          x: locationX,
          y: locationY
        }
      });
    }
    return adverts;
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

  window.data = {
    ADVERTS_COUNT: ADVERTS_COUNT,
    generateAdverts: generateAdverts,
    Placement: Placement
  };

})();
