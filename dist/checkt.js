(function() {
  'use strict';
  var hasModule;

  hasModule = (typeof module !== "undefined" && module !== null) && module.exports;

  (function(root) {
    var _base, _base1, _base2;
    root.udefine || (root.udefine = function(name, deps, factory) {
      var dep, globalsArr, requireArr, result, _ref;
      if (name == null) {
        throw new Error('A udefine module needs to have a name');
      }
      if (typeof deps === 'function') {
        _ref = [name, [], deps], name = _ref[0], deps = _ref[1], factory = _ref[2];
      }
      if (typeof define !== "undefined" && define !== null) {
        if (define.amd || define.umd) {
          udefine.env.amd = true;
          result = define.apply(this, arguments);
        }
      } else {
        if (hasModule) {
          requireArr = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = deps.length; _i < _len; _i++) {
              dep = deps[_i];
              _results.push(require(root.udefine.node[dep]));
            }
            return _results;
          })();
          udefine.env.commonjs = true;
          result = module.exports = factory.apply(this);
        } else {
          globalsArr = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = deps.length; _i < _len; _i++) {
              dep = deps[_i];
              _results.push(root.udefine.globals[dep]);
            }
            return _results;
          })();
          udefine.env.browser = true;
          result = factory.apply(this, globalsArr);
        }
      }
      return result;
    });
    (_base = root.udefine).globals || (_base.globals = {});
    (_base1 = root.udefine).commonjs || (_base1.commonjs = {});
    (_base2 = root.udefine).env || (_base2.env = {
      amd: false,
      commonjs: false,
      browser: false
    });
    return null;
  })(hasModule ? typeof global !== "undefined" && global !== null ? global : this : void 0);

}).call(this);

(function() {
  'use strict';
  var check;

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
        result[t] = function(cb) {
          return checkType(t, cb, inverse);
        };
      }
      return result;
    };
    if (checkObject) {
      typeFuncs = types(false);
      for (key in checkObject) {
        value = checkObject[key];
        if (key.indexOf(',') > -1) {
          keyArray = key.split(',');
          for (_i = 0, _len = keyArray.length; _i < _len; _i++) {
            k = keyArray[_i];
            typeFuncs[k.trim()](value);
          }
        } else {
          typeFuncs[key](value);
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
      udefine('check', checkWrapper);
      return udefine('checkt', checkWrapper);
    } else {
      return bindCheckToGlobal();
    }
  })(this);

}).call(this);
