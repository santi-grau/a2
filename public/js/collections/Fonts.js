// ┌────────────────────────────────────────────────────────────────────┐
// | Fonts.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'models/Font', 'collections/Weights'],
	function(Backbone, Font, Weights){
		var Fonts = Backbone.Collection.extend({
			model: Font,
			initialize: function(){
			},
			buildFonts: function(fonts){
				$.each(fonts, _.bind(function(i,j){
					this.add({
						name : j.name,
						weights : new Weights(j.weights),
						defContent : j.defContent,
						defSize : j.defSize,
						defHeight : j.defHeight
					})
				},this));
			}
		});
		return Fonts;
	}
);