// ┌────────────────────────────────────────────────────────────────────┐
// | Editor.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'quill', 'color'],
	function(Backbone, Quill, Color){
		var Editor = Backbone.View.extend({
			el: '#editor',
			initialize: function(){
				window.App.Views.Toolbar.model.on('change:font', this.setFont, this);
				window.App.Views.Toolbar.model.on('change:weight', this.setWeight, this);
				window.App.Views.Toolbar.model.on('change:color', this.setColor, this);
				window.App.Views.Toolbar.model.on('change:size', this.setSize, this);
				window.App.Views.Toolbar.model.on('change:height', this.setHeight, this);
				this.range = {};
				this.quill = new Quill('#editor',{
					styles: {
						'img' : {
							'width' : 'auto !important',
							'position' : 'relative'
						}
					}
				});
				this.quill.addModule('toolbar', { container: window.App.Views.Toolbar.$el[0] });
				//this.quill.on('text-change', _.bind(this.setEditorHeight, this));
				this.quill.on('selection-change', _.bind(this.setRange, this));
				this.$el.addClass('ready');
			},
			setEditorHeight: function(){
				var lastSpan = null;
				if($("#editor iframe").contents().find(".line").length) lastSpan = $("#editor iframe").contents().find(".line").last();
				setTimeout(_.bind(function(){
					if(lastSpan){
						this.$el.css('height' , lastSpan.offset().top + lastSpan.height() + 150)
					}else{
						this.$el.css('height' , '600px')
					}
				},this), 100)
			},
			setRange: function(range, source){
				//this.setEditorHeight();
				this.range = range;
				var selection = this.quill.getSelection();
			},
			setColor: function(model){
				var rgb = model.get('color')
				if(this.range && this.range.start !== null && this.range.end){
					this.quill.formatText(this.range.start, this.range.end, {
						'color': rgb
					});
				}
			},
			setFont: function(model){
				var font = App.Collections.Fonts.find(function(m){ return (m.get('name') == model.get('font')); });
				if(!font) return;
				this.quill.addStyles('css/' + model.get('font') + '.css');
				var weights = font.get('weights');
				var def = weights.find(function(m){ return m.get('def'); });
				App.Views.Toolbar.model.set('weight', def.get('hash'));
				if(!model.previousAttributes().font) this.setContent(font);
			},
			setContent: function(font){
				var defSize = font.get('defSize');
				var defHeight = font.get('defHeight');
				var toolbar = window.App.Views.Toolbar;
				this.quill.setContents($.parseJSON(font.get('defContent')));
				toolbar.model.set({
					'sizeheightratio' : defHeight/defSize,
					'size' : defSize,
					'height' : defSize * (defHeight/defSize)
				});
				toolbar.$('#sizeSelector .dragger').css({
					left : ((defSize - 12) / toolbar.$('#sizeSelector .dragger').data('range')) * toolbar.$('#sizeSelector').innerWidth()
				});
				toolbar.$('#heightSelector .dragger').css({
					left : ((defHeight) / toolbar.$('#heightSelector .dragger').data('range')) * toolbar.$('#heightSelector').innerWidth()
				})
			},
			setSize: function(model){
				var size = model.get('size');
				var sizeheightratio = model.get('sizeheightratio');
				var toolbar = window.App.Views.Toolbar;
				var heightDragger = toolbar.$('#heightSelector .dragger');
				var heightDraggerVal = Math.max(0,Math.min(size * sizeheightratio, heightDragger.data('range') - heightDragger.width()));
				model.set('height', heightDraggerVal);
				this.quill.addStyles({
					'body': {
						'font-size': size + 'px'
					},
					'img' : {
						'height' : size + 'px !important',
						'top' : size/10 + 'px'
					}
				})
			},
			setHeight: function(model){  //////// fix this shit
				var height = model.get('height');
				var toolbar = window.App.Views.Toolbar;
				toolbar.$('#heightSelector .dragger').css({
					left : ((height)/toolbar.$('#heightSelector .dragger').data('range')) * toolbar.$('#heightSelector').innerWidth()
					//left : heightDraggerVal / toolbar.$('#heightSelector .dragger').data('range') * toolbar.$('#heightSelector').innerWidth()
				})
				this.quill.addStyles({
					'body': {
						'line-height': height + 'px'
					}
				})
				toolbar.model.set('sizeheightratio', model.get('height')/model.get('size'));
			},
			setWeight: function(model){
				if(this.range && this.range.start !== null && this.range.end){
					this.quill.formatText(this.range.start, this.range.end, {
						'font': model.get('weight')
					});
				}
			},
			toggleColors: function(){
				this.oldops = [];
				this.newops = [];
				var currentContent = this.quill.getContents();
				this.oldops = currentContent.ops;
				$.each(currentContent.ops, _.bind(function(i,j){
					this.newops.push(j);
					if(j.attributes.color) var color = (this.invertColor(Color(j.attributes.color).hex()));
					else var color = '#FFFFFF';
					this.newops[i].attributes.color = Color(color).css();
				},this));
				this.quill.setContents(this.newops);
			},
			invertColor: function(hexTripletColor) {
				return "#" + ("000000" + (0xFFFFFF ^ parseInt(hexTripletColor.substring(1), 16)).toString(16)).slice(-6);
			}
		});
		return Editor;
	}
);