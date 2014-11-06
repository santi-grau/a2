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
		collapsible: {
			deps: [
				'jquery'
			]
		},
		transition: {
			deps: [
				'jquery'
			]
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
		jqueryUiSortable: {
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
		jqueryUiSortable: 'libs/jquery-ui/ui/jquery.ui.sortable',
		jqueryUiMouse: 'libs/jquery-ui/ui/jquery.ui.mouse',
		jqueryUiWidget: 'libs/jquery-ui/ui/jquery.ui.widget',
		underscore: 'libs/underscore/underscore-min',
		backbone: 'libs/backbone/backbone',
		text: 'libs/text/text',
		collapsible: 'libs/bootstrap/js/collapse',
		transition: 'libs/bootstrap/js/transition',
	}
});
require(['backbone', 'collapsible', 'transition', 'jqueryUiSortable', 'collections/Fonts', 'views/Font', 'text!partials/admin_font'],
	function(Backbone, collapsible, transition, sortable, Fonts, Font, FontView){
		var App = Backbone.View.extend({
			Models : {},
			Views : {},
			Collections: {},
			el : window,
			initialize: function(){
				$('.sortable.font').sortable({
					axis: 'y',
					cancel: "a",
					handle: ".panel-heading"
				});
			},
			addFont: function(model){
				var fontPartial = _.template(FontView);
				var fontView = $(fontPartial({ data : model.toJSON() }));
				var font = new Font({ model : model, el : $(fontView).appendTo('#accordion') });
			}
		})
		window.App = new App();
		window.App.Collections.Fonts = new Fonts();
		window.App.Collections.Fonts.on('add', window.App.addFont, this);
		$.getJSON('data.json', _.bind(window.App.Collections.Fonts.setFonts, window.App.Collections.Fonts));
	}
);