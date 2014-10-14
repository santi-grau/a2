// ┌────────────────────────────────────────────────────────────────────┐
// | Options.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'color'],
	function(Backbone, Color){
		var Options = Backbone.View.extend({
			el: '#options',
			events: {
				'mousedown #outerCircle' : 'startColorDrag',
				'mousemove #outerCircle' : 'colorDrag',
				'mouseleave #outerCircle' : 'endColorDrag',
				'mouseup #outerCircle' : 'endColorDrag',
				'mousedown #invert' : 'toggleBackground',
				'mousedown .basicSelectors' : 'toggleColor'
			},
			initialize: function(data){
				_.extend(this,data);
			},
			startColorDrag: function(e){
				e.preventDefault();
				this.dragging = true;
				var circle = this.$('#outerCircle');
				var zoom = this.$('#colorZoom');
				circle.addClass('dragging')
				zoom.addClass('active');
				var color = this.getColor(e);
				App.Views.Toolbar.model.set('color', color);
			},
			getColor: function(e){
				var circCenterX = this.$('#outerCircle').width() / 2;
				var circCenterY = this.$('#outerCircle').height() / 2;
				var angle = Math.atan2(e.offsetY - circCenterY, e.offsetX - circCenterX) * 180 / Math.PI + 150;
				return Color('hsv('+ Math.abs(angle > 0 ? angle : 360+angle) +', 100%, 100%)').css();
			},
			colorDrag: function(e){
				var zoom = this.$('#colorZoom');
				zoom.css({
					'transform' : 'translate(' + ( e.offsetX - zoom.width()/2 ) + 'px,' + ( e.offsetY - zoom.height()/2 ) + 'px)',
					'-webkit-transform' : 'translate(' + ( e.offsetX - zoom.width()/2 ) + 'px,' + ( e.offsetY - zoom.height()/2 ) + 'px)'
				})
				var color = this.getColor(e);
				zoom.children().css('background-color', color);
				if(this.dragging) App.Views.Toolbar.model.set('color', color);
			},
			endColorDrag: function(e){
				this.dragging = false;
				var circle = this.$('#outerCircle');
				var zoom = this.$('#colorZoom');
				zoom.removeClass('active')
				circle.removeClass('dragging')
			},
			toggleBackground: function(){
				var toolbarModel = window.App.Models.Toolbar;
				toolbarModel.set('inverted', !toolbarModel.get('inverted'));
				// $('#content').toggleClass('invert');
				// window.App.Views.Editor.toggleColors();
			},
			toggleColor: function(e){
				e.preventDefault();
				App.Views.Toolbar.model.set('color', $(e.currentTarget).data('color'));
			}
		});
		return Options;
	}
);