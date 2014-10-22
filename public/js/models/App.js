// ┌────────────────────────────────────────────────────────────────────┐
// | App.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone'],
	function(Backbone){
		var App = Backbone.Model.extend({
			defaults: {
				font_partial : null,
				weight_partial : null,
				fonts : null,
				defFont : 'regular',
				font : null,
				weight : null,
				size : null,
				height : null,
				heightRatio: null,
				inverted: false,
				maxLineHeight: null
			},
			setSlider: function(e, ui){
				var target = $(e.target);
				var modelAttr = $(e.target).data('attr');
				var range = $(e.target).data('range');
				var val = (ui.position.left)/(target.parent().width() - target.width());
				this.set(modelAttr, Math.floor(range * val));
				if(modelAttr == 'height'){
					this.set('heightRatio', this.get('height') / this.get('size'))
				}
				if(modelAttr == 'size'){
					var lineHeight = Math.max(Math.min(this.get('heightRatio') * this.get('size'), this.get('maxLineHeight')), 0);
					this.set('height', lineHeight);
					window.App.Views.Toolbar.refreshHeightHanlder(lineHeight);
				}
			}
		});
		return App;
	}
);