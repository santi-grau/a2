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
				'mousedown #buy' : 'buyFont'
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
				App.Models.App.set('color', color);
			},
			getColor: function(e){
				var circCenterX = this.$('#outerCircle').width() / 2;
				var circCenterY = this.$('#outerCircle').height() / 2;
				var angle = Math.atan2(e.offsetY - circCenterY, e.offsetX - circCenterX) * 180 / Math.PI + 150;
				var distance = this.lineDistance({ x: circCenterX, y: circCenterY }, { x: e.offsetX , y: e.offsetY })
				var level = Math.max(Math.min((distance - 10) / (($('#outerCircle').width() / 2) - 11)),0) * 100 + '%';
				return Color('hsv('+ Math.abs(angle > 0 ? angle : 360+angle) +', 100%, '+level+')').css();
			},
			colorDrag: function(e){
				var zoom = this.$('#colorZoom');
				zoom.css({
					'-webkit-transform' : 'translate(' + ( e.offsetX - zoom.width()/2 ) + 'px,' + ( e.offsetY - zoom.height()/2 ) + 'px)',
					'-moz-transform' : 'translate(' + ( e.offsetX - zoom.width()/2 ) + 'px,' + ( e.offsetY - zoom.height()/2 ) + 'px)',
					'-ms-transform' : 'translate(' + ( e.offsetX - zoom.width()/2 ) + 'px,' + ( e.offsetY - zoom.height()/2 ) + 'px)',
					'-o-transform' : 'translate(' + ( e.offsetX - zoom.width()/2 ) + 'px,' + ( e.offsetY - zoom.height()/2 ) + 'px)',
					'transform' : 'translate(' + ( e.offsetX - zoom.width()/2 ) + 'px,' + ( e.offsetY - zoom.height()/2 ) + 'px)'
				})
				var color = this.getColor(e);
				zoom.children().css('background-color', color);
				if(this.dragging) App.Models.App.set('color', color);
			},
			endColorDrag: function(e){
				this.dragging = false;
				var circle = this.$('#outerCircle');
				var zoom = this.$('#colorZoom');
				zoom.removeClass('active')
				circle.removeClass('dragging')
			},
			toggleBackground: function(){
				window.App.Models.App.set('inverted', !window.App.Models.App.get('inverted'));
			},
			buyFont: function(){
				var currentFont = window.App.Models.App.get('font');
				var font = App.Collections.Fonts.findWhere({hash : currentFont});
				location.href = font.get('buypage');
			},
			lineDistance: function( point1, point2 ){
				var xs = Math.pow(point2.x - point1.x, 2);
				var ys = Math.pow(point2.y - point1.y, 2);
				return Math.sqrt( xs + ys );
			},
			fix: function(fixed){
				if(fixed && !this.$el.hasClass('fixed')) this.$el.addClass('fixed');
				if(!fixed && this.$el.hasClass('fixed')) this.$el.removeClass('fixed');
			}
		});
		return Options;
	}
);