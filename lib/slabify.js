var slabify = function(target, words) {
  //var target = this.target;
  var settings = this.settings;
  //var words = this.words;
  
  var parent = target.parentNode;
  var parent_width = parent.offsetWidth - 
                    (parseInt(window.getComputedStyle(parent, null).getPropertyValue('padding-left'), 10) + 
                     parseInt(window.getComputedStyle(parent, null).getPropertyValue('padding-right'), 10));
  var buffer = Math.min( parent_width / settings.buffer);
  
  console.log(parent_width);
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
    // SOMETHING IS WRONG HERE
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
        span.style.wordSpacing = diff / ( (strings[s].split(' ').length - 1).toPrecision(3) );
      } else {
        span.style.letterSpacing = diff / ( (span.innerHTML.split('').length).toPrecision(3) );
      }
    }

    span.style.display = 'block';
  }
};

module.exports = slabify;
