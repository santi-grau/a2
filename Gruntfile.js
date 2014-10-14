module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			compile: {
				options: {
					almond: true,
					modules: [{name: 'main'}],
					dir: './public/build',
					baseUrl : "./public/js",
					mainConfigFile: "./public/js/main.js"
				}
			}
		}
	});
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-requirejs');
	// Default task(s).
	grunt.registerTask('default', ['requirejs']);
};