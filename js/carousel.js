var carousel = (function() {
  var _image_info = {};
  var $_images;
  var _window_width;
  var _current_image = 1;
  var _total_width = 0;

  var init = function() {
    $_images =  $('#images');
    _window_width = $('image-window').width();
    getImageWidths();
  };

  var getImageWidths = function() {
    var _total_width = 0;
    $_images.children('img').each(storeImageInfo);
  };

  var storeImageInfo = function(index, el){
    var width = $(el).width();
    _image_info[index] = { 
      width: width,
      start: _total_width,
      end: _total_width + width }

    _total_width += width;
    console.log(_total_width);
  }

  var changeImage = function(number) {
    _image_info[number].start
    $('#images').animate({ right: _image_info[number].start }, 600);
  };

  return{
    init: init,
    changeImage: changeImage,
  }
})();

$(document).ready(function($) {
  //$('#images').animate({ left: "-400" }, 600, function() {});

  carousel.init();
  carousel.changeImage(1);
});