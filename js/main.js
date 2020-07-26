'use strict';

(function () {
  var map = document.querySelector('.map');
  var advertForm = document.querySelector('.ad-form');
  var similarPinsElement = document.querySelector('.map__pins');
  var mainPin = map.querySelector('.map__pin--main');
  var address = advertForm.querySelector('#address');
  var pageEnabled = false;
  var adverts = [];
  var mapFilters = document.querySelector('.map__filters-container');
  var isOpenPopup = false;
  var formElements = document.querySelectorAll('fieldset, select');
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');

  // перевод страницы в активное состояние
  var setPageEnabled = function (enabled) {
    if (enabled) {
      var coordinates = window.map.getPinCoord(mainPin);
      address.value = coordinates;
      map.classList.remove('map--faded');
      formElements.forEach(function (el) {
        el.removeAttribute('disabled');
      });
      advertForm.classList.remove('ad-form--disabled');
      window.backend.load(successHandler, errorHandler);
    } else {
      var defaultCoord = window.map.getDefaultPinCoord(mainPin);
      address.setAttribute('value', defaultCoord);
      map.classList.add('map--faded');
      formElements.forEach(function (el) {
        el.setAttribute('disabled', true);
      });
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
    return adverts.filter(function (advert) {
      return advert.author.avatar === atr;
    })[0];
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

  // // фильтрация
  mapFilters.addEventListener('change', window.debounce(function (evt) {
    updateAdverts();
    var popupBlock = document.querySelector('.map__card');
    if (popupBlock) {
      isOpenPopup = false;
      openClosePopup(evt, isOpenPopup);
    }

  }));
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
    avatarChooser.removeEventListener('change', window.images.onAvatarClick);
    photoChooser.removeEventListener('change', window.images.onPhotoClick);
    window.images.clearPhotosBlock();
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
    var onErrorClick = function (evt) {
      isOpenPopup = false;
      openClosePopup(evt, isOpenPopup);
      errorButton.removeEventListener('click', onErrorClick);
      document.removeEventListener('click', onErrorClick);
    };
    errorButton.addEventListener('click', onErrorClick);
    document.addEventListener('click', onErrorClick);
  };

  var uploadSuccessHandler = function () {
    window.message.showSuccessMsg();
    var onSuccessClick = function (evt) {
      isOpenPopup = false;
      openClosePopup(evt, isOpenPopup);
      document.removeEventListener('click', onSuccessClick);
    };
    document.addEventListener('click', onSuccessClick);
    advertForm.reset();
    pageEnabled = !pageEnabled;
    setPageEnabled(pageEnabled);
    window.map.deletePinsOnMap();
  };

  var successHandler = function (data) {
    adverts = data;
    updateAdverts();
  };

  avatarChooser.addEventListener('change', window.images.onAvatarClick);
  photoChooser.addEventListener('change', window.images.onPhotoClick);

  setPageEnabled();
})();
