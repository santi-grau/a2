// ┌────────────────────────────────────────────────────────────────────┐
// | main.js
// └────────────────────────────────────────────────────────────────────┘
'use strict';
require.config({
	shim: {
		underscore: {
			exports: '_'
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
require(['views/Toolbar','views/Editor','views/Options', 'collections/Fonts', 'text!data/data.json'],
	function(Toolbar, Editor, Options, Fonts, Data){
		window.App = {
			Models: {},
			Collections: {},
			Views: {}
		};
		App.Views.Toolbar = new Toolbar();
		App.Views.Editor = new Editor();
		App.Views.Options = new Options();
		App.Collections.Fonts = new Fonts();
		var data = $.parseJSON(Data);
		App.Collections.Fonts.buildFonts(data.fonts);
		App.Views.Toolbar.weight_partial = _.template(data.weight_partial);
		App.Views.Toolbar.model.set('font', data.display);
	}
);