'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

  // добавление изображений в шаблон "card"
  var renderOfferPhotos = function (card, photos) {
    var cardPhotoElements = card.querySelectorAll('.popup__photos > img');
    var cardPhotoElement = card.querySelector('.popup__photos > img');
    var cardPhotoBlock = document.querySelector('.popup__photos');

    cardPhotoBlock.removeChild(cardPhotoElements[0]);
    for (var i = 0; i < photos.length; i++) {
      var cardPhoto = cardPhotoElement.cloneNode(true);
      cardPhoto.src = photos[i];
      cardPhotoBlock.appendChild(cardPhoto);
    }
  };

  // добавление списка удобств в шаблон "card"
  var renderFeaturesOffer = function (card, features) {
    var cardFeatureElements = card.querySelectorAll('.popup__features li');

    for (var i = 0; i < cardFeatureElements.length; i++) {
      document.querySelector('.popup__features').removeChild(cardFeatureElements[i]);
    }

    for (i = 0; i < features.length; i++) {
      var secondElementHTML = document.createElement('li');
      secondElementHTML.className = 'popup__feature ' + 'popup__feature--' + features[i];
      document.querySelector('.popup__features').appendChild(secondElementHTML);
    }
  };

  // создание одной карточки предложения перед блоком "map__filters-container"
  var renderCard = function (advert) {

    var cardElement = cardTemplate.cloneNode(true);
    var features = advert.offer.features;

    cardElement.querySelector('.popup__title').textContent = advert.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.Placement.fromId(advert.offer.type).name;
    cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = advert.offer.description;
    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;

    mapFilters.before(cardElement);
    renderOfferPhotos(cardElement, advert.offer.photos);
    renderFeaturesOffer(cardElement, features);

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
