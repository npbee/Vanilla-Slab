function setFont(elm, settings, starting_font_size) {
  console.log(
      "parent width: " + elm.parentNode.offsetWidth,
      "element width: " + elm.offsetWidth,
      "starting font size: " + starting_font_size
  );
  
  elm.style.fontSize = starting_font_size;
  elm.style.wordSpacing = 'normal';
  elm.style.letterSpacing = 'normal';
  elm.style.display = 'inline';
  
  var parent_width = elm.parentNode.offsetWidth;
  var elm_width = elm.offsetWidth;
  
  var ratio = parent_width / elm_width;

  var word_spacing = elm.textContent.split(' ').length > 1;
  var new_font_size = starting_font_size * ratio * settings.fontRatio;

  elm.style.fontSize = Math.min(settings.maxFontSize, new_font_size);
  
  // Post tweaking
  var diff = parent_width - elm.offsetWidth;
  
  if (diff > 0 && settings.postTweak) {
    if (word_spacing) {
      var spacing =  Math.floor((diff / ( (elm.textContent.split(' ').length - 1))) * settings.fontRatio);
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
