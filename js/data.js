'use strict';

(function () {
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
    Placement: Placement
  };

})();
