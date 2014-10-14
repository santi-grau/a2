// ┌────────────────────────────────────────────────────────────────────┐
// | ToolbarModel.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone'],
	function(Backbone){
		var ToolbarModel = Backbone.Model.extend({
			defaults: {
				font : null,
				weight : null,
				size : null,
				height : null,
				sizeheightratio: null,
				inverted: false
			},
			initialize: function(){
				
			},
			setDefault: function(model){
				console.log(model)
			},
			setSlider: function(e, ui){
				var target = $(e.target);
				var modelAttr = $(e.target).data('attr');
				var range = $(e.target).data('range');
				var val = (ui.position.left)/(target.parent().width() - target.width());
				this.set(modelAttr, Math.floor(range * val));
			}
		});
		return ToolbarModel;
	}
);