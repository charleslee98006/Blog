module.exports = function(grunt) {
	// Project configuration.
  	grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
    	jshint:{
    		all: ['Gruntfile.js', 'modules/**/*.js','routes/**/*.js']
    	},
    	sass:{
            dist: {
              files: [{
                expand: true,
                cwd: 'public/',
                src: ['**/*.scss'],
                dest: '../public/',
                ext: '.css'
              }]
            }
    	},
        // configure nodemon
        nodemon: {
          dev: {
            script: 'app.js'
          }
        }
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-nodemon');

	// Default task(s).
	grunt.registerTask('default', ['jshint','sass','nodemon']);
};