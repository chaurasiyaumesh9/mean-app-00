module.exports = function( grunt ){
	
	grunt.initConfig({
		
	  sass: {
	    dist: {
	      files: {
	        'public/css/styles.css': 'public/scss/styles.scss',
        	'public/css/bootstrap-custom.css': 'public/scss/bootstrap-custom.scss'
	      }
	    }
	  },
	  watch: {
		  stylesheets: {
		    files: ['public/scss/*.scss'],
		    tasks: ['sass']
		  },
		}
	});

	

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('default', ['watch']);

};