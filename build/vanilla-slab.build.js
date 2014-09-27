!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.VanillaSlab=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/****
 * SLABTEXT
 * Heavily modified port of this jQuery plugin to vanilla javascript:
 * https://github.com/freqdec/slabText
****/
var VanillaSlab = function() {
  return {
    init: _dereq_('./init'),
    slabify: _dereq_('./slabify'),
    verifyString: _dereq_('./verify-string'),
    getItemWidth: _dereq_('./get-item-width')
  }
};

module.exports = VanillaSlab;

},{"./get-item-width":2,"./init":3,"./slabify":5,"./verify-string":6}],2:[function(_dereq_,module,exports){
 
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
    selector: options.selector || '.js-vanilla-slab',
    maxFontSize: options.maxFontSize || 300,
    minWordsPerLine: options.minWordsPerLine || 2,
    maxWordsPerLine: options.maxWordsPerLine || 5,
    minCharsPerLine: options.minCharsPerLine || 20,
    buffer: options.buffer || 0.95,
    raf: options.raf || true,
    postTweak: options.postTweak === false ? false : true
  };

  // Check if the selector given exists on the page
  if (!document.querySelector(this.settings.selector)) {
    console.log('Element with class of "' + this.settings.selector + '" not found on page.');
    return;
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
  this.original_font_size = original_font_size;

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
    debounce('resize', this.slabify, 300, options.raf, this, [target, words]);
  }

};

module.exports = init;

},{"../utils/debounce":7}],4:[function(_dereq_,module,exports){
function setFont(elm, settings, starting_font_size) {
  
  elm.style.fontSize = starting_font_size;
  elm.style.wordSpacing = 'normal';
  elm.style.letterSpacing = 'normal';
  elm.style.display = 'inline';
  
  var parent_width = elm.parentNode.offsetWidth;
  var elm_width = elm.offsetWidth;
  var ratio = parent_width / elm_width;
  var new_font_size = starting_font_size * ratio * settings.buffer;

  elm.style.fontSize = Math.min(settings.maxFontSize, new_font_size) + 'px';
  
  // Post tweaking
  var word_spacing = elm.textContent.split(' ').length > 1;
  var diff = parent_width - elm.offsetWidth;
  
  if (diff > 0 && settings.postTweak) {
    if (word_spacing) {
      var spacing =  Math.floor((diff / ( (elm.textContent.split(' ').length - 1))) * settings.buffer);
      var rounded_spacing = (Math.round(spacing / 10) * 10);
      elm.style.wordSpacing = spacing;
    } else {
      elm.style.letterSpacing = diff / ( (elm.innerHTML.split('').length).toPrecision(3) );
    }
  }

  setTimeout(function() {
    checkWidth(elm, settings, starting_font_size, parent_width);
  }, 300);

  elm.style.display = 'block';
}

function checkWidth(elm, settings, starting_font_size, parent_width) {
  elm.style.display = 'inline';
  elm.style.whiteSpace = 'nowrap';
  if (elm.offsetWidth > parent_width) {
    setFont(elm, settings, starting_font_size);
  }
  elm.style.display = 'block';
  elm.style.whiteSpace = 'normal';
}

module.exports = setFont;

},{}],5:[function(_dereq_,module,exports){
/****
 * The main jam
 * Takes a target element (headline) and an array of words contained in that
 * headline, and does the following:
 *    - Calculates the parent width, original font size, and ideal characters
 *    per line 
 *    - Uses the words array to build up strings one word at a time until a
 *    string that passes all parameters is attained.
 *    - After the spans are built, calculate the new font size using the
 *    available width and font ratio
 *    - Use a timeout to check to make sure the new font is not wider than the
 *    parent (useful if the calculations were done before a webfont was loaded)
 *    
 * @param {target} Object (DOM elemenet)
 * @param {words} Array
 * @return none
****/
var setFont = _dereq_('./set-font');

var slabify = function(target, words) {
  
  var settings = this.settings;
  var parent = target.parentNode;

  var parent_width = parent.offsetWidth - 
                    (parseInt(window.getComputedStyle(parent, null).getPropertyValue('padding-left'), 10) + 
                     parseInt(window.getComputedStyle(parent, null).getPropertyValue('padding-right'), 10));

  var buffer = Math.min( parent_width / settings.buffer);
  
  // Set the line height on the target element in case any CSS overrides are in
  // place.
  target.style.lineHeight = 1;

  // Create an empty strings array and push the strings to the object for
  // references
  var strings = [];
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
  var chars_per_line = Math.max(this.settings.minCharsPerLine, 
                                Math.floor(parent_width / 
                                          (this.original_font_size * settings.buffer)
                                          )
                                );
  this.chars_per_line = chars_per_line;
  
  // Loop through the words and build up the phrase one word at a time.
  for (var w = 0; w < words.length; w++) {
    var last_elem = w === words.length - 1;

    // the working string is current string + the next word in the words array
    working_string = current_string + words[w] + ' ';
    
    // Verify both the working string and the current string
    var a = this.verifyString(current_string);
    var b = this.verifyString(working_string);
    
    // If neither strings pass, then we need to continue building up the
    // current_string
    if (!last_elem && !a && !b) {
      current_string = working_string;
    }

    // If a does not pass and b does pass, then build up the current string
    else if(!last_elem && !a && b) {
      current_string = working_string;
    }

    // If both a and b pass, build up the working string
    else if (!last_elem && a && b) {
      current_string = working_string;
    }

    // If the current string passes the tests AND the working string does not,
    // then that means the current string is at the optimum length and should be
    // inserted as a span
    else if (!last_elem && a && !b) {
      // Push the current string do the array
      strings.push(current_string.trim());
      // Reset the string and add in the current word
      current_string = '' + words[w] + ' ';
    }
    
    // If we're on the last item of the loop and the working string does not
    // pass, then we need to add in the last word to the last span of the array
    // SOMETHING IS WRONG HERE
    else if (last_elem && a && !b) {
      strings.push(current_string.trim());
      strings.push(words[w]);
    } else {
      strings.push(working_string.trim())
     } 

  }
  
  // Remove the original content
  target.innerHTML = '';
  for (var s = 0; s < strings.length; s++) {
    var span = document.createElement('span');
    span.innerHTML = strings[s];
    target.appendChild(span);
    setFont(span, this.settings, this.original_font_size);
  }

};

module.exports = slabify;

},{"./set-font":4}],6:[function(_dereq_,module,exports){
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

},{}],7:[function(_dereq_,module,exports){
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