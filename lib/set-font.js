function setFont(elm, settings, starting_font_size) {
  elm.style.fontSize = starting_font_size
  elm.style.wordSpacing = 1;
  elm.style.letterSpacing = 1;
  
  var parent_width = elm.parentNode.offsetWidth;
  var elm_width = elm.offsetWidth;
  var ratio = (parent_width / elm_width) * settings.fontRatio;
  var word_spacing = elm.textContent.split(' ').length > 1;

  elm.style.fontSize = Math.round(Math.min(settings.maxFontSize, (starting_font_size * ratio).toPrecision(3)));

  elm.style.display = 'inline';
  var diff = parent_width - elm.offsetWidth;
  if (diff > 0) {
    if (word_spacing) {
      var spacing =  Math.floor((diff / ( (elm.textContent.split(' ').length - 1))) * settings.fontRatio);
      var rounded_spacing = (Math.round(spacing / 10) * 10);
      elm.style.wordSpacing = spacing;
    } else {
      elm.style.letterSpacing = diff / ( (elm.innerHTML.split('').length).toPrecision(3) );
    }
  }

  setTimeout(function() {
    checkWidth(elm, settings);
  }, 400);

  elm.style.display = 'block';
}

function checkWidth(elm, settings) {
  elm.style.display = 'inline';
  elm.style.whiteSpace = 'nowrap';
  if (elm.offsetWidth > elm.parentNode.offsetWidth) {
    setFont(elm, settings);
  }
  elm.style.display = 'block';
  elm.style.whiteSpace = 'normal';
}

module.exports = setFont;