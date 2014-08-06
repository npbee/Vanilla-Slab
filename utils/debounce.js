function debounce(listener, func, threshold, raf) {

  // With request animation frame
  // Per http://www.html5rocks.com/en/tutorials/speed/animations/
  function rafDebounce() {

    var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
    var ticking = false;

    window.addEventListener(listener, function() {
      requestTick();
    });

    function requestTick() {
      if ( !ticking ) {
        requestAnimationFrame( update );
      }
      ticking = true;
    }

    function update() {
      ticking = false;
      func();
    }

  }


  // Without request animation frame
  function otherDebounce() {
    var timeout;

    window.addEventListener(listener, function() {

      if ( timeout ) {
        clearTimeout( timeout );
      }

      timeout = setTimeout( debounced, threshold || 300 );

    }, false);

    function debounced() {
      func();
    }
  }

  // Give the option to use request animation frame
  if ( raf ) {
    rafDebounce();
  } else {
    otherDebounce();
  }


}

module.exports = debounce;

