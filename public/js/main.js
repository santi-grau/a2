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
		quill: 'libs/quill/dist/quill.min',
		color: 'libs/color/one-color'
	}
});
require(['models/App', 'views/Toolbar','views/Editor','views/Options', 'collections/Fonts'],
	function(Appmodel, Toolbar, Editor, Options, Fonts){
		var App = Backbone.View.extend({
			Models : {},
			Views : {},
			Collections: {},
			model : new Appmodel(),
			el : window,
			initialize: function(){
				$.getJSON('data', _.bind(this.dataReady, this));
			},
			dataReady: function(data){
				this.Collections.Fonts = new Fonts()
				this.Views.Toolbar = new Toolbar();
				this.Views.Options = new Options();
				this.Views.Editor = new Editor();
				this.model.set(data);
				this.Collections.Fonts.on('change:css', this.loadCss, this);
			},
			loadCss: function(model){
				console.log(model)
				$('<style type="text/css" />').html(model.get('css')).appendTo('head')
				// document.body.appendChild(css);
			}
		})
		window.App = new App();
	}
);