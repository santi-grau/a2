// ┌────────────────────────────────────────────────────────────────────┐
// | Fonts.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'models/Font', 'collections/Weights'],
	function(Backbone, Font, Weights){
		var Fonts = Backbone.Collection.extend({
			model: Font,
			url: 'fonts.php',
			fetch : function() {
				this.on('destroy', this.removeFont, this);
				$.getJSON( this.url, _.bind(this.setFonts, this));
			},
			updatePositions: function(positions){
				_.each(positions, _.bind(function(position){
					var model = this.findWhere({hash:position.hash});
					model.set('order', position.position)
				}, this));
			},
			setFonts: function(data){
				$.each(data, _.bind(function(i,j){
					var model = this.add({
						name : j.name,
						hash : j.hash,
						defContent : j.defContent,
						defSize : j.defSize,
						defHeight : j.defHeight,
						defWeight : j.defWeight,
						buypage : j.buypage,
						heightRatio : j.defHeight / j.defSize,
						order : j.order,
						status: j.status
					});
					model.get('weights').add(j.weights)
				},this));
				console.log(this)
			}
		});
		return Fonts;
	}
);