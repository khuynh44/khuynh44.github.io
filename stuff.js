var value;
document.getElementById("button").onclick = function() {
value = document.getElementById("name").value;
console.log(value);
scan()
}

var scan = function() {
    document.getElementById("text").value = "poop";
}
