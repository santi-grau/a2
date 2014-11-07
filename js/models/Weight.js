// ┌────────────────────────────────────────────────────────────────────┐
// | Weight.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone'],
	function(Backbone){
		var Weight = Backbone.Model.extend({
			defaults: {
				name : null,
				hash : null,
				file : null,
				order: null,
				status : null
			}
		});
		return Weight;
	}
);