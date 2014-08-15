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

  // Get font sizes
  var original_font_size = parseInt(window.getComputedStyle(target, null)
      .getPropertyValue('font-size') || 
      target.currentStyle.fontSize, 10);


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
    var word_spacing = strings[s].split(' ').length > 1;
    
    span.innerHTML = strings[s];
    target.appendChild(span);

    setFont(span, this.settings);

  }

  function setFont(elm, settings) {
    var elm_width = elm.offsetWidth;
    var ratio = (parent_width / elm_width) * settings.fontRatio;
    var word_spacing = strings[s].split(' ').length > 1;
    elm.style.fontSize = Math.min(settings.maxFontSize, (original_font_size * ratio).toPrecision(3));

    var diff = parent_width - span.offsetWidth;
    if (diff > 0) {
      if (word_spacing) {
        span.style.wordSpacing = diff / ( (strings[s].split(' ').length - 1).toPrecision(3) );
      } else {
        span.style.letterSpacing = diff / ( (span.innerHTML.split('').length).toPrecision(3) );
      }
    }
    elm.style.display = 'block';
  }
  
};

module.exports = slabify;
