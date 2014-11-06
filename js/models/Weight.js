// ┌────────────────────────────────────────────────────────────────────┐
// | Weight.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone'],
	function(Backbone){
		var Weight = Backbone.Model.extend({
			defaults: {
				name : null,
				hash : null,
				file : null
			}
		});
		return Weight;
	}
);