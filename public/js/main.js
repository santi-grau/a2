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
				this.Collections.Fonts.on('change:css', this.loadCss, this);
				this.scrollCheck();
				// console.log(this)
			},
			loadCss: function(model){
				var sheet = $('<style id="' + model.get('hash') + 'Styles" type="text/css" />').appendTo('head');
				var css = model.get('css');
				css.forEach(function(style, i) {
					var rule = "@font-face { font-family: " + style['font-family'] + "; src: " + style.src + " format('woff'); }";
					$(sheet).append(rule);
				});
			}
		})
		window.App = new App();
	}
);