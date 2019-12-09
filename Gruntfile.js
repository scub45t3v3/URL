'use strict';

const tasks = (grunt) => {
  // load task configuration
  grunt.initConfig(require('./grunt'));

  // load grunt tasks
  grunt.loadNpmTasks('grunt-eslint');

  // register tasks
  grunt.registerTask('default', ['eslint']);
}; // end grunt wrapper

// export as commonjs module
module.exports = tasks;