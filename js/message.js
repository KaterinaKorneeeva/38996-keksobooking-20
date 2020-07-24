'use strict';

(function () {
  var successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var showSuccessMsg = function () {
    var successElement = successMessageTemplate.cloneNode(true);
    document.body.appendChild(successElement);
  };

  var showErrorMsg = function (errorMessage) {
    var errorElement = errorMessageTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = errorMessage;
    document.body.appendChild(errorElement);
  };

  window.message = {
    showSuccessMsg: showSuccessMsg,
    showErrorMsg: showErrorMsg
  };

})();
