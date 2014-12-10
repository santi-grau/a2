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
			cacheFont: function(font){
				var dummy = $('<span style="font-family:'+font['font-family']+'; display:none;">&nbsp;</span>').appendTo($(this.quill.root).parent());
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
							'margin-top' : '10px',
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
					this.$('iframe').contents().find("body").bind('contextmenu', _.bind(function(){
						return  this.blur();
					}, this));
					this.$('iframe').contents().find("body").keydown(_.bind(function(e){
						if(e.keyCode == 91){
							var rangeStart = this.range.start || 0;
							this.quill.setSelection(rangeStart, rangeStart);
							this.cmdPressed = true;
						}
						if(e.keyCode == 80 && this.cmdPressed){
							return this.blur();
						}
					}, this));
					this.$('iframe').contents().find("body").keyup(_.bind(function(e){
						if(e.keyCode == 91){
							this.cmdPressed = false;
						}
					}, this))
				}, this), 1000)
			},
			saveEditor: function(){
				var data = {
					app : window.App.Models.App.toJSON(),
					content : this.quill.getContents()
				}
				localStorage.setItem("_a2_font_tester_" + window.App.Models.App.get('defFont'), JSON.stringify(data));
			},
			blur: function(){
				this.quill.setSelection(0,0);
			},
			setNewText: function(delta, source){
				$.each(this.quill.editor.doc.lineMap, _.bind(function(index, line){
					if(this.quill.editor.doc.lines.length > 1 && $(line.node).text() == ''){
						var ops = line.prev.delta.ops;
						var attributes = ops[ops.length-2].attributes;
						$.each(attributes, _.bind(function(attr, value){
							this.quill.prepareFormat(attr, value);
						}, this));
					}
				}, this));
				var top = $(this.quill.root).find('.line:last').position().top;
				var height = $(this.quill.root).find('.line:last').height();
				$('#content').height(Math.max(parseInt(height) + parseInt(top) + 100, 600));
				this.saveEditor();
			},
			setFromLocalStorage: function(){
				this.origImg = 155;
				var data = $.parseJSON(localStorage.getItem("_a2_font_tester_" + window.App.Models.App.get('defFont')));
				this.quill.setContents(data.content);
				window.App.Models.App.set('size', data.app.size || 140);
				window.App.Models.App.set('height', data.app.height || 140);
				this.origSize = 140;
				this.origHeight = 140;
				window.App.Models.App.set('heightRatio', data.app.heightRatio || 1);
				window.App.Views.Toolbar.refreshSizeHanlder(window.App.Models.App.get('size'));
				window.App.Views.Toolbar.refreshHeightHanlder(window.App.Models.App.get('height'));
				this.quill.addStyles({
					'img' : {
						'width' : this.origImg * (window.App.Models.App.get('size')/this.origSize) + 'px'
					}
				});
			},
			setContent: function(model){
				var defFont = window.App.Models.App.get('defFont');
				//if(localStorage.getItem("_a2_font_tester_" + defFont)) return this.setFromLocalStorage();
				var font = window.App.Collections.Fonts.findWhere({ hash : defFont });
				var weight = font.get('weights').findWhere({def:true});
				var familyName = weight.get('familyName');
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
				var currentContent = this.quill.getContents();
				ops = currentContent.ops;
				$.each(ops, _.bind(function(i,j){
					ops[i].attributes.font = familyName;
				},this));
				this.quill.setContents(ops);
			},
			setStyles: function(model){
				var css = model.get('css');
				css.forEach(_.bind(function(style, i) {
					var font = {
						'font-family' : css[i]['font-family'],
						'src' : css[i].src + " format('woff')"
					}
					this.cacheFont(font);
					this.quill.addStyles({
						'@font-face' : font
					});
				}, this));
				this.setFont(null, model.get('hash'))
			},
			setFont: function(model, attr){
				if(!attr || attr == 'null' || attr == null) return;
				var font = attr;
				var familyName = window.App.Collections.Fonts.findWhere({ hash : font }).get('weights').findWhere({ def : true }).get('familyName');
				if(!familyName || familyName == 'null' || familyName == null) return;
				if(this.range && this.range.start !== null && this.range.end){
					this.quill.formatText(this.range.start, this.range.end, {
						'font': familyName
					});
				}
			},
			setWeight: function(model, attr){
				if(!attr || attr == 'null' || attr == null) return;
				var font = window.App.Models.App.get('font');
				var familyName = window.App.Collections.Fonts.findWhere({ hash : font }).get('weights').findWhere({ hash : attr }).get('familyName');
				if(this.range && this.range.start !== null && this.range.end){
					this.quill.formatText(this.range.start, this.range.end, {
						'font': familyName
					});
				}
			},
			setRange: function(range, source){
				this.range = range;
				if(!range) return window.App.Views.Toolbar.resetFontWeightSelectors();
				var delta = this.quill.getContents(range.start, range.end);
				
				var fonts = [];
				
				$.each(delta.ops, function(index,op){
					if(op.attributes.font) fonts.push(op.attributes.font);
				})
				var uniqueFonts = _.uniq(fonts);
				if(uniqueFonts.length == 0) return window.App.Views.Toolbar.resetFontWeightSelectors();
				if(uniqueFonts.length == 1) window.App.Views.Toolbar.refreshFontName(uniqueFonts[0]);
				else window.App.Views.Toolbar.refreshFontName(null);
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
						'line-height' : height + 'px'
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