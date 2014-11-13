module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			compile: {
				options: {
					almond: true,
					modules: [{name: 'tester'}],
					dir: './build',
					baseUrl : "./js",
					mainConfigFile: "./js/tester.js"
				}
			}
		}
	});
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-requirejs');
	// Default task(s).
	grunt.registerTask('default', ['requirejs']);
};