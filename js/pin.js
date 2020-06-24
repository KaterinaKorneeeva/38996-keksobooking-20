'use strict';
(function () {

  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // Функция создания DOM элемента c объектами
  var renderPin = function (advert) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = advert.author.avatar;
    pinElement.querySelector('img').alt = advert.offer.title;
    pinElement.style.left = advert.location.x + 'px';
    pinElement.style.top = advert.location.y + 'px';

    return pinElement;
  };

  window.pin = {
    renderPin: renderPin
  };

})();
