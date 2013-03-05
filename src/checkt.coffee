do (root = exports ? this) ->
  'use strict'

  root.checkt = root.check = (variable, checkObject) ->

    stringedVar = {}.toString.call variable
    typeName = stringedVar.slice(8, stringedVar.length - 1).toLowerCase() 

    checkType = (typeString, cb, inverse) ->
      if inverse
        cb?(variable) unless typeName is typeString
      else  
        cb?(variable) if typeName is typeString

      ###
        Else is a reserved keyword, while CoffeeScript interpolates it correctly,
        it can only be written as check(...).['else']...
        check(...).otherwise(...) is a better choice if using plain JavaScript
      ###
      unless checkObject
        result.else = result.otherwise = (cb) -> checkType typeString, cb, !inverse
        result

    types = (inverse) ->
      valid: (cb) ->
        if inverse
          cb(variable) unless variable?
        else
          cb(variable) if variable?
        @
      undefined: (cb) -> checkType 'undefined', cb, inverse
      null: (cb) -> checkType 'null', cb, inverse
      string: (cb) -> checkType 'string', cb, inverse
      number: (cb) -> checkType 'number', cb, inverse
      boolean: (cb) -> checkType 'boolean', cb, inverse
      object: (cb) -> checkType 'object', cb, inverse
      array: (cb) -> checkType 'array', cb, inverse
      function: (cb) -> checkType 'function', cb, inverse

    if checkObject
      typeFuncs = types(false)
      for key, value of checkObject
        if key.indexOf(',') > -1
          keyArray = key.split ','
          typeFuncs[k.trim()](value) for k in keyArray
        else
          typeFuncs[key] value

      result = undefined
    else
      result = types(false)
      result.not = types(true)
    
    result

  # AMDs are awesome :)
  if root.define and not exports?
    root.define 'check', [], -> root.check
    root.define 'checkt', [], -> root.checkt