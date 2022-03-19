Function.prototype._bind = function(context, ...args) {
    var fn = this;
    return function(...rest) {
        return fn.apply(context,[...args, ...rest]);
    }
}

let foo = function(){
    console.log(arguments);
}
foo._bind(null,"a","b")("c","d","e"); // { '0': 'a', '1': 'b', '2': 'c', '3': 'd', '4': 'e' }