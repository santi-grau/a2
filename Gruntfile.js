module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			compile: {
				options: {
					almond: true,
					modules: [{name: 'main'}],
					dir: './build',
					baseUrl : "./js",
					mainConfigFile: "./js/admin.js"
				}
			}
		}
	});
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-requirejs');
	// Default task(s).
	grunt.registerTask('default', ['requirejs']);
};