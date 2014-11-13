module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			compile: {
				options: {
					almond: true,
					modules: [{name: 'admin'},{name: 'tester'}],
					dir: './build',
					baseUrl : "./js",
					mainConfigFile: "./js/admin.js"
				}
			}
		},
		clean: {
			build: ["build/*", "!build/tester.js", "!build/admin.js"]
		}
	});
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-sftp-deploy');
	// Default task(s).
	grunt.registerTask('default', ['requirejs', 'clean']);
};