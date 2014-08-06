/****
 * SLABTEXT
 * Heavily modified port of this jQuery plugin to vanilla javascript:
 * https://github.com/freqdec/slabText
****/

var debounce = require('./utils/debounce');

function vanillaSlab(options) {
  var settings = {
    selector: options.selector || '.headline',
    maxFontSize: options.maxFontSize || 2000,
    minWordsPerLine: options.minWordsPerLine || 5,
    buffer: options.buffer || 10
  };

   if (!document.querySelector(settings.selector)) {
     throw new Error("Element with class of '" + settings.selector + "' not found on page.");
     return;
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
     //var chars_per_line = Math.min(60, Math.floor(parent_width / (original_font_size * .78)));
     var chars_per_line = 10;

     for (var w = 0; w < words.length; w++) {
       //var new_word_width = get_item_width(words[w], original_font_size * ratio) + get_item_width(' ', original_font_size * ratio);
       
       //string_width += new_word_width;
       if ((string.length <= chars_per_line) && w < words.length - 1) {
         string += words[w] + ' ';
       } else if ((string.length > chars_per_line) && (w === words.length - 1)) {
         strings.push(string);
         string = '' + words[w];
         strings.push(string);
       } else if ((string.length <= chars_per_line) && (w === words.length - 1)) {
         string += words[w];
         strings.push(string);
       } else {
         strings.push(string);
         string = '';
         string += words[w] + ' ';
       }
     }
     // Remove the original content
     target.innerHTML = '';
     
         
     for (var s = 0; s < strings.length; s++) {
       var string_width = get_item_width(strings[s], original_font_size);
       var ratio = (parent_width - buffer) / string_width ;
       var span = document.createElement('span');
       var word_spacing = strings[s].split(" ").length > 1;

       span.innerHTML = strings[s];
       span.style.fontSize = original_font_size * ratio;
       target.appendChild(span);

       // Check after setting the font
       var diff = parent_width - span.offsetWidth > 0 ? true : false;

       //if (diff) {
         //if (word_spacing) {
           //span.style.wordSpacing = (parent_width - span.offsetWidth) / ( (strings[s].split(" ").length - 1).toPrecision(3) );
         //} else {
           //span.style.letterSpacing = (parent_width - span.offsetWidth) / ( (span.innerHTML.split("").length).toPrecision(3) );
         //}
       //}
     }

      
  };
   
  slabify();  
  debounce('resize', slabify, 300 );


}

var slabText = {

  init: function() {
    var selector = document.querySelector('.headline');
    var max = 2000;

    if ( selector ) {
      this.slabtext(selector, max);
    }
  },

  slabtext: function(selector, max) {

    // Define the slab text function
    function slabify() {

      var parent = selector.parentNode,
                   parent_width,
                   headline_width,
                   original_font_size,
                   ratio,
                   new_font_size,
                   buffer;

      // Set the selector back to display inline so we can get a proper width
      selector.style.display = 'inline';
      //selector.style.whiteSpace = 'nowrap';

      // Get the width and padding of the parent,
      // then convert to integers
      parent_width = parent.clientWidth;
      buffer = Math.min( parent_width / 20 );

      // Get the width of the headline
      headline_width = selector.offsetWidth;

      // Get font sizes
      original_font_size = parseInt(window.getComputedStyle(selector, null).getPropertyValue('font-size') || selector.currentStyle.fontSize, 10);

      // Compute ratio
      // A little extra buffer on the sides for good measure
      ratio = ( parent_width - buffer ) / headline_width;

      // New font size
      new_font_size = Math.min(original_font_size * ratio).toPrecision(3);

      // Set the new font size based on the ratio
      selector.style.fontSize = new_font_size > max ? max + 'px' : new_font_size + 'px';

      // Set the selector back to display block so we can center it
      selector.style.display = 'block';

    }


    // Use debounce util to run the slabify function on resize
    debounce('resize', slabify, 300 );

    // We only need to run this function on page load, not on resize
    var firstWordLength = (function() {

      // Get the words in the headline
      var word_count = selector.innerHTML.split(' '),
        first_word = word_count[0];

    // If the first word is less than 4 characters
    // Set the white space to no wrap ( mostly a fix for "S. Carey" )
    // Because it always breaks it up into two lines
    if ( first_word.length <= 5 && word_count.length <= 2 ) {
      selector.style.whiteSpace = 'nowrap';
    }
    })();

    // Run on first load
    slabify();

  }

};

module.exports = vanillaSlab;



