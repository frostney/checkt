(function() {
  (function(names) {
    return udefine.configure(function(root) {
      var name, _i, _len;
      for (_i = 0, _len = names.length; _i < _len; _i++) {
        name = names[_i];
        this.inject.add([name.toLowerCase()]);
      }
      return null;
    });
  })(['check', 'checkt']);

}).call(this);

(function() {
  'use strict';
  var check,
    __hasProp = {}.hasOwnProperty;

  check = function(variable, checkObject) {
    var checkType, k, key, keyArray, result, stringedVar, typeFuncs, typeName, types, value, _i, _len;
    stringedVar = {}.toString.call(variable);
    typeName = stringedVar.slice(8, stringedVar.length - 1).toLowerCase();
    checkType = function(typeString, cb, inverse) {
      if (inverse) {
        if (typeName !== typeString) {
          if (typeof cb === "function") {
            cb(variable);
          }
        }
      } else {
        if (typeName === typeString) {
          if (typeof cb === "function") {
            cb(variable);
          }
        }
      }
      /*
        Else is a reserved keyword, while CoffeeScript interpolates it correctly,
        it can only be written as check(...).['else']...
        check(...).otherwise(...) is a better choice if using plain JavaScript
      */

      if (!checkObject) {
        result["else"] = result.otherwise = function(cb) {
          return checkType(typeString, cb, !inverse);
        };
        return result;
      }
    };
    types = function(inverse) {
      var result, t, typeArray, _i, _len;
      result = {};
      typeArray = ['undefined', 'null', 'string', 'number', 'boolean', 'object', 'array', 'function'];
      result.valid = function(cb) {
        if (inverse) {
          if (variable == null) {
            if (typeof cb === "function") {
              cb(variable);
            }
          }
        } else {
          if (variable != null) {
            if (typeof cb === "function") {
              cb(variable);
            }
          }
        }
        return this;
      };
      for (_i = 0, _len = typeArray.length; _i < _len; _i++) {
        t = typeArray[_i];
        result[t] = (function(t) {
          return function(cb) {
            return checkType(t, cb, inverse);
          };
        })(t);
      }
      return result;
    };
    if (checkObject) {
      typeFuncs = types(false);
      for (key in checkObject) {
        if (!__hasProp.call(checkObject, key)) continue;
        value = checkObject[key];
        if (key.indexOf(',') > -1) {
          keyArray = key.split(',');
          for (_i = 0, _len = keyArray.length; _i < _len; _i++) {
            k = keyArray[_i];
            typeFuncs[k.trim()](value);
          }
        } else {
          typeFuncs[key.trim()](value);
        }
      }
      result = void 0;
    } else {
      result = types(false);
      result.not = types(true);
    }
    return result;
  };

  (function(root) {
    var bindCheckToGlobal, checkWrapper;
    bindCheckToGlobal = function() {
      return root.check = root.checkt = check;
    };
    if (root.udefine) {
      checkWrapper = function() {
        if (udefine.env.browser) {
          return bindCheckToGlobal();
        } else {
          return check;
        }
      };
      udefine('checkt', checkWrapper);
      return udefine('check', checkWrapper);
    } else {
      return bindCheckToGlobal();
    }
  })(this);

}).call(this);
