'use strict';
(function () {
  var ANY_VAL = 'any';

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


  var getFilterElement = function () {
    var filterValue = {
      type: mapTypeHouseElement.selectedOptions[0].value,
      price: priceType[mapPriceHousingElement.selectedOptions[0].value],
      rooms: mapHousingRoomsElement.selectedOptions[0].value,
      guests: mapGuestsElement.selectedOptions[0].value,
      features: Array.from(mapFeaturesCheckbox.querySelectorAll(':checked')).map(function (element) {
        return element.value;
      }),
    };
    return filterValue;
  };


  var filtersAdverts = function (adverts) {
    window.map.deletePinsOnMap();

    var filterValue = getFilterElement();
    var filteredAdverts = adverts.filter(function (it) {
      return (
        (filterValue.type === ANY_VAL || it.offer.type === filterValue.type) &&
        (filterValue.price === ANY_VAL || (it.offer.price <= filterValue.price.max && it.offer.price >= filterValue.price.min)) &&
        (filterValue.rooms === ANY_VAL || it.offer.rooms === parseInt(filterValue.rooms, 10)) &&
        (filterValue.guests === ANY_VAL || it.offer.guests === parseInt(filterValue.guests, 10))
         &&
        (filterValue.features === ANY_VAL ||
          filterValue.features.every(function (element) {
            return it.offer.features.indexOf(element) !== -1;
          }))
      );
    });

    return filteredAdverts;

  };

  window.filters = {
    filtersAdverts: filtersAdverts

  };
})();
