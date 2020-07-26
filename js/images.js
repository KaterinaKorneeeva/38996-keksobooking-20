'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhotoBlock = document.querySelector('.ad-form__photo');
  var avatarDefaultSrc = avatarPreview.src;


  var PhotoPreviewPrms = {
    WIDTH: '100%',
    HEIGHT: '100%'
  };

  var loadImage = function (fileChooser, preview) {
    // читаем все выбранные файлы
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    // берем filename и проверям расширение
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      // создаем собственные reader (чтнение файла )
      var reader = new FileReader();
      // как только событие чтения закончится, результат кладем в preview.src закодированый в base64
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var renderPhotoPreview = function () {
    var photoPreview = document.createElement('img');
    photoPreview.style.width = PhotoPreviewPrms.WIDTH;
    photoPreview.style.height = PhotoPreviewPrms.HEIGHT;
    previewPhotoBlock.appendChild(photoPreview);

    return photoPreview;
  };

  var clearPhotosBlock = function () {

    avatarPreview.src = avatarDefaultSrc;
    previewPhotoBlock.innerHTML = '';

    // var adFormPhotoBlock = document.querySelector('.ad-form__photo');
    // var adFormPhotoElements = adFormPhotoBlock.querySelectorAll('img');
    // adFormPhotoElements.forEach(function (photo) {
    //   adFormPhotoBlock.removeChild(photo);
    // });
  };

  var onAvatarClick = function () {
    loadImage(avatarChooser, avatarPreview);
  };

  var onPhotoClick = function () {
    var photoPreview = renderPhotoPreview();
    loadImage(photoChooser, photoPreview);
  };

  window.images = {
    onPhotoClick: onPhotoClick,
    onAvatarClick: onAvatarClick,
    clearPhotosBlock: clearPhotosBlock
  };
})();
