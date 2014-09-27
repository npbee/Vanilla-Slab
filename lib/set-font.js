function setFont(elm, settings, starting_font_size) {
  
  elm.style.fontSize = starting_font_size;
  elm.style.wordSpacing = 'normal';
  elm.style.letterSpacing = 'normal';
  elm.style.display = 'inline';
  
  var elm_parent = elm.parentNode;
  elm_parent.style.float = 'none';

  var parent_width = elm_parent.offsetWidth;
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

  if (settings.postCheck) {
    setTimeout(function() {
      checkWidth(elm, settings, starting_font_size, parent_width);
    }, 300);
  }

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
