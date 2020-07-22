'use strict';

(function () {
  var map = document.querySelector('.map');
  var advertForm = document.querySelector('.ad-form');
  var similarPinsElement = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var address = advertForm.querySelector('#address');
  var pageEnabled = false;
  var adverts = [];
  var mapFilters = document.querySelector('.map__filters-container');
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

    var filteredAdverts = window.filters.filterAdverts(adverts);

    similarPinsElement.appendChild(window.map.renderPins(filteredAdverts));

    window.map.setPinClickListener(function (evt) {
      isOpenPopup = true;
      openClosePopup(evt, isOpenPopup, filteredAdverts);
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
      var successBlock = document.querySelector('.success');
      if (successBlock) {
        successBlock.remove();
      }
      var errorBlock = document.querySelector('.error');
      if (errorBlock) {
        errorBlock.remove();
      }
      onPopupEscPress();
    }
  };

  // фильтрация
  mapFilters.addEventListener('change', window.debounce(updateAdverts));

  // обработчик на Enter
  window.map.setMainPinPressListener(function (evt) {
    window.utils.isEnterEvent(evt, function () {
      pageEnabled = true;
      setPageEnabled(pageEnabled);
    });
  });

  // обработчик на клик
  window.map.setMainPinClickListener(function (evt) {
    window.utils.isMouseDownEvent(evt, function () {
      isOpenPopup = false;
      openClosePopup(evt, isOpenPopup);
      pageEnabled = true;
      setPageEnabled(pageEnabled);
    });
  });

  // обработчик на submit
  window.form.setSubmitClickListener(function (evt) {
    evt.preventDefault();
    window.backend.save(uploadSuccessHandler, errorHandler, new FormData(advertForm));
  });

  document.addEventListener('keydown', function (evt) {
    window.utils.isEscEvent(evt, function () {
      isOpenPopup = false;
      openClosePopup(evt, isOpenPopup);
    });
  });

  var errorHandler = function (errorMessage) {
    window.message.showErrorMsg(errorMessage);

    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', function (evt) {
      isOpenPopup = false;
      openClosePopup(evt, isOpenPopup);
    });

    document.addEventListener('click', function (evt) {
      isOpenPopup = false;
      openClosePopup(evt, isOpenPopup);
    });

  };

  var uploadSuccessHandler = function () {
    window.message.showSuccessMsg();
    document.addEventListener('click', function (evt) {
      isOpenPopup = false;
      openClosePopup(evt, isOpenPopup);
    });

    advertForm.reset();
    pageEnabled = !pageEnabled;
    setPageEnabled(pageEnabled);
    window.map.deletePinsOnMap();
  };

  var successHandler = function (data) {
    adverts = data;
    updateAdverts();
  };

  window.backend.load(successHandler, errorHandler);

})();
