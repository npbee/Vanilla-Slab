var debounce = require('../utils/debounce');

/****
 * SLABTEXT
 * Heavily modified port of this jQuery plugin to vanilla javascript:
 * https://github.com/freqdec/slabText
****/
var VanillaSlab = {};

VanillaSlab.init = function(_options) {
  var options = _options || {};
  this.settings = {
    selector: options.selector || '.headline',
    maxFontSize: options.maxFontSize || 2000,
    minWordsPerLine: options.minWordsPerLine || 2,
    maxWordsPerLine: options.maxWordsPerLine || 5,
    minCharsPerLine: options.minCharsPerLine || 20,
    buffer: options.buffer || 10,
    fontRatio: options.fontRatio || 0.78
  };

  // Check if the selector given exists on the page
  if (!document.querySelector(this.settings.selector)) {
    throw new Error('Element with class of "' + this.settings.selector + '" not found on page.');
  }

  var all_targets = document.querySelectorAll(this.settings.selector);

  this.targets = [];

  for (var i = 0; i < all_targets.length; i++) {
    var target = all_targets[i];
    this.targets.push({
      element: target,
      words: target.innerHTML.split(' ')
    });

  }
  this.target = target;
    
  //this.slabify();

  //debounce('resize', vanillaSlab.slabify, 300, true, this);
};

module.exports = VanillaSlab;
