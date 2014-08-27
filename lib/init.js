/****
 * Sets up the plugin
 *    Plugin settings
 *    Plugin targets based on headline selector
 *    Words array for each target
 * @param {_options} object
 * @return none
****/
var debounce = require('../utils/debounce');

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
