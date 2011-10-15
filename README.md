# repr.js

Sick of 99% of objects in your runtime being represented as `[object Object]`? I sure am. `repr` takes a leaf out of python's book, and gives some identity to your objects so you can tell what they are without jumping through hoops.

It adds two global methods:

 - `str(obj)`: print out a summary of `obj`
 - `repr(obj)`: print out a more detailed representation of `obj` (similar to `inspect()` in ruby, and obviously `repr` in python)

It also overrides `Object.toString()` to use `str`, because that way you'll suddenly get useful information throughout your app in code that you don't necessarily control - in error messages, exceptions, and whenever you concatenate strings together. Note that you should never rely on the format of this (or any) `toString()` behaviour unless you specifically override it - the default implementation of `Object.toString()` is purely for informational purposes.

Here's some examples:

    function Foo() {
      this.x = "123";
    }
    var f = new Foo();
    f.complex = {a: 123, b:456};
    f.fun = function() { };


    >>> str(null)
    (null)
    >>> str(undefined)
    (undefined)
    >>> str([1,2,3])
    [1, 2, 3]
    >>> str({})
    {}
    >>> repr({a:"b"})
    {"a": "b"}
    >>> str(f)
    <# object Foo>
    >>> repr(f)
    <# Foo; x: 123, complex: {"a":123,"b":456}, fun: (anonymous function)>
    >>> repr(Foo)
    function Foo() {
      this.x = "123";
    }
    >>> str(Foo)
    (function Foo)
    >>> str([1,f,3])
    [1, <# object Foo>, 3]
    >>> repr([1,f,3])
    [1, <# Foo; x: 123, complex: {"a":123,"b":456}, fun: (anonymous function)>, 3]
    >>> repr("foo\" bar")
    "foo\" bar"


The code ends up dealing with a lot of edge cases, because javascript's type system is somewhat laden with traps. So please report any issues you find, and I'll endeavor to fix them as they come up.

## Usage:

In the browser, you need only load it with a `<script>` tag. In node.js, you must `require()` it. You can either use the returned module's `repr` and `str` functions individually, or call the module's `install` method passing in the `global` object in order to install these same functions into the global scope.
