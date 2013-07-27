module.exports = (grunt) ->
  
  banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= date %> */\n'
  
  grunt.initConfig
    date: grunt.template.today('dd-mm-yyyy')
    pkg: grunt.file.readJSON 'package.json'
    coffee:
      compile:
        files:
          'dist/checkt.js': ['udefine/*.coffee', 'src/*.coffee']
      tests:
        files:
          'test/tests.js': ['test/tests.coffee']
    uglify:
      options:
        banner: banner
        report: 'gzip'
      dist:
        files:
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
    mochaTest:
      options:
        reporter: 'spec'
      test:
        src: ['test/**/*.js']
    coffeelint:
      app: ['src/**/*.coffee'],
      test: ['src/**/*.coffee'],
      grunt: ['Gruntfile.coffee']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-mocha-test'
  grunt.loadNpmTasks 'grunt-coffeelint'

  grunt.registerTask 'test', ['coffeelint', 'mochaTest']
  grunt.registerTask 'default', ['test', 'coffee', 'uglify']
