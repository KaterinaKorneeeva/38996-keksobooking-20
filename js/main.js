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
      window.map.closePopupCard();
      pageEnabled = true;
      setPageEnabled(pageEnabled);
    });
  });

  window.map.setMainPinClickListener(function (evt) {
    window.utils.isMouseDownEvent(evt, function () {
      window.map.closePopupCard();
      pageEnabled = true;
      setPageEnabled(pageEnabled);
    });
  });

  window.form.setSubmitClickListener(function (evt) {
    evt.preventDefault();
    pageEnabled = !pageEnabled;
    setPageEnabled(pageEnabled);
    window.map.deletePinsOnMap();
  });

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
  };

  var openCard = function (evt) {
    if (evt.target.alt !== 'Метка объявления' && evt.target.tagName === 'IMG' || evt.target.className === 'map__pin') {

      var selectedPin = evt.target;
      if (evt.target.className === 'map__pin') {
        selectedPin = evt.target.children[0];
      }

      window.map.closePopupCard();
      var srcImgAuthor = selectedPin.attributes[0].textContent;
      var test = getInfoByCard(srcImgAuthor);
      window.card.renderCard(adverts[test]);

      window.card.setCardClickListener(function (evt) {
        window.utils.isMouseDownEvent(evt, function () {
          window.map.closePopupCard();
        });
      });

      window.card.setCardPressListener(function (evt) {
        window.utils.isEscEvent(evt, function () {
          window.map.closePopupCard();
        });
      });

    }
  };

  map.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, function () {
      openCard(evt);
    });
  });

  map.addEventListener('click', function (evt) {
    openCard(evt);
  });

  var getInfoByCard = function (atr) {
    for (var i = 0; i < adverts.length; i++) {
      if (adverts[i].author.avatar === atr) {
        var index = i;
      }
    }
    return index;
  };

  // фильтр по типу жилья
  mapTypeHouseElement.addEventListener('change', function (evt) {
    var newType = evt.target.value;
    typeOfHouse = newType;
    updateAdverts();
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
