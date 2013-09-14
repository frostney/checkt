do (names = ['check', 'checkt']) ->
  udefine.configure (root) ->
    for name in names
      @globals[name.toLowerCase()] = root[name]
  
      @inject[name.toLowerCase()] = {name, root}
      
    null