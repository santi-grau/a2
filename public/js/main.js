// ┌────────────────────────────────────────────────────────────────────┐
// | main.js
// └────────────────────────────────────────────────────────────────────┘
'use strict';
require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		jquery: {
			exports : '$'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		jqueryUiWidget: {
			deps: [
				'jquery'
			]
		},
		jqueryUiCore: {
			deps: [
				'jquery'
			]
		},
		jqueryUiMouse: {
			deps: [
				'jqueryUiWidget'
			]
		},
		jqueryUiDraggable: {
			deps: [
				'jqueryUiCore',
				'jqueryUiMouse',
				'jqueryUiCore'
			]
		}
	},
	paths: {
		jquery: 'libs/jquery/dist/jquery.min',
		jqueryUiCore: 'libs/jquery-ui/ui/jquery.ui.core',
		jqueryUiDraggable: 'libs/jquery-ui/ui/jquery.ui.draggable',
		jqueryUiMouse: 'libs/jquery-ui/ui/jquery.ui.mouse',
		jqueryUiWidget: 'libs/jquery-ui/ui/jquery.ui.widget',
		underscore: 'libs/underscore/underscore-min',
		backbone: 'libs/backbone/backbone',
		text: 'libs/text/text',
		quill: 'libs/quill/dist/quill',
		color: 'libs/color/one-color'
	}
});
require(['models/App', 'views/Toolbar','views/Editor','views/Options', 'collections/Fonts'],
	function(Appmodel, Toolbar, Editor, Options, Fonts){
		var App = Backbone.View.extend({
			Models : {},
			Views : {},
			Collections: {},
			el : window,
			initialize: function(){
				$.getJSON('data', _.bind(this.dataReady, this));
				this.$el.bind('scroll', _.bind(this.scrollCheck, this));
				$(window).bind('resize', _.bind(function(e){
					_.each(this.Views, function(view, index){
						if(view.resize) view.resize()
					})
					clearTimeout($.data(this, 'scrollTimer'));
					$.data(this, 'scrollTimer', setTimeout(_.bind(function() {
						_.each(this.Views, function(view, index){
							if(view.resizeEnd) view.resizeEnd();
						})
					}, this), 500));
				}, this));
			},
			scrollCheck: function(){
				var scrollTop = this.$el.scrollTop();
				this.Views.Options.fix(scrollTop > $('#content').offset().top);
			},
			dataReady: function(data){
				this.Models.App = new Appmodel()
				this.Collections.Fonts = new Fonts();
				this.Views.Toolbar = new Toolbar();
				this.Views.Options = new Options();
				this.Views.Editor = new Editor();
				this.Models.App.set(data);
				this.scrollCheck();
				$(document).bind('mouseleave', _.bind(this.Views.Editor.blur,this.Views.Editor));
			}
		})
		window.App = new App();
	}
);