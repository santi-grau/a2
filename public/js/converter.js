require.config({
	paths: {
		'angular': 'libs/angular/angular.min',
		'angularAMD': 'libs/angularAMD/angularAMD.min'
	},
	shim: {
		'angularAMD': ['angular']
	},
	deps: ['controllers/app']
});