var headline = document.createElement('h1');
headline.style.fontSize = '12px';
document.body.appendChild(headline);

describe('Plugin intialization without options', function() {
  var aSlab;
  before(function(done) {
    headline.innerHTML = 'This is a headline';
    headline.className = 'js-vanilla-slab';
    aSlab = new VanillaSlab;
    aSlab.init();
    done();
  });

  it('should create an instance of the plugin', function() {
    (aSlab.settings.selector).should.equal('.js-vanilla-slab');
    (aSlab.settings.maxFontSize).should.equal(300);
    (aSlab.settings.minWordsPerLine).should.equal(2);
    (aSlab.settings.maxWordsPerLine).should.equal(5);
    (aSlab.settings.fontRatio).should.equal(0.95);
  });
});


describe('Plugin initialization with options', function() {
  var bSlab;
  before(function(done) {
    headline.innerHTML = 'This is a headline';
    headline.className = 'vanilla-slab';
    bSlab = new VanillaSlab;
    bSlab.init({
      selector: '.vanilla-slab',
      maxFontSize: 100,
      minWordsPerLine: 3,
      maxWordsPerLine: 4,
      buffer: 15,
      fontRatio: 0.50
    });
    done();
  });

  it('should create an instance of the plugin with the provided options', function() {
    (bSlab.settings.maxFontSize).should.equal(100);
    (bSlab.settings.minWordsPerLine).should.equal(3);
    (bSlab.settings.maxWordsPerLine).should.equal(4);
    (bSlab.settings.fontRatio).should.equal(0.50);
  });
});


describe('The words in the headline', function() {
  var cSlab;
  before(function(done) {
    headline.innerHTML = 'This is a headline';
    headline.className = 'js-vanilla-slab';
    cSlab = new VanillaSlab;
    cSlab.init();
    done();
  });

  it("should be parsed by the plugin into an array", function() {
    (cSlab.targets[0].words[0]).should.equal('This');
    (cSlab.targets[0].words[1]).should.equal('is');
    (cSlab.targets[0].words[2]).should.equal('a');
    (cSlab.targets[0].words[3]).should.equal('headline');
  });

});


describe("the span elements created when the parent is 900px", function() {
  // Max Words per line == 5
  // Min Words per line == 2
  // Chars per line varies on available width
  var dSlab;
  before(function(done) {
    document.body.style.width = '900px';
    document.body.className = 'test';
    headline.innerHTML = 'This might possibly be the biggest headline that ever existed';
    headline.className = 'js-vanilla-slab';
    dSlab = new VanillaSlab;
    dSlab.init();
    done();
  });

  it('should be correct', function() {
    // Chars per line should be:
    // Max(minCharsPerLine, (parent_width / font_size * fontRatio)
    // Max(20, (900 / (12 * 0.95)) == 78.94 => rounded to 78
    (dSlab.targets[0].lines[0]).should.equal('This might possibly be the');
    (dSlab.targets[0].lines[1]).should.equal('biggest headline that ever existed');
  });

  it('should not wrap the text', function() {
      headline.children[0].style.display = 'inline';
      headline.children[0].style.whiteSpace = 'nowrap';
      (headline.children[0].offsetWidth).should.be.below(headline.children[0].parentNode.offsetWidth);
  });
});


describe("the span elements that the plugin creates when the parent is 300px", function() {
  // Max Words per line == 5
  // Min Words per line == 2
  // Chars per line varies on available width
  var eSlab;
  before(function(done) {
    document.body.style.width = '300px';
    document.body.className = 'test';
    headline.innerHTML = 'This might possibly be the biggest headline that ever existed';
    headline.className = 'js-vanilla-slab';
    eSlab = new VanillaSlab;
    eSlab.init();
    done();
  });

  it('should be correct', function() {
    // Chars per line
    // Max(minCharsPerLine, (parent_width / font_size * fontRatio)
    // Max(20, (300 / (12 * 0.95)) == 26
    (eSlab.targets[0].lines[0]).should.equal('This might possibly be');
    (eSlab.targets[0].lines[1]).should.equal('the biggest headline that');
    (eSlab.targets[0].lines[2]).should.equal('ever existed');
  });
});
