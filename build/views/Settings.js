// ┌────────────────────────────────────────────────────────────────────┐
// | Settings.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'quill', 'color', 'text!partials/admin_settings.js'],
	function(Backbone, Quill, Color, SettingsView){
		var Settings = Backbone.View.extend({
			el: '#settings',
			events: {
				'change #sizeInput, #heightInput, #buyInput, #hashInput' : 'stopTyping',
				'keyup #buyInput, #hashInput' : 'stopTyping',
				'click .closebut': 'closeSettings',
				'change #sizeInput, #heightInput' : 'updateQuill',
				'keyup #sizeInput, #heightInput' : 'updateQuill',
				'mousedown #outerCircle' : 'startColorDrag',
				'mousemove #outerCircle' : 'colorDrag',
				'mouseleave #outerCircle' : 'endColorDrag',
				'mouseup #outerCircle' : 'endColorDrag'
			},
			initialize: function(){
				var settingsPartial = _.template(SettingsView);
				var settingsView = $(settingsPartial({ data : this.model.toJSON() })).appendTo(this.$el);
				this.$el.addClass('active');
				$('body').addClass('settings');
				this.quill = new Quill('#editor',{
					styles: {
						'img' : {
							'position' : 'absolute',
							'width' : '155px'
						},
						'body' : {
							'text-rendering' : 'optimizeLegibility',
							'font-feature-settings' : 'kern',
							'-webkit-font-feature-settings': 'kern',
							'-moz-font-feature-settings' : 'kern',
							'-moz-font-feature-settings': 'kern=1',
							'font-size' : this.model.get('defSize') + 'px',
							'line-height' : this.model.get('defHeight') + 'px'
						},
						'.line:first-child' : {
							'margin-top' : '50px'
						}
					}
				});
				
				this.quill.setContents(this.model.get('defContent'));
				var fontFiles = $.parseJSON(this.model.get('weights').findWhere({ def : true }).get('files')).woff;
				var totalFiles = fontFiles.length - 1;
				var fontFamily = '';
				$.each(fontFiles, _.bind(function(i,j){
					fontFamily += 'f' + j.split('.')[0];
					$.ajax({ 
						async:false, url: basePath + "fonts/"+j, success: _.bind(function(data){
							this.quill.addStyles({
								'@font-face' : {
									'font-family' : '"f' + j.split('.')[0] +'"',
									'src' : 'url(' + data + ") format('woff')"
								}
							})
							if(totalFiles > 0) totalFiles--;
							else return;
							fontFamily += ',';
						}, this)
					});
				}, this));
				this.quill.addStyles({
					'body' : {
						'font-family' : fontFamily
					}
				});
				this.quill.on('text-change', _.bind(this.textChange, this));
			},
			closeSettings: function(){
				this.undelegateEvents();
				this.$el.removeClass('active');
				$('body').removeClass('settings');
				setTimeout(_.bind(function(){
					this.$el.html('');
				}, this), 500);
			},
			stopTyping: function(){
				if(this.typingInterval) clearTimeout(this.typingInterval);
				this.typingInterval = setTimeout(_.bind(this.saveSettings, this), 500);
			},
			saveSettings: function(){
				this.model.set({
					hash : this.$('#hashInput').val(),
					defSize : this.$('#sizeInput').val(),
					defHeight : this.$('#heightInput').val(),
					buypage : this.$('#buyInput').val()
				});
				window.App.Collections.Fonts.sync();
			},
			updateQuill: function(){
				this.quill.addStyles({
					'body' : {
						'font-size' : this.$('#sizeInput').val() + 'px',
						'line-height' : this.$('#heightInput').val() + 'px'
					}
				});
			},
			startColorDrag: function(e){
				e.preventDefault();
				this.dragging = true;
				var circle = this.$('#outerCircle');
				var zoom = this.$('#colorZoom');
				circle.addClass('dragging')
				zoom.addClass('active');
				var color = this.getColor(e);
			},
			getColor: function(e){
				var blackTolerance = 10;
				var circCenterX = this.$('#outerCircle').width() / 2;
				var circCenterY = this.$('#outerCircle').height() / 2;
				var angle = Math.atan2(e.offsetY - circCenterY, e.offsetX - circCenterX) * 180 / Math.PI + 150;
				var distance = this.lineDistance({ x: circCenterX, y: circCenterY }, { x: e.offsetX , y: e.offsetY });
				var level = Math.max(Math.min((distance - 10) / (($('#outerCircle').width() / 2) - 11)),0) * 100 + '%';
				if(distance > this.$('#centerCircle').width() / 2 +blackTolerance) return Color('hsv('+ Math.abs(angle > 0 ? angle : 360+angle) +', 100%, '+level+')').css();
				else if(distance > this.$('#centerCircle').width() / 2 && distance < this.$('#centerCircle').width() / 2 + blackTolerance) return Color('hsv(0, 0%, 0%)').css();
				else return Color('hsv(0, 0%, 100%)').css();
			},
			colorDrag: function(e){
				var zoom = this.$('#colorZoom');
				zoom.css({
					'-webkit-transform' : 'translate(' + ( e.offsetX - zoom.width()/2 ) + 'px,' + ( e.offsetY - zoom.height()/2 ) + 'px)',
					'-moz-transform' : 'translate(' + ( e.offsetX - zoom.width()/2 ) + 'px,' + ( e.offsetY - zoom.height()/2 ) + 'px)',
					'-ms-transform' : 'translate(' + ( e.offsetX - zoom.width()/2 ) + 'px,' + ( e.offsetY - zoom.height()/2 ) + 'px)',
					'-o-transform' : 'translate(' + ( e.offsetX - zoom.width()/2 ) + 'px,' + ( e.offsetY - zoom.height()/2 ) + 'px)',
					'transform' : 'translate(' + ( e.offsetX - zoom.width()/2 ) + 'px,' + ( e.offsetY - zoom.height()/2 ) + 'px)'
				});
				var color = this.getColor(e);
				zoom.children().css('background-color', color);
				if(this.dragging) this.setColor(color);
			},
			endColorDrag: function(e){
				this.dragging = false;
				var circle = this.$('#outerCircle');
				var zoom = this.$('#colorZoom');
				zoom.removeClass('active');
				circle.removeClass('dragging');
				if(this.dragging) this.updateContent();
			},
			centerCircle: function(e){
				e.preventDefault();
				App.Models.App.set('color', 'rgb(255,255,255)');
			},
			lineDistance: function( point1, point2 ){
				var xs = Math.pow(point2.x - point1.x, 2);
				var ys = Math.pow(point2.y - point1.y, 2);
				return Math.sqrt( xs + ys );
			},
			setColor: function(rgb){
				var range = this.quill.getSelection();
				if(range && range.start !== null && range.end){
					this.quill.formatText(range.start, range.end, {
						'color': rgb
					});
				}
			},
			textChange: function(){
				if(this.typingInterval) clearTimeout(this.typingInterval);
				this.typingInterval = setTimeout(_.bind(this.updateContent, this), 500);
			},
			updateContent: function(){
				console.log(this.quill.getContents().ops);
				this.model.set('defContent' , this.quill.getContents().ops);
				window.App.Collections.Fonts.sync();
			}
		});
		return Settings;
	}
);