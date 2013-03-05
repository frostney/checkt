(function() {
  var check, checkObj, checkt, expect;

  checkObj = require('../js/checkt');

  check = checkObj.check, checkt = checkObj.checkt;

  expect = require('chai').expect;

  describe('checkt', function() {
    it('check function references are the same', function() {
      return expect(check).to.equal(checkt);
    });
    describe('Object keys as types', function() {
      it('valid', function() {
        check('mystring', {
          valid: function(value) {
            return expect(value).to.be.ok;
          }
        });
        check(8, {
          valid: function(value) {
            return expect(value).to.be.ok;
          }
        });
        return check([], {
          valid: function(value) {
            return expect(value).to.be.ok;
          }
        });
      });
      it('string', function() {
        return check('mystring', {
          string: function(value) {
            return expect(value).to.be.a('string');
          }
        });
      });
      it('number', function() {
        return check(8, {
          number: function(value) {
            return expect(value).to.be.a('number');
          }
        });
      });
      it('boolean', function() {
        check(true, {
          number: function(value) {
            return expect(value).to.be.a('boolean');
          }
        });
        return check(false, {
          number: function(value) {
            return expect(value).to.be.a('boolean');
          }
        });
      });
      it('object', function() {
        return check({
          key: 5
        }, {
          object: function(value) {
            return expect(value).to.be.a('object');
          }
        });
      });
      it('null', function() {
        return check(null, {
          "null": function(value) {
            return expect(value).to.be.a('null');
          }
        });
      });
      it('undefined', function() {
        return check(void 0, {
          undefined: function(value) {
            return expect(value).to.be.a('undefined');
          }
        });
      });
      it('function', function() {
        return check((function() {}), {
          "function": function(value) {
            return expect(value).to.be.a('function');
          }
        });
      });
      return it('array', function() {
        return check(['a', 'b', 'c'], {
          array: function(value) {
            return expect(value).to.be.an["instanceof"](Array);
          }
        });
      });
    });
    return describe('Chainable type checks', function() {
      it('valid', function() {
        check('mystring').valid(function(value) {
          return expect(value).to.be.ok;
        });
        check(8).valid(function(value) {
          return expect(value).to.be.ok;
        });
        return check([]).valid(function(value) {
          return expect(value).to.be.ok;
        });
      });
      it('not valid', function() {
        return check('').not.valid(function(value) {
          return expect(value).not.to.be.ok;
        });
      });
      it('string', function() {
        return check('mystring').string(function(value) {
          return expect(value).to.be.a('string');
        });
      });
      it('number', function() {
        return check(8).number(function(value) {
          return expect(value).to.be.a('number');
        });
      });
      it('boolean', function() {
        check(true).number(function(value) {
          return expect(value).to.be.a('boolean');
        });
        return check(false).number(function(value) {
          return expect(value).to.be.a('boolean');
        });
      });
      it('object', function() {
        return check({
          key: 5
        }).object(function(value) {
          return expect(value).to.be.a('object');
        });
      });
      it('null', function() {
        return check(null)["null"](function(value) {
          return expect(value).to.be.a('null');
        });
      });
      it('undefined', function() {
        return check(void 0).undefined(function(value) {
          return expect(value).to.be.a('undefined');
        });
      });
      it('function', function() {
        return check(function() {})["function"](function(value) {
          return expect(value).to.be.a('function');
        });
      });
      return it('array', function() {
        return check(['a', 'b', 'c']).array(function(value) {
          return expect(value).to.be.an["instanceof"](Array);
        });
      });
    });
  });

}).call(this);
