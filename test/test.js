var chai = require('chai');
var should = require('should');
var jsdom = require('jsdom');
var vanillaSlab = require('../lib/index');

// Creating a fake dom to test with
global.window = jsdom.jsdom().createWindow();
global.document = window.document;
var headline;
headline = global.document.createElement('h1');
headline.style.fontSize = '12px';
global.document.body.appendChild(headline);

describe('Plugin initialization without options', function() {
  var aSlab;
  before(function(done) {
    headline.innerHTML = 'This is a headline';
    headline.className = 'js-vanilla-slab';
    aSlab = new vanillaSlab;
    aSlab.init();
    done();
  });

  it('should create an instance of the plugin', function() {
    (aSlab.settings.selector).should.equal('.js-vanilla-slab');
    (aSlab.settings.maxFontSize).should.equal(2000);
    (aSlab.settings.minWordsPerLine).should.equal(2);
    (aSlab.settings.maxWordsPerLine).should.equal(5);
    (aSlab.settings.fontRatio).should.equal(0.95);
  });

  after(function(done) {
    done();
  });
});

describe('Plugin initialization with options', function() {
  var bSlab;
  before(function(done) {
    headline.innerHTML = 'This is a headline';
    headline.className = 'vanilla-slab';
    bSlab = new vanillaSlab;
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
    (bSlab.settings.selector).should.equal('.vanilla-slab');
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
    cSlab = new vanillaSlab;
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


describe("the span elements that the plugin creates", function() {
  var dSlab;
  before(function(done) {
    headline.innerHTML = 'This is a giant humongous extra large headline';
    headline.className = 'js-vanilla-slab';
    dSlab = new vanillaSlab;
    dSlab.init();
    done();
  });


  it('should be correct', function() {
    // In this case, the chars per line will be 20 because we're not actually
    // rendering an element so we have no way of getting the width. The
    // fallback in this case is 20 chars per line.  So all parameters would
    // be:
    // max words per line = 5
    // min words per line = 2
    // max chars per line = 20
    // Spans should be:
    // 0: This is a giant
    // 1: humongous extra 
    // 2: large headline
    (dSlab.targets[0].lines[0]).should.equal('This is a giant');
    (dSlab.targets[0].lines[1]).should.equal('humongous extra');
    (dSlab.targets[0].lines[2]).should.equal('large headline');
  });
});
