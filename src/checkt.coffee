'use strict'

check = (variable, checkObject) ->

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
    result = {}
    typeArray = ['undefined', 'null', 'string', 'number', 'boolean', 'object', 'array', 'function']
    
    result.valid = (cb) ->
      if inverse
        cb?(variable) unless variable?
      else
        cb?(variable) if variable?
      @
    (result[t] = (cb) -> checkType t, cb, inverse) for t in typeArray
    result

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

do (root = @) ->
  bindCheckToGlobal = -> root.check = root.checkt = check
  
  if root.udefine
    checkWrapper = -> if udefine.env.browser then bindCheckToGlobal() else check
    
    udefine 'check', checkWrapper
    udefine 'checkt', checkWrapper
  else
    bindCheckToGlobal()
