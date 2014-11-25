// ┌────────────────────────────────────────────────────────────────────┐
// | Toolbar.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'jqueryUiDraggable'],
	function(Backbone, draggable){
		var Toolbar = Backbone.View.extend({
			events: {
				'mousedown #fontSelector > ul > li > a' : 'selectFont',
				'mousedown #weightSelector > ul > li > a' : 'selectWeight'
			},
			el: '#toolbar',
			initialize: function(){
				App.Collections.Fonts.on('add', this.addFontMenuItem, this);
				App.Models.App.once('change:fonts', this.setDefault, this);
				this.$('.dragger').draggable({
					axis: "x",
					containment: "parent",
					drag: _.bind( App.Models.App.setSlider, App.Models.App),
					stop: _.bind( this.dragStop, this)
				});
				window.App.Models.App.set('maxLineHeight', this.$('.dragger[data-attr=height]').data('range'));
			},
			dragStop: function(){
				App.Views.Editor.setNewText();
				window.App.Views.Editor.saveEditor();
			},
			addFontMenuItem: function(font){
				var fontPartial = _.template(App.Models.App.get('font_partial'));
				var fontElement = fontPartial({data: font.toJSON()});
				$(fontElement).appendTo('#fontList');
			},
			setDefault: function(model){
				var font = model.get('defFont');
				this.setNewFont(font);
			},
			selectFont: function(e){
				e.preventDefault();
				var fontHash = $(e.currentTarget).data('hash');
				if(App.Models.App.get('font') == fontHash) this.resetFont(fontHash);
				else this.setNewFont(fontHash);
			},
			resetFont: function(fontHash){
				var font = App.Collections.Fonts.find(function(m){
					if(m.get('weights').length) return (m.get('hash') == fontHash);
				});
				window.App.Models.App.trigger('change:font', window.App.Models.App, fontHash);
				var weights = font.get('weights');
				var defWeight = weights.findWhere({ def : true}).get('hash');
				if(App.Models.App.get('weight') == defWeight){
					window.App.Models.App.trigger('change:weight', window.App.Models.App, defWeight);
				}else{
					window.App.Models.App.trigger('change:weight', window.App.Models.App, defWeight);
					var weight = weights.findWhere({ hash : defWeight})
					weight.get('name');
				}
			},
			setNewFont: function(fontHash){
				var font = App.Collections.Fonts.find(function(m){
					if(m.get('weights').length) return (m.get('hash') == fontHash);
				});
				var weights = font.get('weights');
				var name = font.get('name');
				var defWeight = font.get('weights').findWhere({ def : true}).get('hash');
				var weight = weights.findWhere({ def : true}).get('name');
				var weightPartial = _.template(App.Models.App.get('weight_partial'));
				var partial = weightPartial({data: weights.toJSON()});
				var firstSet = (App.Models.App.get('font') == null);
				App.Models.App.set('font', fontHash);
				App.Models.App.set('weight', defWeight);
				this.$('#weightList').html(partial);
				font.loadFont(fontHash);
				if(!firstSet){
					this.$('#fontTitle').html(name);
					this.$('#weightTitle').html(weight);
				}else{
					App.Models.App.set('font', 'null');
					App.Models.App.set('weight', 'null');
				}
			},
			selectWeight: function(e){
				e.preventDefault();
				var weightHash = $(e.currentTarget).data('hash');
				if(App.Models.App.get('weight') == weightHash){
					this.resetWeight(weightHash);
				}else{
					this.setNewWeight(weightHash);
				}
			},
			resetWeight: function(weightHash){
				window.App.Models.App.trigger('change:weight', window.App.Models.App, weightHash);
			},
			setNewWeight: function(weightHash){
				var fontHash = App.Models.App.get('font');
				if(!fontHash || fontHash == 'null' || fontHash == null) return;
				var fontModel = App.Collections.Fonts.findWhere({ hash : fontHash});
				var weights = fontModel.get('weights');
				var weight = weights.findWhere({ hash : weightHash});
				this.$('#weightTitle').html(weight.get('name'));
				App.Models.App.set('weight', weightHash);
			},
			refreshSizeHanlder: function(size){
				$('#sizeSelector .dragger').css('left', parseInt(size)/$('#sizeSelector .dragger').data('range') * $('#sizeSelector').width());
			},
			refreshHeightHanlder: function(size){
				$('#heightSelector .dragger').css('left', parseInt(size)/$('#heightSelector .dragger').data('range') * $('#heightSelector').width());
			},
			refreshFontName: function(hash){
				var weight;
				var font;
				if(!hash) return this.resetFontWeightSelectors();
				window.App.Collections.Fonts.each(function(f){
					w = f.get('weights').findWhere({ familyName : hash });
					if(w){
						weight = w;
						font = f;
					}
				});
				App.Models.App.set('font', font.get('hash'), {silent: true});
				this.$('#fontTitle').html(font.get('name'));
				this.$('#weightTitle').html(weight.get('name'));
			},
			resetFontWeightSelectors: function(){
				this.$('#fontTitle').html('Select font');
				this.$('#weightTitle').html('Weight / Style');
			}
		});
		return Toolbar;
	}
);