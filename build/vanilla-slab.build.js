!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.VanillaSlab=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/****
 * SLABTEXT
 * Heavily modified port of this jQuery plugin to vanilla javascript:
 * https://github.com/freqdec/slabText
****/
var VanillaSlab = {
  init: _dereq_('./init'),
  slabify: _dereq_('./slabify'),
  verifyString: _dereq_('./verify-string'),
  getItemWidth: _dereq_('./get-item-width')
};

module.exports = VanillaSlab;

},{"./get-item-width":2,"./init":3,"./slabify":4,"./verify-string":5}],2:[function(_dereq_,module,exports){
 
var get_item_width = function(item, font_size) {
    var f = font_size || '12px arial';
    var o = document.createElement('div');
    o.style.position = 'absolute';
    o.style.float = 'left';
    o.style.whiteSpace = 'nowrap';
    o.style.visibility = 'hidden';
    o.style.fontSize = f;
    o.innerHTML = item;
    
    document.body.appendChild(o);
    var width = o.offsetWidth;
    document.body.removeChild(o);
    return width;
};

module.exports = get_item_width;

},{}],3:[function(_dereq_,module,exports){
/****
 * Sets up the plugin
 *    Plugin settings
 *    Plugin targets based on headline selector
 *    Words array for each target
 * @param {_options} object
 * @return none
****/
var debounce = _dereq_('../utils/debounce');

function init(_options) {
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

  // Loop through all the targets based on the given selector and create the
  // spans
  var all_targets = document.querySelectorAll(this.settings.selector);
  this.targets = [];

  // Set the original font size based on the computed style.  This will be the
  // same for every instance.
  var original_font_size = parseInt(window.getComputedStyle(all_targets[0], null)
      .getPropertyValue('font-size') || 
      all_targets[0].currentStyle.fontSize, 10);

  for (var i = 0; i < all_targets.length; i++) {
    var target = all_targets[i];
    var words = target.innerHTML.split(' ');

    this.targets.push({
      element: target,
      words: words,
      id: target.textContent,
      lines: ''
    });

    this.slabify(target, words);
    debounce('resize', this.slabify, 300, true, this, [target, words]);
  }

  //this.slabify = require('./slabify');

  
};

module.exports = init;

},{"../utils/debounce":6}],4:[function(_dereq_,module,exports){
var slabify = function(target, words) {
  //var target = this.target;
  var settings = this.settings;
  //var words = this.words;
  console.log(target);
  
  var parent = target.parentNode;
  var parent_width = parent.offsetWidth;  
  var buffer = Math.min( parent_width / settings.buffer);
  
  
  // Set the display style to 'inline' so that we can get a proper width calc
  //target.style.display = 'inline';
  //var target_width = target.offsetWidth;

  // Get font sizes
  var original_font_size = parseInt(window.getComputedStyle(target, null)
      .getPropertyValue('font-size') || 
      target.currentStyle.fontSize, 10);


  // Get the width of each word and then the ratio of each word to the 
  // total width of the target container
  var strings = [];
  
  // Push the spans to the targets object for reference
  for (var t = 0; t < this.targets.length; t++) {
    var targ = this.targets[t];
    for (var id in targ) {
      if (targ[id] === target.textContent) {
        targ.lines = strings;
      }
    }
  }

  var current_string = '';
  var working_string = '';
  var chars_per_line = Math.max(this.settings.minCharsPerLine, Math.floor(parent_width / (original_font_size * settings.fontRatio))) || 20;
  this.chars_per_line = chars_per_line;
  
  for (var w = 0; w < words.length; w++) {
    var last_elem = w === words.length - 1;

    // the working string is current string + the next word in the words array
    working_string = current_string + words[w] + ' ';
    // Verify both the working string and the current string
    var a = this.verifyString(current_string);
    var b = this.verifyString(working_string);
    
    // If neither strings pass, then we need to continue building up the
    // current_string
    if (!a && !b) {
      current_string = working_string;
    }

    // If a does not pass and b does pass, then build up the current string
    else if(!a && b) {
      current_string = working_string;
    }

    // If both a and b pass, build up the working string
    else if (a && b) {
      current_string = working_string;
    }

    // If the current string passes the tests AND the working string does not,
    // then that means the current string is at the optimum length and should be
    // inserted as a span
    else if (a && !b) {
      // Push the current string do the array
      strings.push(current_string.trim());
      // Reset the string
      current_string = '' + words[w] + ' ';
    }
    
    // If we're on the last item of the loop and the working string does not
    // pass, then we need to add in the last word to the last span of the array
    if (last_elem) {
      strings.push(working_string.trim());
    }
    //console.log(working_string + ' :: ' + this.verifyString(working_string));

  }

  // Remove the original content
  target.innerHTML = '';
  
  for (var s = 0; s < strings.length; s++) {
    var string_width = this.getItemWidth(strings[s], original_font_size);
    var ratio = (parent_width - buffer) / string_width ;
    var span = document.createElement('span');
    var word_spacing = strings[s].split(' ').length > 1;

    span.innerHTML = strings[s];
    span.style.fontSize = original_font_size * ratio;
    target.appendChild(span);

    // Check after setting the font
    var diff = parent_width - span.offsetWidth;

    if (diff > 0) {
      if (word_spacing) {
        span.style.wordSpacing = (parent_width - span.offsetWidth) / ( (strings[s].split(' ').length - 1).toPrecision(3) );
      } else {
        span.style.letterSpacing = (parent_width - span.offsetWidth) / ( (span.innerHTML.split('').length).toPrecision(3) );
      }
    }

    span.style.display = 'block';
  }
};

module.exports = slabify;

},{}],5:[function(_dereq_,module,exports){
/****
 * Verifies that a string passes the plugin's defined parameters
 * @param {string} string
 * @return {boolean}
****/
var verifyString = function(string) {
  var string_word_count = string.trim().split(' ').length;
  var string_char_count = string.length;
  
  return string_word_count >= this.settings.minWordsPerLine &&
         string_word_count <= this.settings.maxWordsPerLine &&
         string_char_count <= this.chars_per_line;
};

module.exports = verifyString;

},{}],6:[function(_dereq_,module,exports){
function debounce(listener, func, threshold, raf, context, args) {
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
      func.apply(context, args);
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
      func.apply(context, args);
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