/****
 * SLABTEXT
 * Heavily modified port of this jQuery plugin to vanilla javascript:
 * https://github.com/freqdec/slabText
****/
var VanillaSlab = function() {
  return {
    init: require('./init'),
    slabify: require('./slabify'),
    verifyString: require('./verify-string'),
    getItemWidth: require('./get-item-width')
  }
};

module.exports = VanillaSlab;
