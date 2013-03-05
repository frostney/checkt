checkObj = require '../js/checkt'
{check, checkt} = checkObj

{expect} = require 'chai'

describe 'checkt', ->
  
  it 'check function references are the same', ->
    expect(check).to.equal(checkt)
  
  describe 'Object keys as types', ->

    it 'valid', ->
      check 'mystring',
        valid: (value) -> expect(value).to.be.ok
        
      check 8,
        valid: (value) -> expect(value).to.be.ok
        
      check [],
        valid: (value) -> expect(value).to.be.ok

    it 'string', ->
      check 'mystring',
        string: (value) -> expect(value).to.be.a('string')

    it 'number', ->
      check 8,
        number: (value) -> expect(value).to.be.a('number')
        
    it 'boolean', ->
      check true,
        number: (value) -> expect(value).to.be.a('boolean')
        
      check false,
        number: (value) -> expect(value).to.be.a('boolean')
        
    it 'object', ->
      check {key: 5},
        object: (value) -> expect(value).to.be.a('object')
        
    it 'null', ->
      check null,
        null: (value) -> expect(value).to.be.a('null')

    it 'undefined', ->
      check undefined,
        undefined: (value) -> expect(value).to.be.a('undefined')
        
    it 'function', ->
      check (->),
        function: (value) -> expect(value).to.be.a('function')
        
    it 'array', ->
      check ['a', 'b', 'c'],
        array: (value) -> expect(value).to.be.an.instanceof(Array)
        
  describe 'Chainable type checks', ->

    it 'valid', ->
      check('mystring')
        .valid (value) -> expect(value).to.be.ok
        
      check(8)
        .valid (value) -> expect(value).to.be.ok
        
      check([])
        .valid (value) -> expect(value).to.be.ok

    it 'not valid', ->
      check('')
        .not.valid (value) -> expect(value).not.to.be.ok

    it 'string', ->
      check('mystring')
        .string (value) -> expect(value).to.be.a('string')

    it 'number', ->
      check(8)
        .number (value) -> expect(value).to.be.a('number')
        
    it 'boolean', ->
      check(true)
        .number (value) -> expect(value).to.be.a('boolean')
        
      check(false)
        .number (value) -> expect(value).to.be.a('boolean')
        
    it 'object', ->
      check({key: 5})
        .object (value) -> expect(value).to.be.a('object')
        
    it 'null', ->
      check(null)
        .null (value) -> expect(value).to.be.a('null')

    it 'undefined', ->
      check(undefined)
        .undefined (value) -> expect(value).to.be.a('undefined')
        
    it 'function', ->
      check(->)
        .function (value) -> expect(value).to.be.a('function')
        
    it 'array', ->
      check(['a', 'b', 'c'])
        .array (value) -> expect(value).to.be.an.instanceof(Array)