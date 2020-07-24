'use strict';

(function () {
  var ANY_VAL = 'any';
  var MAX_ADVERTS_COUNT = 5;

  var priceType = {
    any: ANY_VAL,
    middle: {
      min: 10000,
      max: 50000,
    },
    low: {
      min: 0,
      max: 10000,
    },
    high: {
      min: 50000,
      max: Infinity,
    },
    fromId: function (id) {
      return this[id];
    }
  };

  var mapTypeHouseElement = document.querySelector('#housing-type');
  var mapHousingRoomsElement = document.querySelector('#housing-rooms');
  var mapGuestsElement = document.querySelector('#housing-guests');
  var mapPriceHousingElement = document.querySelector('#housing-price');
  var mapFeaturesCheckbox = document.querySelector('#housing-features');

  var filterType = function (advert) {
    var selectedType = mapTypeHouseElement.selectedOptions[0].value;
    return selectedType === ANY_VAL || advert.offer.type === selectedType;
  };

  var filterPrice = function (advert) {
    var selectedPrice = priceType[mapPriceHousingElement.selectedOptions[0].value];
    return selectedPrice === ANY_VAL || advert.offer.price <= selectedPrice.max && advert.offer.price >= selectedPrice.min;
  };

  var filterRooms = function (advert) {
    var selectedRooms = mapHousingRoomsElement.selectedOptions[0].value;
    return selectedRooms === ANY_VAL || advert.offer.rooms === parseInt(selectedRooms, 10);
  };

  var filterGuests = function (advert) {
    var selectedGuests = mapGuestsElement.selectedOptions[0].value;
    return selectedGuests === ANY_VAL || advert.offer.guests === parseInt(selectedGuests, 10);
  };

  var filterFeatures = function (advert) {
    var selectedFeatures = Array.from(mapFeaturesCheckbox.querySelectorAll(':checked')).map(function (element) {
      return element.value;
    });
    return selectedFeatures.every(function (element) {
      return advert.offer.features.indexOf(element) !== -1;
    });
  };

  var filtersFunctions = [filterType, filterPrice, filterRooms, filterGuests, filterFeatures];

  var isSuitableAdvert = function (advert) {
    return filtersFunctions.every(function (filter) {
      return filter(advert);
    });
  };

  var filterAdverts = function (adverts) {
    var filteredAdverts = [];
    for (var i = 0; i < adverts.length && filteredAdverts.length < MAX_ADVERTS_COUNT; i++) {
      if (isSuitableAdvert(adverts[i])) {
        filteredAdverts.push(adverts[i]);
      }
    }
    return filteredAdverts;
  };

  window.filters = {
    filterAdverts: filterAdverts
  };
})();
