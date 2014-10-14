// ┌────────────────────────────────────────────────────────────────────┐
// | Font.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone'],
	function(Backbone){
		var Font = Backbone.Model.extend({
			defaults: {
				weights : null,
				name : null,
				defContent : null,
				defSize : null,
				defHeight : null
			}
		});
		return Font;
	}
);