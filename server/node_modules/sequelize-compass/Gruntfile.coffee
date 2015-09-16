
module.exports = (grunt) ->
  grunt.initConfig
    clean:
      options:
        force: true

      build: ["lib"]

    coffee:
      compile:
        files: [
          expand: true
          cwd: "./src/"
          src: ["**/*.coffee"]
          dest: "./"
          ext: ".js"
        ]

    watch:
      coffee:
        files: [
          "coffee/**"
          "coffee/**/*"
        ]
        tasks: ["build"]

      options:
        livereload: true

  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-watch"
  
  grunt.registerTask "default", ["watch"]
  grunt.registerTask "build", [
    "clean:build"
    "coffee"
  ]