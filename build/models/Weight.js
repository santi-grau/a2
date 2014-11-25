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
				order: 0,
				status : null,
				def: false
			}
		});
		return Weight;
	}
);