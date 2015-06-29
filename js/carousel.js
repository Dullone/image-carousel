var carousel = (function() {
  var _image_info = [];
  var $_images;
  var _window_width;
  var _current_image = 0;
  var _total_width = 0;

  var _next_auto_flip = null;
  const tick = 5000;

  var init = function() {
    $_images =  $('#images');
    _window_width = $('image-window').width();
    getImageWidths();
    autoFlipImage();
  };

  var getImageWidths = function() {
    var _total_width = 0;
    $_images.children('img').each(storeImageInfo);
  };

  var storeImageInfo = function(index, el){
    var width = $(el).width();
    _image_info.push ({ 
          width: width,
          start: _total_width,
          end: _total_width + width 
        })

    _total_width += width;
    console.log(_total_width + ', no images: ' + _image_info.length);
  }

  var changeImage = function(number) {
    _image_info[number].start
    $('#images').animate({ right: _image_info[number].start }, 600);
  };

  var autoFlipImage = function() {
    if(_next_auto_flip){
      clearTimeout(_next_auto_flip);
    }

    _next_auto_flip = setTimeout(flipImage, tick);
  };

  var flipImage = function() {
    _current_image += 1;
    if(_current_image > _image_info.length - 1) {
      _current_image = 0;
    }

    console.log('flip to: ' + _current_image);
    changeImage(_current_image);
    autoFlipImage();
  };

  return{
    init: init,
    changeImage: changeImage,
  }
})();

$(document).ready(function($) {
  //$('#images').animate({ left: "-400" }, 600, function() {});

  carousel.init();
  //carousel.changeImage(1);
});