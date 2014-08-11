!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.VanillaSlab=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var debounce = _dereq_('../utils/debounce');

/****
 * SLABTEXT
 * Heavily modified port of this jQuery plugin to vanilla javascript:
 * https://github.com/freqdec/slabText
****/
var VanillaSlab = {};

VanillaSlab.init = function(_options) {
  var options = _options || {};
  this.settings = {
    selector: options.selector || '.headline',
    maxFontSize: options.maxFontSize || 2000,
    minWordsPerLine: options.minWordsPerLine || 2,
    maxWordsPerLine: options.maxWordsPerLine || 5,
    minCharsPerLine: options.minCharsPerLine || 20,
    buffer: options.buffer || 10,
    fontRatio: options.fontRatio || 0.78
  };

  // Check if the selector given exists on the page
  if (!document.querySelector(this.settings.selector)) {
    throw new Error('Element with class of "' + this.settings.selector + '" not found on page.');
  }

  var all_targets = document.querySelectorAll(this.settings.selector);

  this.targets = [];

  for (var i = 0; i < all_targets.length; i++) {
    var target = all_targets[i];
    this.targets.push({
      element: target,
      words: target.innerHTML.split(' ')
    });
  }
  this.target = target;
    
  //this.slabify();

  //debounce('resize', vanillaSlab.slabify, 300, true, this);
};

module.exports = VanillaSlab;

},{"../utils/debounce":2}],2:[function(_dereq_,module,exports){
function debounce(listener, func, threshold, raf, context) {
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
      func.apply(context);
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
      func.apply(context);
    }
  }

  // Give the option to use request animation frame
  if ( raf ) {
    return rafDebounce();
  } else {
    return otherDebounce();
  }


}

module.exports = debounce;


},{}]},{},[1])
(1)
});