var carousel = (function() {
  var _image_info = [];
  var $_images;
  var _window_width;
  var _current_image = 0;
  var _total_width = 0;

  var _next_auto_flip = null;
  _current_animation = null;
  const tick = 5000;

  var init = function() {
    $_images =  $('#images');
    _window_width = $('image-window').width();
    addImages();
    beginAutoImageFlip();
    registerButtonClick();
    addButtonHighlight(_current_image);
    $('#btn-next').click(nextImage);
    $('#btn-prev').click(prevImage);
  };

  var addImages = function() {
    var _total_width = 0;
    $_images.children('img').each(eachImage);
  };

  var eachImage = function(index, el) {
    storeImageInfo(index, el);
    addButton(index, el);
  };

  var storeImageInfo = function(index, el){
    var width = $(el).width();
    _image_info.push ({ 
          width: width,
          start: _total_width,
          end: _total_width + width 
        })

    _total_width += width;
  }

  var registerButtonClick = function() {
    $('#image-buttons a').click(function(event) {
      image = Number($(this).text()) - 1;
      changeImage(image);
    });
  }

  var changeImage = function(number) {
    if(_current_animation) {
      _current_animation.stop();
    }

    _current_animation = $('#images').animate({ right: _image_info[number].start 
                          }, 600, finishFlipAnimation);
    _current_image = number;
    beginAutoImageFlip();
  };

  var finishFlipAnimation = function() {
    addButtonHighlight(_current_image);
  }

  var addButtonHighlight = function(number) {
    var $images = $('#image-buttons').children('a')
    $images.removeClass('border');
    $images.eq(number).addClass('border');
  }

  var beginAutoImageFlip = function() {
    if(_next_auto_flip){
      clearTimeout(_next_auto_flip);
    }

    _next_auto_flip = setTimeout(flipImage, tick);
  };

  var flipImage = function(direction) {
    direction = direction || 1;
    _current_image += direction;
    if(_current_image > _image_info.length - 1) {
      _current_image = 0;
    }
    if(_current_image < 0) {
      _current_image = _image_info.length -1;
    }

    changeImage(_current_image);
    beginAutoImageFlip();
  };

  var nextImage = function() {
    flipImage(1);
  };

  var prevImage = function() {
    flipImage(-1);
  };

  var addButton = function(index, el) {
    $('#image-buttons').append('<a class="btn" href="#">' + (index + 1) + '</a>');
  }

  return{
    init: init,
  }
})();

$(document).ready(function($) {
  carousel.init();
});