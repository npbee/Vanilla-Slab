//var debounce = require('../utils/debounce');
//var slabify = require('./slabify');

/****
 * SLABTEXT
 * Heavily modified port of this jQuery plugin to vanilla javascript:
 * https://github.com/freqdec/slabText
****/
function VanillaSlab() {

  function init(_options) {
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

    this.targets = [];
  
    var all_targets = document.querySelectorAll(this.settings.selector);
    for (var i = 0; i < all_targets.length; i++) {
      var target = all_targets[i];
      var words = target.innerHTML.split(' ');

      this.targets.push({
        element: target,
        words: words
      });
    }
    
    //this.slabify();

    //debounce('resize', vanillaSlab.slabify, 300, true, this);
  }

  return {
    init: init
  }
}

//vanillaSlab.init = function(_options) {
  //var options = _options || {};
  //this.settings = {
    //selector: options.selector || '.headline',
    //maxFontSize: options.maxFontSize || 2000,
    //minWordsPerLine: options.minWordsPerLine || 2,
    //maxWordsPerLine: options.maxWordsPerLine || 5,
    //minCharsPerLine: options.minCharsPerLine || 20,
    //buffer: options.buffer || 10,
    //fontRatio: options.fontRatio || 0.78
  //};

  //// Check if the selector given exists on the page
  //if (!document.querySelector(this.settings.selector)) {
    //throw new Error('Element with class of "' + this.settings.selector + '" not found on page.');
  //}

  //var targets = document.querySelectorAll(this.settings.selector);

  //for (var i = 0; i < targets.length; i++) {

  //}
  //this.target = target;
  
  //var words;

  //// We only need to run this function once
  //(function get_word_count() {
    //words = target.innerHTML.split(' ');
  //})();

  //// Assign words to object
  //this.words = words;
  
  ////this.slabify();

  ////debounce('resize', vanillaSlab.slabify, 300, true, this);
/*};*/

module.exports = new VanillaSlab;
