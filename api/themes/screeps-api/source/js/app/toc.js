//= require ../lib/_jquery
//= require ../lib/_jquery_ui
//= require ../lib/_jquery.tocify
//= require ../lib/_imagesloaded.min
(function (global) {
  'use strict';

  var closeToc = function() {
    $(".tocify-wrapper").removeClass('open');
    $("#nav-button").removeClass('open');
  };

  let $tocifyFocus;
  let $tocifySubheader;

  $(document).on('click', '.tocify-item', function() {
    if ($tocifyFocus) {
      $tocifyFocus.removeClass('tocify-focus');
    }

    $tocifyFocus = $(this);
    $tocifyFocus.addClass('tocify-focus');

    const _$tocifySubheader = $tocifyFocus.siblings('.tocify-subheader');

    if (!_$tocifySubheader.size()) {
      return;
    }

    if ($tocifySubheader) {
      $tocifySubheader.hide();
    }

    $tocifySubheader = _$tocifySubheader;
    $tocifySubheader.show();
  });

  var makeToc = function() {
    $("#nav-button").click(function() {
      $(".tocify-wrapper").toggleClass('open');
      $("#nav-button").toggleClass('open');
      return false;
    });

    $(".page-wrapper").click(closeToc);
    $(".tocify-item").click(closeToc);
    $('#toc-loading').remove();
  };

  $(function() {
    makeToc();
    setupLanguages($('body').data('languages'));
    $('.content').imagesLoaded( function() {
      global.toc.calculateHeights();
    });
  });
})(window);

