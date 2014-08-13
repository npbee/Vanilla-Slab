// Main initialization
document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    var vslab = new VanillaSlab;
    vslab.init({
      fontRatio: 1,
      maxWordsPerLine: 3
    });
  }
};


