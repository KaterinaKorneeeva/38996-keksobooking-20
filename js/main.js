'use strict';

(function () {

  var map = document.querySelector('.map');
  var advertForm = document.querySelector('.ad-form');
  var similarPinsElement = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var address = advertForm.querySelector('#address');
  var pageEnabled = false;
  var adverts = [];
  var typeOfHouse = 'any';
  var mapTypeHouseElement = document.querySelector('#housing-type');
  var isOpenPopup = false;

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

  var updateAdverts = function () {
    window.map.deletePinsOnMap();

    // фильтрация по типу жилья
    var sameTypeOfHouseAdverts = adverts.filter(function (it) {
      return it.offer.type === typeOfHouse;
    });

    // отфильтрованные объявления + все объявления
    var filteredAdverts = sameTypeOfHouseAdverts.concat(adverts);

    // уникальные объявления
    var uniqueAdverts =
    filteredAdverts.filter(function (it, i) {
      return filteredAdverts.indexOf(it) === i;
    });

    similarPinsElement.appendChild(window.map.renderPins(uniqueAdverts));

    window.map.setPinClickListener(function (evt) {
      isOpenPopup = true;
      openClosePopup(evt, isOpenPopup, uniqueAdverts);
    });

  };

  var onPopupClick = function () {
    window.card.setCardClickListener(function (evt) {
      window.utils.isMouseDownEvent(evt, function () {
        openClosePopup(evt, !isOpenPopup);
      });
    });
  };

  // обработчик на ESCAPE
  var onPopupEscPress = function () {
    document.removeEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, function () {
        openClosePopup(evt, !isOpenPopup);
      });
    });
  };

  var getInfoByCard = function (atr) {
    for (var i = 0; i < adverts.length; i++) {
      if (adverts[i].author.avatar === atr) {
        var advert = adverts[i];
      }
    }
    return advert;
  };

  // показать попап
  var openClosePopup = function (evt, popup) {
    if (popup) {
      var selectedPin = evt.target;
      if (evt.target.className === 'map__pin') {
        selectedPin = evt.target.children[0];
      }
      openClosePopup(!isOpenPopup);
      var srcImgAuthor = selectedPin.attributes[0].textContent;
      var advert = getInfoByCard(srcImgAuthor);
      window.card.renderCard(advert);

      onPopupClick();
      onPopupEscPress();
    } else {
      var popupBlock = document.querySelector('.map__card');
      if (popupBlock) {
        popupBlock.remove();
      }

      onPopupEscPress();
    }
  };

  // фильтр по типу жилья
  mapTypeHouseElement.addEventListener('change', function (evt) {
    var newType = evt.target.value;
    typeOfHouse = newType;
    updateAdverts();
  });

  // обработчик на Enter
  window.map.setMainPinPressListener(function (evt) {
    window.utils.isEnterEvent(evt, function () {
      pageEnabled = true;
      setPageEnabled(pageEnabled);
    });
  });

  // обработчик на клика
  window.map.setMainPinClickListener(function (evt) {
    window.utils.isMouseDownEvent(evt, function () {
      openClosePopup(evt, !isOpenPopup);
      pageEnabled = true;
      setPageEnabled(pageEnabled);
    });
  });

  // обработчик на submit
  window.form.setSubmitClickListener(function (evt) {
    evt.preventDefault();
    pageEnabled = !pageEnabled;
    setPageEnabled(pageEnabled);
    window.map.deletePinsOnMap();
  });

  document.addEventListener('keydown', function (evt) {
    window.utils.isEscEvent(evt, function () {
      openClosePopup(evt, !isOpenPopup);
    });
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

  var successHandler = function (data) {
    adverts = data;
    updateAdverts();
  };

  window.load(successHandler, errorHandler);

})();
