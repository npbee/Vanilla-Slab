!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.vanillaSlab=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/****
 * SLABTEXT
 * Heavily modified port of this jQuery plugin to vanilla javascript:
 * https://github.com/freqdec/slabText
****/

var debounce = _dereq_('./utils/debounce');

function vanillaSlab(options) {

  var settings = {
    selector: options.selector || '.headline',
    maxFontSize: options.maxFontSize || 2000,
    minWordsPerLine: options.minWordsPerLine || 2,
    maxWordsPerLine: options.maxWordsPerLine || 5,
    buffer: options.buffer || 10,
    fontRatio: options.fontRatio || 0.78
  };

  // Check if the selector given exists on the page
  if (!document.querySelector(settings.selector)) {
    throw new Error('Element with class of "' + settings.selector + '" not found on page.');
  }

  var target = document.querySelector(settings.selector);
  var words;

  // We only need to run this function once
  (function get_word_count() {
    words = target.innerHTML.split(' ');
  })();

  function get_item_width(item, font_size) {
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
  }

  // The main jam
  function slabify() {
     var parent = target.parentNode;
     var parent_width = parent.offsetWidth;  
     var buffer = Math.min( parent_width / settings.buffer);
     
     // Set the display style to 'inline' so that we can get a proper width calc
     target.style.display = 'inline';
     var target_width = target.offsetWidth;

     // Get font sizes
     var original_font_size = parseInt(window.getComputedStyle(target, null)
                                              .getPropertyValue('font-size') || 
                                              target.currentStyle.fontSize, 10);
     
     // Get the width of each word and then the ratio of each word to the 
     // total width of the target container
     var strings = [];
     var string = '';
     var chars_per_line = Math.min(60, Math.floor(parent_width / (original_font_size * settings.fontRatio)));
     console.log("chars per line: ", chars_per_line);

     for (var w = 0; w < words.length; w++) {
       var string_word_count = string.split(' ').length;
       var last_elem = w === words.length - 1;


       // Test if the string is greater than the max allowed words per line
       if (!last_elem && string_word_count > settings.maxWordsPerLine) {
         strings.push(string);
         string = '' + words[w] + ' ';
       } else if (string_word_count > settings.maxWordsPerLine) {
         string += words[w];
         strings.push(string);
       }

       else {
         // First test if the string is greater than the minimum number of words
         // per line based on the settings.  If not, add the word to the string.
         if (!last_elem && string_word_count <= settings.minWordsPerLine) {
           string += words[w] + ' ';
         } 

         // Last element of the loop and string is less than min words per line
         // Add the current string and current word to the last element of the
         // strings array
         else if (last_elem && string_word_count <= settings.minWordsPerLine) {
           strings[strings.length - 1] += (string + words[w]);
         }
         else {

           // If we're not on the last elment of the array, then check if the 
           // string is less than the chars per line.  If not,
           // push the string to the strings array.
           if (!last_elem && string.length <= chars_per_line) {
             string += words[w] + ' ';
           } 

           // Last element of array and current string is greater than chars per
           // line
           else if (last_elem && string.length > chars_per_line){
             // push the current string
             strings.push(string);

             // reset the string and append the current word
             string = '' + words[w] + ' ';

             // Since it's the last word, push it to the strings array
             strings.push(string);
           } 

           // Last element and current string is less than chars per line
           else if (last_elem && string.length <= chars_per_line) {
             // Append the string to the word
             string += words[w];
             strings.push(string);
           } 

           // We're not on the last element of the loop and string length is
           // greater than the chars per line
           else {
             // Push the current string
             strings.push(string);

             // Reset the string
             string = '';

             // Add the current word to the string
             string += words[w] + ' ';
           }
         }
       }
       
     }
     
     // Remove the original content
     target.innerHTML = '';
     

     for (var s = 0; s < strings.length; s++) {
       console.log(strings[s], 'length: ' + strings[s].length);
       
       var string_width = get_item_width(strings[s], original_font_size);
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
     }

      
  }
   
  slabify();  
  debounce('resize', slabify, 300 );

}


module.exports = vanillaSlab;




},{"./utils/debounce":2}],2:[function(_dereq_,module,exports){
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


},{}]},{},[1])
(1)
});