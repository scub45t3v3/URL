module.exports = (grunt) ->
  grunt.initConfig
    clean: require('./grunt/clean')
    coffee: require('./grunt/coffee')
    coffeelint: require('./grunt/coffeelint')

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.registerTask 'default', ['coffeelint', 'clean', 'coffee']