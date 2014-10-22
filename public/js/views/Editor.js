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
							'width' : '155px',
							'margin-top' : '-25px'
						},
						'body' : {
							'overflow' : 'hidden',
							'line-height' : '100px',
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
				setTimeout(_.bind(function(){
					this.setSpecials();
				},this),1000);
			},
			setNewText: function(range, source){
				var top = $(this.quill.root).find('.line:last').position().top;
				var height = $(this.quill.root).find('.line:last').height();
				$('#content').height(parseInt(height) + parseInt(top) + parseInt(30))
			},
			setContent: function(model){
				this.quill.setContents(model.get('defContent'));
				var currentContent = this.quill.getContents();
				ops = currentContent.ops;
				window.App.Views.Toolbar.refreshSizeHanlder(parseInt(ops[0].attributes.size));
				var firstLineHeight = parseInt($(this.quill.root).find('.line:eq(0)').css('line-height'));
				window.App.Views.Toolbar.refreshHeightHanlder(firstLineHeight);
				setTimeout(_.bind(this.setNewText, this), 1000)
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
				var selection = this.quill.getSelection();
				if(range && range.start !== null && range.end) var opsAtRange = this.quill.getContents(range.start,range.end).ops;
				if(!range) return;
				var fontSizes = [];;
				$.each(opsAtRange, _.bind(function(i,ops){
					$.each(ops.attributes, _.bind(function(j,attr){
						if(j == 'size') fontSizes.push(attr)
					},this));
				},this));
				var uniq = _.uniq(fontSizes);
				if(uniq.length == 1){
					window.App.Views.Toolbar.refreshSizeHanlder(uniq[0]);
				}
				var rangeCount = 0;
				var lineRange = [];
				var adding = false;
				$.each(this.quill.editor.doc.lineMap, _.bind(function(i,j){
					if(range.start >= rangeCount && range.start < rangeCount + j.length) adding = true;
					if(adding) lineRange.push(i)
					if(range.end > rangeCount && range.end <= rangeCount + j.length) adding = false;
					rangeCount += j.length
				}, this))
				window.App.Models.App.set('lineRange', lineRange);
			},
			setSpecials: function(){
				
			},
			setColor: function(model){
				var rgb = model.get('color')
				if(this.range && this.range.start !== null && this.range.end){
					this.quill.formatText(this.range.start, this.range.end, {
						'color': rgb
					});
				}
			},
			setSize: function(model){
				var size = model.get('size');
				if(this.range && this.range.start !== null && this.range.end){
					this.quill.formatText(this.range.start, this.range.end, {
						'size': size + 'px'
					});
				}
				if(this.range && this.range.start && this.range.end && this.range.start !== this.range.end){
					var styles = {};
					$.each(window.App.Models.App.get('lineRange'), _.bind(function(i, j){
						styles['#' + j] = { 'line-height' : size*.9 + 'px' }
					},this));
					window.App.Views.Toolbar.refreshHeightHanlder(size*.9 );
					this.quill.addStyles(styles);
				}
			},
			setHeight: function(model, attr){
				var styles = {};
				$.each(window.App.Models.App.get('lineRange'), _.bind(function(i, j){
					styles['#' + j] = { 'line-height' : attr + 'px' }
				},this));
				this.quill.addStyles(styles);
			},
			toggleColors: function(model, attr){
				$('#content').toggleClass('invert');
				var currentContent = this.quill.getContents();
				ops = currentContent.ops;
				$.each(ops, _.bind(function(i,j){
					if(j.value == 'Highlight') return;
					if(j.value == 'BUY') return;
					if(attr) {
						if(!j.attributes.color || j.attributes.color == 'rgb(0, 0, 0)') ops[i].attributes.color = 'rgb(255, 255, 255)';
					}else{
						if(j.attributes.color == 'rgb(255, 255, 255)') ops[i].attributes.color = 'rgb(0, 0, 0)';
					}
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