 <section>
      <h2>Install</h2>
      <p>As a node module:</p>
      <pre><code>$ npm install vanilla-slab</code></pre>

      <p>As a standalone plugin, include the minified or non-minified compiled
      library:</p>
      <pre><code>&lt;script src="path/to/plugin/vanilla-slab.min.js"&gt;&lt;/script&gt;
&lt;script src="myotherscripts"&gt;&lt;/script&gt;
&lt;/body&gt;
...</code></pre>
    </section>
    
     
    <section id="usage">
      <h2>Usage</h2>
      <h3>Quick Start</h3>
      <p>Add a class of 'js-vanilla-slab' to a header on your page.  Then
      initialize for your preferred installation method:</p>
      
      <p>As a standalone plugin:</p>
      <pre><code>var mySlab = new VanillaSlab;
mySlab.init();</code></pre>

      <p>As a node module:</p>
      <pre><code>var VanillaSlab = require('vanilla-slab');
var mySlab = new VanillaSlab;
mySlab.init();</code></pre>

      <h3>With Options</h3>
      <p>As a standalone plugin:</p>
      <pre><code>var mySlab = new VanillaSlab;
mySlab.init({
  selector: '.my-selector',
  minWordsPerLine: 4,
  ...
});</code></pre>

      <p>As a node module:</p>
      <pre><code>var VanillaSlab = require('vanilla-slab');
var mySlab = new VanillaSlab;
mySlab.init({
  selector: '.my-selector',
  minWordsPerline: 4,
  ...,
});</code></pre>
    </section>

    <section>
      <h2>Options</h2>

      <div class="option">
        <h3>Selector</h3>
        <p>Key: <code class="inline">selector</code></p>
        <p>Type: <code class="inline">String</code></p>
        <p>Default: <code class="inline">.js-vanilla-slab</code></p>
        <p>This should be a valid css selector for the class that is applied to
        the headline you want to affect.</p>
      </div>
      
      <div class="option">
        <h3>Max Font Size</h3>
        <p>Key:  <code class="inline">maxFontSize</code></p>
        <p>Type: <code class="inline">Integer</code></p>
        <p>Default: <code class="inline">300</code></p>
        <p>The maximum font size you want your headlines to be.</p>
      </div>

      <div class="option">
        <h3>Min Words Per Line</h3>
        <p>Key:  <code class="inline">minWordsPerLine</code></p>
        <p>Type: <code class="inline">Integer</code></p>
        <p>Default: <code class="inline">2</code></p>
        <p>The minimum amount of words you want to allow per line.  Depening on
        the target headline, this may be overridden in the last line.</p>
      </div>
        
      <div class="option">
        <h3>Max Words Per Line</h3>
        <p>Key:  <code class="inline">maxWordsPerLine</code></p>
        <p>Type: <code class="inline">Integer</code></p>
        <p>Default: <code class="inline">5</code></p>
        <p>The maximum amount of words you want to allow per line.  Depening on
        the target headline, this may be overridden in the last line.</p>
      </div>

      <div class="option">
        <h3>Min Chars Per Line</h3>
        <p>Key:  <code class="inline">minCharsPerLine</code></p>
        <p>Type: <code class="inline">Integer</code></p>
        <p>Default: <code class="inline">20</code></p>
        <p>The minimum amount of characters you want per line.</p>
      </div>

      <div class="option">
        <h3>Font Ratio</h3>
        <p>Key:  <code class="inline">fontRatio</code></p>
        <p>Type: <code class="inline">Float</code></p>
        <p>Default: <code class="inline">0.95</code></p>
        <p>This is a bit of a magic number.  It's used to calculate the ideal
        number of characters per line.  Generally you want it to be a two-digit
        number less than 1.  This is the setting that you will need to
        experiment with for the best results with your chosen font.</p>
      </div>
    </section>

 <section>
      <h2>About</h2>
      <p>This plugin is a port of this excellent jQuery plugin:
      <a
        href="https://github.com/freqDec/slabText/">https://github.com/freqDec/slabText/</a>.  It's been interpreted and heavliy
      modified for my own devices, but retains a lot of the same concepts as
      freqDec's plugin.</p>

      <p>It takes a headline string and determines the ideal amount of characters per line
      based on the available width.  It then attempts to build up individual
      strings within that headline based on specified parameters.</p>

      <p><strong>Disclaimer:  </strong>This plugin fluctuates depending on your
      chosen font face.  It can take some experimentation to find the right combo
      of paramters to get the correct effect.</p>

    </section>

    <section>
      <h2>Gulpfile</h2>
      <p>This plugin uses gulp for build tasks.  To concatenate and compile the
      scripts, run <code class='inline'>gulp</code>.  To run the tests, run
      <code class='inline'>gulp test</code>.  To build the minified standalone,
      run <code class='inline'>gulp build</code>.
    </section>


