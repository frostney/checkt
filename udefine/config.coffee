do (names = ['check', 'checkt']) ->
  udefine.configure (root) ->
    for name in names
      udefine.inject.add [name.toLowerCase()]
      
    null