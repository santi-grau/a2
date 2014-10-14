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
				defHeight : null,
				css : null
			},
			loadFont : function(font){
				if(this.get('css')) return alert('already loaded this font');
				$.ajax({
					url: '/single/'+font,
					success: _.bind(function(data){
						this.set('css', data)
					},this)
				});
			}
		});
		return Font;
	}
);