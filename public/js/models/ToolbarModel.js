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
				sizeheightratio: null
			}
		});
		return ToolbarModel;
	}
);