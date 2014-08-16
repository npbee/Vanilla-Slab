Vanilla Slab
====
[![Build Status](https://travis-ci.org/npbee/Vanilla-Slab.svg?branch=master)](https://travis-ci.org/npbee/Vanilla-Slab)
Install
----
As a node module:

```
$ npm install vanilla-slab
```

As a standalone plugin, include the minified or non-minified compiled library:

```html
<script src="path/to/plugin/vanilla-slab.min.js"></script>
<script src="myotherscripts"></script>
</body>
...
```
         
Usage
----
###Quick Start
Add a class of 'js-vanilla-slab' to a header on your page.  Then initialize for your preferred installation method:

As a standalone plugin:

```
var mySlab = new VanillaSlab;
mySlab.init();
```

As a node module:

```
var VanillaSlab = require('vanilla-slab');
var mySlab = new VanillaSlab;
mySlab.init();
```

###With Options
As a standalone plugin:

```
var mySlab = new VanillaSlab;
mySlab.init({
  selector: '.my-selector',
  minWordsPerLine: 4,
  ...
});
```

As a node module:

```
var VanillaSlab = require('vanilla-slab');
var mySlab = new VanillaSlab;
mySlab.init({
  selector: '.my-selector',
  minWordsPerline: 4,
  ...,
});
```


Options
----
###Selector
Key: `selector`

Type: `String`

Default: `.js-vanilla-slab`
        
This should be a valid css selector for the class that is applied to the headline you want to affect.
      
###Max Font Size
Key:  `maxFontSize`

Type: `Integer`

Default: `300`
        
The maximum font size you want your headlines to be.


###Min Words Per Line
Key:  `minWordsPerLine`

Type: `Integer`

Default: `2`

The minimum amount of words you want to allow per line.  Depening on the target headline, this may be overridden in the last line.

###Max Words Per Line
Key:  `maxWordsPerLine`

Type: `Integer`

Default: `5`

The maximum amount of words you want to allow per line.  Depening on the target headline, this may be overridden in the last line.

###Min Chars Per Line
Key:  `minCharsPerLine`

Type: `Integer`

Default: `20`
        
The minimum amount of characters you want per line.

###Font Ratio
Key:  `fontRatio`

Type: `Float`

Default: `0.95`
        
This is a bit of a magic number.  It's used to calculate the ideal number of characters per line.  Generally you want it to be a two-digit number less than 1.  This is the setting that you will need to experiment with for the best results with your chosen font.


About
----
This plugin is a port of this excellent jQuery plugin:  [https://github.com/freqDec/slabText/]("https://github.com/freqDec/slabText/").  It's been interpreted and heavliy modified for my own devices, but retains a lot of the same concepts as freqDec's plugin.

It takes a headline string and determines the ideal amount of characters per line based on the available width.  It then attempts to build up individual strings within that headline based on specified parameters.

**Disclaimer:**  This plugin fluctuates depending on your chosen font face.  It can take some experimentation to find the right combo of paramters to get the correct effect.



Gulpfile
----
This plugin uses gulp for build tasks.  To concatenate and compile the scripts, run `gulp`.  To run the tests, run `gulp test`.  To build the minified standalone, run `gulp build`.



