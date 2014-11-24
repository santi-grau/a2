// ┌────────────────────────────────────────────────────────────────────┐
// | Fonts.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'models/Font', 'collections/Weights'],
	function(Backbone, Font, Weights){
		var Fonts = Backbone.Collection.extend({
			model: Font,
			comparator: 'order',
			url: 'fonts.php',
			initialize: function(){
				this.on('destroy change:status', this.sync, this);
			},
			fetch : function() {
				$.getJSON( this.url, _.bind(this.setFonts, this));
			},
			sync: function(){
				console.log('--------- data saved: ----------' + (new Date).getTime());
				$.ajax({
					type: "POST",
					url: "fonts.php",
					data: {action: 'updateData', data : JSON.stringify(this)},
					success: function(data){
						setTimeout(function(){
							$('#saving').removeClass('active');
						}, 200)
					}
				});
				$('#saving').addClass('active');
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
						def : j.def,
						status: j.status
					});
					model.get('weights').add(j.weights)
				},this));
				console.log('Fonts');
				console.log(this);
				console.log('- - - - - - - - - - - - - - - ');
			}
		});
		return Fonts;
	}
);