/****
 * Verifies that a string passes the plugin's defined parameters
 * @param {string} string
 * @return {boolean}
****/
var verifyString = function(string) {
  var string_word_count = string.trim().split(' ').length;
  var string_char_count = string.length;
  
  return string_word_count >= this.settings.minWordsPerLine &&
         string_word_count <= this.settings.maxWordsPerLine &&
         string_char_count <= this.chars_per_line;
};

module.exports = verifyString;
