// ┌────────────────────────────────────────────────────────────────────┐
// | App.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone'],
	function(Backbone){
		var App = Backbone.Model.extend({
			defaults: {
				font_partial : null,
				weight_partial : null,
				fonts : null,
				defFont : 'regular'
			}
		});
		return App;
	}
);