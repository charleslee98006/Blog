module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-nodemon');


  // Default task(s).
  grunt.registerTask('default', ['jshint','sass','nodemon', 'watch']);

	// Project configuration.
  	grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
    	jshint:{
    		all: ['Gruntfile.js', 'modules/**/*.js','routes/**/*.js']
    	},
      watch: {
        configFiles:{
          options:{
            reload: true
          }
        },
      //   options: {
      //     livereload: true,
      //   },
        files: '/public/styles/**/*.scss', // 1
        tasks: [ 'sass' ]
      },
    	sass:{
        dist: {
          files: [{
          expand: true,
          cwd: 'public/',
          src: ['**/*.scss'],
          dest: 'public/',
          ext: '.css'
          }]
      }
    },
      //require( './sass' ).task,
        // configure nodemon
        nodemon: {
          dev: {
            script: 'app.js'
          }
        }
	});

};