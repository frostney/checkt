do (names = ['check', 'checkt']) ->
  udefine.configure (root) ->
    for name in names
      @inject.add [name.toLowerCase()]
      
    null