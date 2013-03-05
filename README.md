checkt
======

What is it?
-----------

__checkt__ is a small library for safe (chainable) type checks written in
CoffeeScript and usable in any JavaScript environment.

Currently supported are:

* Browser
* CommonJS environments (Node.js)

The checkt library exposes the checkt function. (An alias is the check object,
which has exactly the same functionality.)

Usage
-----

__JavaScript__

```javascript
// Method chaining examples
check('test').not.string(function() {
  return console.log('not a string');
})["else"](function() {
  return console.log('Logically, should be a string');
}).number(function(v) {
  return console.log("its a number with value: " + v);
});

// Instead of using method chaing, you can also use
// a plain object with the type as the key and the value is the callback function
check({}, {
  object: function() {
    return console.log('Is an object');
  },
  number: function() {
    return console.log('Is a number');
  }
});

// Multiple keys seperated by a comma also work, just make sure the key is
// written as a key
check('test', {
  'string, number': function() {
    return console.log('Either string or number');
  }
});
```

__CoffeeScript__

```coffeescript
# Method chaining examples
check('test')
  .not.string(-> console.log 'not a string')
  .else(-> console.log 'Logically, should be a string')
  .number((v) -> console.log("its a number with value: #{v}"))

# Instead of using method chaing, you can also use
# a plain object with the type as the key and the value is the callback function
check {},
  object: -> console.log 'Is an object'
  number: -> console.log 'Is a number'

# Multiple keys seperated by a comma also work, just make sure the key is
# written as a key
check 'test',
  'string, number': -> console.log 'Either string or number'
```


License
-------

checkt is practically public domain. See __UNLICENSE.md__ for more information.