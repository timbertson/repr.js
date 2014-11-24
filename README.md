# repr.js

Sick of 99% of objects in your runtime being represented as `[object Object]`? I sure am. `repr` takes a leaf out of python's book, and gives some identity to your objects so you can tell what they are without jumping through hoops.

## Usage:

in node.js:

    require('repr');

... returns the repr function.

In the browser:

    <script src="/path/to/repr.js"></script>

... sets the `repr` global to the repr function.

The repr function can be called directly:

  - `repr(obj)`: return a representation of `obj` (similar to `inspect()` in ruby, and obviously `repr` in python)

It also has an `install` method, to install the function globally:

  - `install()`: Install globally. Takes two optional arguments:
     - `install(global, proto)`:
       If `global` is truthy (typically `window` or `global`), adds the `repr` function as a property on `global`.
       If `proto` is truthy (typically Object.prototype), overrides this object's `toString` method to use `repr` instead.

     If called without any arguments, it'll install everything - i.e. equivalent to `install(global, Object.prototype)`

     `install` returns the repr function itself.

----

Here's some examples:

    function Foo() {
      this.x = "123";
    }
    var f = new Foo();
    f.complex = {a: 123, b:456};
    f.fun = function() { };


    >>> repr(null)
    null
    >>> repr(undefined)
    undefined
    >>> repr([1,2,3])
    [1, 2, 3]
    >>> repr({})
    {}
    >>> repr({a:"b"})
    {"a": "b"}
    >>> repr(f)
    <# object Foo; "x": "123", "complex": {"a": 123, "b": 456}, "fun": <# anonymous function>>
    >>> repr(Foo)
    <# function Foo>
    >>> repr([1,f,3])
    [1, <# object Foo; "x": "123", "complex": {"a": 123, "b": 456}, "fun": <# anonymous function>>, 3]
    >>> repr("foo\" bar")
    "foo\" bar"


The code ends up dealing with a lot of edge cases, because javascript's type system is basically one big trap. So please report any issues you find, and I'll endeavor to fix them as they come up.
