$(function() {
  var $path = $('#path'),
    $text = $('#text'),
    $textConfig = $('#textConfig'),
    $imageDemo = $('#imageDemo'),
    $withWatermark = $('#withWatermark'),
    obj = {};
  
  $text.on('input', function() {
    if ($.trim($text.val()) !== '') {
      $path.prop('disabled', true);
      $textConfig.slideDown();
    } else {
      $path.prop('disabled', false);
      $textConfig.slideUp();
    }
  });

  $('#watermarkConfig')
    .on('submit', function(e) {
      e.preventDefault();
      obj = {};
      $.each($(this).serializeArray(), function(i, v) {
        var val = v.value;
        if (/^(textWidth|textSize|opacity|margin|outputWidth|outputHeight)$/.test(v.name) && val !== 'auto') {
          val = parseFloat(val);
        }
        obj[v.name] = val;
      });
      watermarkCreate();
    })
    .on('reset', function() {
      $path.prop('disabled', false);
      $textConfig.slideUp();
    });

  function watermarkCreate() {
    var config = $.extend(
      {},
      {
        path: 'take_action/TakeAction_Alabama.png',

        text: '',
        textWidth: 130,
        textSize: 13,
        textColor: 'white',
        textBg: 'rgba(0, 0, 0, 0.4)',

        gravity: 's', // nw | n | ne | w | e | sw | s | se | c
        opacity: 1.0,
        margin: 47,

        outputWidth: 'auto',
        outputHeight: 'auto',
        outputType: 'png', // jpeg | png | webm

        done: function(imgURL) {
          $withWatermark.html('<img id="imageDemo" src="' + imgURL + '">');
        },
        fail: function(imgURL) {
          $withWatermark.html('<span style="color: red;">Error: ' + imgURL + '</span>');
        },
      },
      obj
    );
    $('<img>', {
      src: 'invite/InviteYourFriends_0Days.png',
    }).watermark(config);
  }

  watermarkCreate();
});
