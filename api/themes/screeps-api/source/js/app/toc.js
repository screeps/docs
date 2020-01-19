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

  $(document).on('click', '.tocify-item', onFocus);
  window.addEventListener('scroll', onScroll);

  let ignoreScroll;
  let $tocifyFocus;
  let $tocifySubheader;

  function onFocus() {
    ignoreScroll = true;

    if ($tocifyFocus) {
      $tocifyFocus.removeClass('tocify-focus');
    }

    $tocifyFocus = $(this);
    $tocifyFocus.addClass('tocify-focus');

    let _$tocifySubheader = $(this.parentElement);
    if (this.parentElement.classList.contains('tocify-subheader')) {
      if (_$tocifySubheader !== $tocifySubheader) {
        if ($tocifySubheader) {
          $tocifySubheader.hide();
        }
    
        $tocifySubheader = _$tocifySubheader;
        $tocifySubheader.show();

        console.log('here');

        return;
      }
    }

    _$tocifySubheader = $tocifyFocus.siblings('.tocify-subheader');

    if (!_$tocifySubheader.size()) {
      return;
    }

    if ($tocifySubheader) {
      $tocifySubheader.hide();
    }

    $tocifySubheader = _$tocifySubheader;
    $tocifySubheader.show();
  }

  function onScroll(){
    if (ignoreScroll) {
      ignoreScroll = false;
      return;
    }

    var scrollTop = $(document).scrollTop();

    const items = $('.tocify-item a').toArray();

    for (var i in items) {
      var linkRef = items[i];

      var elementId = linkRef.getAttribute('href').substr(1);
      var elementRef = document.getElementById(elementId);
      var $elementRef = $(elementRef);

      var elementTop = $elementRef.position().top;

      var nextElementRef;
      var $nextElementRef;

      for (var j = 0; j < 1000; j++) {
        if (!elementRef.nextElementSibling) {
          break;
        }

        if (elementRef.nextElementSibling.tagName.toLowerCase() === 'h1' ||
            elementRef.nextElementSibling.tagName.toLowerCase() === 'h2'
        ) {
          nextElementRef = elementRef.nextElementSibling;
          $nextElementRef = $(nextElementRef);

          break;
        }

        elementRef = elementRef.nextElementSibling;
      }

      if (!nextElementRef) {
        break;
      }

      var elementBottom = $nextElementRef.position().top;

      if (elementTop <= scrollTop && elementBottom > scrollTop) {
        onFocus.apply(linkRef.parentElement);

        history.replaceState(undefined, undefined, `#${ elementId }`);
        break;
      }
    }
  }

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

