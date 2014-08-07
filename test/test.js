var chai = require('chai');
var should = require('should');
var jsdom = require('jsdom');
var vanillaSlab = require('../');

// Creating a fake dom to test with
global.window = jsdom.jsdom().createWindow();
global.document = window.document;
var headline;
headline = global.document.createElement('h1');
headline.style.fontSize = '12px';
global.document.body.appendChild(headline);

describe('Plugin initialization without options', function() {
  before(function(done) {
    headline.innerHTML = 'This is a headline';
    headline.className = 'headline';
    vanillaSlab.init();
    done();
  });

  it('should create an instance of the plugin', function() {
    (vanillaSlab.settings.selector).should.equal('.headline');
    (vanillaSlab.settings.maxFontSize).should.equal(2000);
    (vanillaSlab.settings.minWordsPerLine).should.equal(2);
    (vanillaSlab.settings.maxWordsPerLine).should.equal(5);
    (vanillaSlab.settings.buffer).should.equal(10);
    (vanillaSlab.settings.fontRatio).should.equal(0.78);
  });
});

describe('Plugin initialization with options', function() {
  before(function(done) {
    headline.innerHTML = 'This is a headline';
    headline.className = 'vanilla-slab';
    vanillaSlab.init({
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
    (vanillaSlab.settings.selector).should.equal('.vanilla-slab');
    (vanillaSlab.settings.maxFontSize).should.equal(100);
    (vanillaSlab.settings.minWordsPerLine).should.equal(3);
    (vanillaSlab.settings.maxWordsPerLine).should.equal(4);
    (vanillaSlab.settings.buffer).should.equal(15);
    (vanillaSlab.settings.fontRatio).should.equal(0.50);
  });
});


describe('The words in the headline', function() {

  before(function(done) {
    headline.innerHTML = 'This is a headline';
    headline.className = 'headline';
    vanillaSlab.init();
    done();
  });

  it("should be parsed by the plugin into an array", function() {
    (vanillaSlab.words[0]).should.equal('This');
    (vanillaSlab.words[1]).should.equal('is');
    (vanillaSlab.words[2]).should.equal('a');
    (vanillaSlab.words[3]).should.equal('headline');
  });

});


describe("the spans elements that the plugin creates", function() {
  before(function(done) {
    headline.innerHTML = 'This is a giant humungous extra large headline';
    headline.className = 'headline';
    vanillaSlab.init();
    done();
  });

  context('when the parent width is 900px wide', function() {

    it('should create the correct span elements', function() {
      // In this case, the chars per line will be 20 because we're not actually
      // rendering an element so we have no way of getting the width.
      
      (vanillaSlab.spans[0]).should.equal('This is a giant ');
    });
  });
});
