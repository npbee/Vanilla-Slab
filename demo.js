// Main initialization
document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    var main_slab = new VanillaSlab;
    main_slab.init({
      selector: '.js-main-slab',
      maxWordsPerLine: 1,
      minWordsPerLine: 1,
      postTweak: true
    });

    var vslab = new VanillaSlab;
    vslab.init({
      maxWordsPerLine: 3,
      fontRatio: 0.97,
      postTweak: true
    });
  }

  // Highlight JS
  hljs.initHighlightingOnLoad();
};


