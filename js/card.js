'use strict';
(function () {

  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');

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

  // добавление изображений в шаблон "card"
  var getPhotosOffer = function (photos) {
    var cardPhotoElements = document.querySelectorAll('.popup__photos > img');
    var cardPhotoElement = map.querySelector('.popup__photos > img');

    document.querySelector('.popup__photos').removeChild(cardPhotoElements[0]);
    for (var i = 0; i < photos.length; i++) {
      var cardPhoto = cardPhotoElement.cloneNode(true);
      cardPhoto.src = photos[i];
      document.querySelector('.popup__photos').appendChild(cardPhoto);
    }
  };

  // добавление списка удобств в шаблон "card"
  var getFeaturesOffer = function (features) {

    var cardFeatureElements = document.querySelectorAll('.popup__features li');

    for (var k = 0; k < cardFeatureElements.length; k++) {
      document.querySelector('.popup__features').removeChild(cardFeatureElements[k]);
    }

    for (var i = 0; i < features.length; i++) {
      var secondElementHTML = document.createElement('li');
      secondElementHTML.className = 'popup__feature ' + 'popup__feature--' + features[i];
      document.querySelector('.popup__features').appendChild(secondElementHTML);
    }
  };

  // создание одной карточки предложения перед блоком "map__filters-container"
  var renderCard = function (advert) {
    var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

    var cardElement = cardTemplate.cloneNode(true);
    var features = advert.offer.features;

    mapFilters.before(cardElement);
    cardElement.querySelector('.popup__title').textContent = advert.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = Placement.fromId(advert.offer.type).name;
    cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = advert.offer.description;
    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;

    getPhotosOffer(advert.offer.photos);
    getFeaturesOffer(features);

    return cardElement;
  };

  // закрытие попапа
  var setCardClickListener = function (listener) {
    var popupClose = document.querySelector('.popup__close');
    if (popupClose) {
      popupClose.addEventListener('click', listener);
    }
  };

  // закрытие попапа по клавише Esc
  var setCardPressListener = function (listener) {
    var popupClose = document.querySelector('.popup__close');
    if (popupClose) {
      popupClose.addEventListener('keydown', listener);
    }
  };

  window.card = {
    renderCard: renderCard,
    setCardClickListener: setCardClickListener,
    setCardPressListener: setCardPressListener
  };

})();
