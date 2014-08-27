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
var setFont = require('./set-font');

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
