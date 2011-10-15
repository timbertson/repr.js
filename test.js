
var r=require('./repr.js'); str=r.str; repr=r.repr;
function Foo() {
	this.x = "123";
}
Foo.prototype.fun2 = function() {};

var f = new Foo();
f.complex = {a: 123, b:456};
f.fun = function() { };

console.log(str(null) + " < -- str(null)");
console.log(str(undefined) + " < -- str(undefined)");
console.log(str([1,2,3]) + " < -- str([1,2,3])");
console.log(str({}) + " < -- str({})");
console.log(repr({a:"b"}) + " < -- repr({a:\"b\"})");
console.log(f + " < -- toString()");
console.log(str(f) + " < -- str(f)");
console.log(repr(f) + " < -- repr(f)");
console.log(Foo + " < -- Foo");
console.log(str(Foo) + " < -- str(Foo)");
console.log(repr(Foo) + " < -- repr(Foo)");
console.log(str([1,f,3]) + " < -- str([1,f,3])");
console.log(repr([1,f,3]) + " < -- repr([1,f,3])");
console.log(repr('foo" bar') + " < -- repr(['foo\" bar'])");
