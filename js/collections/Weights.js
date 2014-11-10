// ┌────────────────────────────────────────────────────────────────────┐
// | Weights.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'models/Weight'],
	function(Backbone, Weight){
		var Weights = Backbone.Collection.extend({
			model: Weight,
			initialize: function(){
				this.on('destroy change:status change:name', window.App.Collections.Fonts.sync, window.App.Collections.Fonts);
			}
		});
		return Weights;
	}
);