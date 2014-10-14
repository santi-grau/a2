// ┌────────────────────────────────────────────────────────────────────┐
// | Weights.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'models/Weight'],
	function(Backbone, Weight){
		var Weights = Backbone.Collection.extend({
			model: Weight
		});
		return Weights;
	}
);