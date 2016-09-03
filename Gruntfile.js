module.exports = function(grunt) {
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    const filesJshint = ['Gruntfile.js',
		            	  'models/**/*.js',
		            	  'Actions/**/*.js',
		            	  'configs/**/*.js',
		            	  'middlewares/**/*.js',
		            	  'routes/**/*.js'
		        	    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: filesJshint,
            options: {
		      "node": true,
  			  "esnext": true
		    }
        },
        watch: {
	        files: filesJshint,
	        tasks: ['jshint']
	    }
    });
    
    //grunt.registerTask('test', ['jshint']);
	//grunt.registerTask('default', ['jshint']);
};