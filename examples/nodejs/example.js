var check = require('../../js/checkt').check;

// Method chaining examples
check('test').not.string(function() {
  return console.log('not a string');
})["else"](function() {
  return console.log('Logically, should be a string');
}).number(function(v) {
  return console.log("its a number with value: " + v);
});

check({}).object(function() {
  return console.log('Is an object');
})["else"](function() {
  return console.log('Not an object');
})["else"](function() {
  return console.log('Maybe an object');
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

check(8, {
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