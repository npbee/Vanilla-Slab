// Main initialization
document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    var main_slab = new VanillaSlab;
    main_slab.init({
      selector: '.js-main-slab',
      maxWordsPerLine: 1,
      minWordsPerLine: 1
    });
    
    var vslab = new VanillaSlab;
    vslab.init({
      maxWordsPerLine: 3
    });
  }

  // Highlight JS
  hljs.initHighlightingOnLoad();
};


