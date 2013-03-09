checkt
======

[![Build Status](https://travis-ci.org/Stoney-FD/checkt.png?branch=master)](https://travis-ci.org/Stoney-FD/checkt)

What is it?
-----------

__checkt__ is a small library for safe (chainable) type checks written in
CoffeeScript and usable in any JavaScript environment.

Currently supported are:

* Browser
* CommonJS environments (Node.js)

The checkt library exposes the checkt function. (An alias is the check object,
which has exactly the same functionality.)

__Browser__
Embed `js/checkt.js` in your HTML file for development purposes and 
`js/checkt.min.js` for production use.

__Node.js__  
Either use npm with  
`npm install checkt`  
or add `checkt` to to the package.json of your project.

Usage
-----

__JavaScript__

```javascript
// Method chaining examples
check('test').not.string(function() {
 console.log('not a string');
}).otherwise(function() {
 console.log('Logically, should be a string');
}).number(function(v) {
 console.log("its a number with value: " + v);
});

// Instead of using method chaing, you can also use
// a plain object with the type as the key and the value is the callback function
check({}, {
  object: function() {
   console.log('Is an object');
  },
  number: function() {
   console.log('Is a number');
  }
});

// Multiple keys seperated by a comma also work, just make sure the key is
// written as a string
check('test', {
  'string, number': function() {
   console.log('Either string or number');
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
# written as a string
check 'test',
  'string, number': -> console.log 'Either string or number'
```


License
-------

checkt is practically public domain. See __UNLICENSE.md__ for more information.