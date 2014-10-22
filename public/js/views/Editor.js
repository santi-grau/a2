// ┌────────────────────────────────────────────────────────────────────┐
// | Editor.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'quill', 'color'],
	function(Backbone, Quill, Color){
		var Editor = Backbone.View.extend({
			el: '#editor',
			initialize: function(){
				window.App.Collections.Fonts.once('change:css', this.setContent, this);
				window.App.Collections.Fonts.on('change:css', this.setStyles, this);
				window.App.Models.App.on('change:font', this.setFont, this);
				window.App.Models.App.on('change:weight', this.setWeight, this);
				window.App.Models.App.on('change:inverted', this.toggleColors, this);
				window.App.Models.App.on('change:color', this.setColor, this);
				window.App.Models.App.on('change:size', this.setSize, this);
				window.App.Models.App.on('change:height', this.setHeight, this);
				window.App.Collections.Fonts.on('change:loaded', this.setPercentage, this);
				window.App.Collections.Fonts.on('change:loading', this.loadFont, this);
				this.setQuill();
			},
			setQuill: function(){
				this.range = {};
				this.quill = new Quill('#editor',{
					styles: {
						'img' : {
							'position' : 'absolute',
							'width' : '155px'
						},
						'body' : {
							'overflow' : 'hidden',
							'text-rendering' : 'optimizeLegibility',
							'font-feature-settings' : 'kern',
							'-webkit-font-feature-settings': 'kern',
							'-moz-font-feature-settings' : 'kern',
							'-moz-font-feature-settings': 'kern=1'
						}
					}
				});
				this.quill.addModule('toolbar', { container: window.App.Views.Toolbar.$el[0] });
				this.quill.on('selection-change', _.bind(this.setRange, this));
				this.quill.on('text-change', _.bind(this.setNewText, this));
			},
			setNewText: function(delta, source){
				$.each(this.quill.editor.doc.lineMap, _.bind(function(index, line){
					if(this.quill.editor.doc.lineMap.length > 1 && $(line.node).text() == ''){
						var ops = line.prev.delta.ops;
						var attributes = ops[ops.length-2].attributes;
						$.each(attributes, _.bind(function(attr, value){
							this.quill.prepareFormat(attr, value);
						}, this));
					}
				}, this));
				var top = $(this.quill.root).find('.line:last').position().top;
				var height = $(this.quill.root).find('.line:last').height();
				$('#content').height(Math.max(parseInt(height) + parseInt(top) + parseInt(30), 600));
			},
			setContent: function(model){
				this.quill.setContents(model.get('defContent'));
				var currentContent = this.quill.getContents();
				ops = currentContent.ops;
				window.App.Views.Toolbar.refreshSizeHanlder(model.get('defSize'));
				window.App.Views.Toolbar.refreshHeightHanlder(model.get('defHeight'));
				this.quill.addStyles({
					'body' : {
						'font-size' : model.get('defSize') + 'px',
						'line-height' : model.get('defHeight') + 'px'
					}
				});
				window.App.Models.App.set('heightRatio', model.get('heightRatio'));
				setTimeout(_.bind(this.setNewText, this), 1000);
				this.origSize = model.get('defSize');
				this.origHeight = model.get('defHeight');
				this.origImg = 155;
			},
			setStyles: function(model){
				var css = model.get('css');
				css.forEach(_.bind(function(style, i) {
					this.quill.addStyles({
						'@font-face' : {
							'font-family' : css[i]['font-family'],
							'src' : css[i].src + " format('woff')"
						}
					});
				}, this));
			},
			setFont: function(model, attr){
				var weight  =  window.App.Models.App.get('weight');
				if(this.range && this.range.start !== null && this.range.end){
					this.quill.formatText(this.range.start, this.range.end, {
						'font': attr + '-' + weight
					});
				}
			},
			setWeight: function(model, attr){
				var font = window.App.Models.App.get('font');
				if(this.range && this.range.start !== null && this.range.end){
					this.quill.formatText(this.range.start, this.range.end, {
						'font': font + '-' + attr
					});
				}
			},
			setRange: function(range, source){
				this.range = range;
			},
			setColor: function(model){
				var rgb = model.get('color')
				if(this.range && this.range.start !== null && this.range.end){
					this.quill.formatText(this.range.start, this.range.end, {
						'color': rgb
					});
				}
			},
			setSize: function(model, size){
				this.quill.addStyles({
					'body' : {
						'font-size' : size + 'px',
					},
					'img' : {
						'width' : this.origImg * (size/this.origSize) + 'px'
					}
				});
			},
			setHeight: function(model, height){
				this.quill.addStyles({
					'body' : {
						'line-height' : height + 'px',
					}
				});
			},
			toggleColors: function(model, attr){
				$('#content').toggleClass('invert');
				var currentContent = this.quill.getContents();
				ops = currentContent.ops;
				$.each(ops, _.bind(function(i,j){
					if(j.value == 'Highlight') return;
				
						if(!j.attributes.color || j.attributes.color == 'rgb(0, 0, 0)') ops[i].attributes.color = 'rgb(255, 255, 255)';
						else if(j.attributes.color == 'rgb(255, 255, 255)') ops[i].attributes.color = 'rgb(0, 0, 0)';
					
				},this));
				this.quill.setContents(ops);
				this.setSpecials();
			},
			loadFont: function(model, loading){
				if(loading) this.$el.addClass('loading');
				else this.$el.removeClass('loading');
			},
			setPercentage: function(model, percentage){
				$('#loaderBar').css('width' , percentage + '%')
			},
			resize: function(){
				if(!this.$el.hasClass('resizing')) this.$el.addClass('resizing');
				if(!$('#resizeAlert').hasClass('active')) $('#resizeAlert').addClass('active');
			},
			resizeEnd: function(){
				_.delay(_.bind(this.setNewText, this), 200);
				this.$el.removeClass('resizing');
				$('#resizeAlert').removeClass('active');
			}
		});
		return Editor;
	}
);