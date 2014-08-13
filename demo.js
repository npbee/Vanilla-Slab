// Main initialization
document.addEventListener('DOMContentLoaded', function() {

  var vslab = new VanillaSlab;
  vslab.init({
    maxWordsPerLine: 3,
    minWordsPerLine: 2,
    fontRatio: 0.86
  });

  var main = new VanillaSlab;
  main.init({
    selector: '.js-vanilla-slab-main',
    maxWordsPerLine: 1,
    minWordsPerLine: 1,
    fontRatio: 0.80
  });

  // Debugging only
  //for (var i = 0; i < main.targets.length; i++) {
    //var content = document.createElement('div');
    //var el = main.targets[i].element;
    //var words = append_stuff(main.targets[i].words, "Words:: ");
    //var lines = append_stuff(main.targets[i].lines, "Lines:: ");

    //content.appendChild(words);
    //content.appendChild(lines);

    //el.parentNode.insertBefore(content, el.nextSibling);
  //}


  //for (var i = 0; i < vslab.targets.length; i++) {
    //var content = document.createElement('div');
    //var el = vslab.targets[i].element;
    //var words = append_stuff(vslab.targets[i].words, "Words:: ");
    //var lines = append_stuff(vslab.targets[i].lines, "Lines:: ");

    //content.appendChild(words);
    //content.appendChild(lines);

    //el.parentNode.insertBefore(content, el.nextSibling);
  //}

  //function append_stuff(array, title) {
    //var elm = document.createElement('p');
    //elm.innerHTML = '<strong>' + title + '</strong>';

    //array.forEach(function(item, index) {
      //if (index === 0 && array.length === 1) {
        //elm.innerHTML += '[ ' + item + ' ]';
      //} else if (index === 0) {
        //elm.innerHTML += '[ ' + item + ' / ';
      //} else if (index === (array.length - 1)) {
        //elm.innerHTML += item + ' ]';
      //} else {
        //elm.innerHTML += item + ' / ';
      //}
    //});

    //return elm;
  //}

});

