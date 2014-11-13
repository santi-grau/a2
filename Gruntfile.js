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
		},
		'sftp-deploy': {
			build: {
				auth: {
					host: 'a2-type.co.uk',
					port: 22,
					authKey: 'sftpkey'
				},
				src: './',
				dest: '/var/www/vhosts/a2-type.co.uk/httpdocs/typetester',
				exclusions: [
					'./.git',
					'./backups/*',
					'./css/*.less',
					'./fonts',
					'./js',
					'./node_modules',
					'./.bowerrc',
					'./.ftppass',
					'./.gitignore',
					'./bower.json',
					'./data.json',
					'./Gruntfile.js',
					'./package.json'
				],
				serverSep: '/',
				concurrency: 4,
				progress: true
			}
		}
	});
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-sftp-deploy');
	// Default task(s).
	grunt.registerTask('default', ['requirejs', 'clean', 'sftp-deploy']);
	grunt.registerTask('upload', ['sftp-deploy']);
};