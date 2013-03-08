{check} = require '../../js/checkt'

# Method chaining examples
check('test')
  .not.string(-> console.log 'not a string')
  .else(-> console.log 'Logically, should be a string')
  .number((v) -> console.log("its a number with value: #{v}"))

check({})
  .object(-> console.log 'Is an object')
  .else(-> console.log 'Not an object')
  .else(-> console.log 'Maybe an object')

# Instead of using method chaing, you can also use
# a plain object with the type as the key and the value is the callback function
check {},
  object: -> console.log 'Is an object'
  number: -> console.log 'Is a number'

check 8,
  object: -> console.log 'Is an object'
  number: -> console.log 'Is a number'

# Multiple keys seperated by a comma also work, just make sure the key is
# written as a string
check 'test',
  'string, number': -> console.log 'Either string or number'