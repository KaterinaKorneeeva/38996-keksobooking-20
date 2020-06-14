
'use strict';

var mapPin = document.querySelector('.map__pin--main');


// . содержит класс map--faded;

var testfunc = function () {
  console.log('eeeee');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var address = document.querySelector('#address');

  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  address.textContent = 'test';


};

mapPin.addEventListener('mousedown', logMouseButton);

mapPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    testfunc();
  }
});

function logMouseButton(e) {
  if (typeof e === 'object') {
    switch (e.button) {
      case 0:
        // log.textContent = 'Left button clicked.';
        console.log('left');
        testfunc();
        break;
      case 1:
        console.log('middle');
        break;
      case 2:
        console.log('r');
        break;
      default:
        console.log('error');
    }
  }
}

