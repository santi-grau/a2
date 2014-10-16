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
				defFont : 'regular',
				font : null,
				weight : null,
				size : null,
				height : null,
				sizeheightratio: null,
				inverted: false,
				lineRange : []
			},
			setSlider: function(e, ui){
				var target = $(e.target);
				var modelAttr = $(e.target).data('attr');
				var range = $(e.target).data('range');
				var val = (ui.position.left)/(target.parent().width() - target.width());
				this.set(modelAttr, Math.floor(range * val));
			}
		});
		return App;
	}
);