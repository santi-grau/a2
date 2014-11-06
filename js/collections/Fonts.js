// ┌────────────────────────────────────────────────────────────────────┐
// | Fonts.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'models/Font', 'collections/Weights'],
	function(Backbone, Font, Weights){
		var Fonts = Backbone.Collection.extend({
			model: Font,
			url: '/fonts.php',
			initialize: function(){
			},
			setFonts: function(data){
				$.each(data, _.bind(function(i,j){
					this.add({
						name : j.name,
						hash : j.hash,
						weights : new Weights(j.weights),
						defContent : j.defContent,
						defSize : j.defSize,
						defHeight : j.defHeight,
						defWeight : j.defWeight,
						buypage : j.buypage,
						heightRatio : j.defHeight / j.defSize,
						order : j.order
					})
				},this));
			}
		});
		return Fonts;
	}
);