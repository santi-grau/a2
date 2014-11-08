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
			events: {
				'drop' : 'drop',
				'dragover' : 'dragover',
				'dragleave' : 'dragleave'
			},
			initialize: function(){
				$('.sortable.fonts').sortable({
					axis: 'y',
					handle: '.sort',
					update: _.bind(this.updateFontsPositions, this),
					change: _.bind(this.updateFontOrder, this)
				});
			},
			updateFontsPositions: function(event, ui){
				var positions = [];
				$('.font').each(function(i){
					positions.push({hash: $(this).data('hash'), position: $('.font').index($(this))});
				})
				window.App.Collections.Fonts.updatePositions(positions);
			},
			updateFontOrder: function(){
				
			},
			addFont: function(model){
				var fontPartial = _.template(FontView);
				var fontView = $(fontPartial({ data : model.toJSON() }));
				var font = new Font({ model : model, el : $(fontView).appendTo('#accordion') });
			},
			removeFont: function(model, attr){
				console.log(model.get('hash'))
				$('.font[data-hash='+model.get('hash')+']').remove();
			},
			drop: function(e){
				(e && e.preventDefault) && e.preventDefault();
				alert('create font!');
			},
			dragover: function(e){
				(e && e.preventDefault) && e.preventDefault();
			},
			dragleave: function(e){
				(e && e.preventDefault) && e.preventDefault();
			}
		})
		window.App = new App();
		window.App.Collections.Fonts = new Fonts();
		window.App.Collections.Fonts.on('add', window.App.addFont, this);
		window.App.Collections.Fonts.on('destroy', window.App.removeFont, this);
		window.App.Collections.Fonts.fetch();
	}
);