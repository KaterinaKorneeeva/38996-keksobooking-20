'use strict';

(function () {

  var map = document.querySelector('.map');
  var advertForm = document.querySelector('.ad-form');
  var similarPinsElement = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var address = advertForm.querySelector('#address');
  var pageEnabled = false;
  var mapFilters = document.querySelector('.map__filters-container');

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
    createCardInfo(adverts[1]);
    similarPinsElement.appendChild(window.map.renderPins(adverts));

  };

  window.load(successHandler, errorHandler);

  // создание одной карточки предложения перед блоком "map__filters-container"
  var createCardInfo = function (advert) {

    var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');

    var cardElement = cardTemplate.cloneNode(true);
    var features = advert.offer.features;

    mapFilters.before(cardElement);
    cardElement.querySelector('.popup__title').textContent = advert.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.Placement.fromId(advert.offer.type).name;
    cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = advert.offer.description;
    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;

    var cardPhotoElements = document.querySelectorAll('.popup__photos > img');
    var cardPhotoElement = map.querySelector('.popup__photos > img');
    var cardFeatureElements = document.querySelectorAll('.popup__features li');

    // добавление изображений в шаблон "card"
    document.querySelector('.popup__photos').removeChild(cardPhotoElements[0]);
    for (var i = 0; i < advert.offer.photos.length; i++) {
      var cardPhoto = cardPhotoElement.cloneNode(true);
      cardPhoto.src = advert.offer.photos[i];
      document.querySelector('.popup__photos').appendChild(cardPhoto);
    }

    // добавление удобств в шаблон "card"
    for (var k = 0; k < cardFeatureElements.length; k++) {
      document.querySelector('.popup__features').removeChild(cardFeatureElements[k]);
    }

    for (var j = 0; j < features.length; j++) {
      var secondElementHTML = document.createElement('li');
      secondElementHTML.className = 'popup__feature ' + 'popup__feature--' + features[j];
      document.querySelector('.popup__features').appendChild(secondElementHTML);
    }
  };

})();
