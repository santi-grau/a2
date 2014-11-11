// ┌────────────────────────────────────────────────────────────────────┐
// | Weight.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone'],
	function(Backbone){
		var Weight = Backbone.Model.extend({
			defaults: {
				name : null,
				hash : null,
				files : null,
				order: null,
				status : null,
				def: null
			}
		});
		return Weight;
	}
);