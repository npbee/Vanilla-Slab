// Main initialization
document.addEventListener('DOMContentLoaded', function() {

  var vslab = VanillaSlab;
  vslab.init({
    maxWordsPerLine: 3,
    minWordsPerLine: 2
  });

  // Debugging only

  for (var i = 0; i < vslab.targets.length; i++) {
    var content = document.createElement('div');
    var el = vslab.targets[i].element;
    var words = append_stuff(vslab.targets[i].words, "Words:: ");
    var lines = append_stuff(vslab.targets[i].lines, "Lines:: ");

    content.appendChild(words);
    content.appendChild(lines);

    el.parentNode.insertBefore(content, el.nextSibling);
  }

  function append_stuff(array, title) {
    var elm = document.createElement('p');
    elm.innerHTML = '<strong>' + title + '</strong>';

    array.forEach(function(item, index) {
      if (index === 0 && array.length === 1) {
        elm.innerHTML += '[ ' + item + ' ]';
      } else if (index === 0) {
        elm.innerHTML += '[ ' + item + ' / ';
      } else if (index === (array.length - 1)) {
        elm.innerHTML += item + ' ]';
      } else {
        elm.innerHTML += item + ' / ';
      }
    });

    return elm;
  }

});

