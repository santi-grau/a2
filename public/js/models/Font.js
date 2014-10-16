// ┌────────────────────────────────────────────────────────────────────┐
// | Font.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone'],
	function(Backbone){
		var Font = Backbone.Model.extend({
			defaults: {
				weights : null,
				name : null,
				hash : null,
				defContent : null,
				defSize : null,
				defHeight : null,
				defWidth : null,
				buypage : null,
				css : null,
				loading: false
			},
			loadFont : function(font){
				if(this.get('css')) return;
				this.set('loading', true);
				$.getJSON('/single/'+font, _.bind(function(data){
					this.set({
						'css' : data
					});
					this.set('loading', false);
				}, this));
			}
		});
		return Font;
	}
);