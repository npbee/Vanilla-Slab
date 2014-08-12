 
var get_item_width = function(item, font_size) {
    var f = font_size || '12px arial';
    var o = document.createElement('div');
    o.style.position = 'absolute';
    o.style.float = 'left';
    o.style.whiteSpace = 'nowrap';
    o.style.visibility = 'hidden';
    o.style.fontSize = f;
    o.innerHTML = item;
    
    document.body.appendChild(o);
    var width = o.offsetWidth;
    document.body.removeChild(o);
    return width;
};

module.exports = get_item_width;
