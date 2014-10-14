// ┌────────────────────────────────────────────────────────────────────┐
// | Toolbar.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'jqueryUiDraggable', 'models/ToolbarModel'],
	function(Backbone, draggable, ToolbarModel){
		var Toolbar = Backbone.View.extend({
			events: {
				'mousedown #fontSelector > ul > li > a' : 'selectFamily',
				'mousedown #weightSelector > ul > li > a' : 'selectWeight'
			},
			model: new ToolbarModel(),
			el: '#toolbar',
			initialize: function(data){
				_.extend(this, data);
				this.model.on('change:font', this.getFontWeights, this);
				this.$('.dragger').draggable({
					axis: "x",
					containment: "parent",
					drag: _.bind(this.setSlider,this)
				});
			},
			setSlider: function(e, ui){
				var target = $(e.target);
				var modelAttr = $(e.target).data('attr');
				var range = $(e.target).data('range');
				var val = (ui.position.left)/(target.parent().width() - target.width());
				this.model.set(modelAttr, Math.floor(range * val) + 12);
			},
			selectFamily: function(e){
				e.preventDefault();
				var fontName = $(e.currentTarget).data('name');
				this.model.set('font', fontName);
			},
			selectWeight: function(e){
				e.preventDefault();
				var weightName = $(e.currentTarget).data('name');
				this.model.set('weight', weightName);
			},
			getFontWeights: function(model){
				var font = App.Collections.Fonts.find(function(m){ return (m.get('name') == model.get('font')); });
				if(!font) return alert('* Font is not avaialbe in prototype');
				var weights = font.get('weights');
				var partial = this.weight_partial({data: weights.toJSON()});
				this.$('#weightSelector > ul').html(partial);
			}
		});
		return Toolbar;
	}
);