
var repr=require('./repr.js');
function Foo() {
	this.x = "123";
}
Foo.prototype.fun2 = function() {};

var f = new Foo();
f.complex = {a: 123, b:456};
f.fun = function() { };

console.log(repr(null) + " < -- repr(null)");
console.log(repr(undefined) + " < -- repr(undefined)");
console.log(repr([1,2,3]) + " < -- repr([1,2,3])");
console.log(repr({}) + " < -- repr({})");
console.log(repr({a:"b"}) + " < -- repr({a:\"b\"})");
console.log(repr(f) + " < -- repr(f)");
console.log(Foo + " < -- Foo");
console.log(repr(Foo) + " < -- repr(Foo)");
console.log(repr([1,f,3]) + " < -- repr([1,f,3])");
console.log(repr('foo" bar') + " < -- repr(['foo\" bar'])");
console.log(repr(process.stdout) + "< -- repr(process.stdout)");
