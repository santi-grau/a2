// ┌────────────────────────────────────────────────────────────────────┐
// | Toolbar.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'jqueryUiDraggable', 'models/Toolbar'],
	function(Backbone, draggable, ToolbarModel){
		var Toolbar = Backbone.View.extend({
			events: {
				'mousedown #fontSelector > ul > li > a' : 'selectFont',
				'mousedown #weightSelector > ul > li > a' : 'selectWeight'
			},
			model: new ToolbarModel(),
			el: '#toolbar',
			initialize: function(){
				App.Collections.Fonts.on('add', this.addFont, this);
				App.model.on('change:fonts', this.setDefault, this);
				this.$('.dragger').draggable({ axis: "x", containment: "parent", drag: _.bind(this.model.setSlider,this.model) });
			},
			addFont: function(font){
				var fontPartial = _.template(App.model.get('fontPartial'));
				var fontElement = fontPartial({data: font.toJSON()});
				$(fontElement).appendTo('#fontList');
			},
			setDefault: function(model){
				this.setFont(model.get('defFont'));
			},
			selectFont: function(e){
				e.preventDefault();
				this.model.set('font', $(e.currentTarget).data('name'));
				this.setFont($(e.currentTarget).data('name'));
			},
			setFont: function(fontHash){
				var font = App.Collections.Fonts.find(function(m){
					if(m.get('weights').length) return (m.get('hash') == fontHash);
				});
				if(!font) return alert('* Font is not avaialbe in prototype');
				var weights = font.get('weights');
				var defWeight = font.get('defWeight');
				font.loadFont(fontHash);
				var weightPartial = _.template(App.model.get('weightPartial'));
				var partial = weightPartial({data: weights.toJSON()});
				this.$('#weightList').html(partial);
			},
			selectWeight: function(e){
				e.preventDefault();
				this.model.set('weight', $(e.currentTarget).data('name'));
			}
		});
		return Toolbar;
	}
);