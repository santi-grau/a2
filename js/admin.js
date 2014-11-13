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
			deps: [ 'underscore', 'jquery' ],
			exports: 'Backbone'
		},
		collapsible: {
			deps: [ 'jquery' ]
		},
		transition: {
			deps: [ 'jquery' ]
		},
		dropdown: {
			deps: [ 'jquery' ]
		},
		jqueryUiWidget: {
			deps: [ 'jquery' ]
		},
		jqueryUiCore: {
			deps: [ 'jquery' ]
		},
		jqueryUiMouse: {
			deps: [ 'jqueryUiWidget' ]
		},
		jqueryUiDraggable: {
			deps: [ 'jqueryUiCore', 'jqueryUiMouse']
		},
		jqueryUiSortable: {
			deps: [ 'jqueryUiCore', 'jqueryUiMouse']
		}
	},
	paths: {
		jquery: 'libs/jquery/dist/jquery.min',
		jqueryUiCore: 'libs/jquery-ui/ui/jquery.ui.core',
		jqueryUiSortable: 'libs/jquery-ui/ui/jquery.ui.sortable',
		jqueryUiDraggable: 'libs/jquery-ui/ui/jquery.ui.draggable',
		jqueryUiMouse: 'libs/jquery-ui/ui/jquery.ui.mouse',
		jqueryUiWidget: 'libs/jquery-ui/ui/jquery.ui.widget',
		underscore: 'libs/underscore/underscore-min',
		backbone: 'libs/backbone/backbone',
		text: 'libs/text/text',
		collapsible: 'libs/bootstrap/js/collapse',
		transition: 'libs/bootstrap/js/transition',
		dropdown: 'libs/bootstrap/js/dropdown',
		quill: 'libs/quill/dist/quill',
		color: 'libs/color/one-color'
	}
});
require(['backbone', 'collapsible', 'transition', 'dropdown', 'jqueryUiSortable', 'collections/Fonts', 'views/Font', 'text!partials/admin_font'],
	function(Backbone, collapsible, transition, dropdown, sortable, Fonts, Font, FontView){
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
					update: _.bind(this.updateFontsPositions, this)
				});
			},
			updateFontsPositions: function(event, ui){
				var positions = [];
				$('.font').each(function(i){
					positions.push({hash: $(this).data('hash'), position: $('.font').index($(this))});
				})
				window.App.Collections.Fonts.updatePositions(positions);
				window.App.Collections.Fonts.sort();
				window.App.Collections.Fonts.sync();
			},
			addFont: function(model){
				var fontPartial = _.template(FontView);
				var fontView = $(fontPartial({ data : model.toJSON() }));
				if(model.get('order') !== -1) fontView.appendTo('#accordion');
				else fontView.prependTo('#accordion');
				new Font({ model : model, el : fontView});
			},
			removeFont: function(model, attr){
				$('.font[data-hash='+model.get('hash')+']').remove();
			},
			drop: function(e){
				(e && e.preventDefault) && e.preventDefault();
				$('body').removeClass('dragging');
				var model = this.Collections.Fonts.add({
					name : 'New Font',
					hash : 'new_font_' + (new Date).getTime(),
					defSize : 140,
					defHeight : 120,
					order: -1
				});
				var dt = e.originalEvent.dataTransfer;
				var filesLength = dt.files.length;
				model.uploadFonts(dt.files);
				model.set('loading', true);
				model.get('weights').once('add', function(m){
					m.set('def', true);
				});
				model.get('weights').on('add', function(m){
					if(model.get('weights').length == filesLength){
						model.set('loading', false);
						m.once('change:files', function(){
							window.App.Collections.Fonts.sync();
						})
					}
				});
			},
			dragover: function(e){
				(e && e.preventDefault) && e.preventDefault();
				if($(e.target).prop("tagName").toLowerCase() == 'html') $('body').addClass('dragging');
			},
			dragleave: function(e){
				(e && e.preventDefault) && e.preventDefault();
				$('body').removeClass('dragging');
			}
		})
		window.App = new App();
		window.App.Collections.Fonts = new Fonts();
		window.App.Collections.Fonts.on('add', window.App.addFont, this);
		window.App.Collections.Fonts.on('destroy', window.App.removeFont, this);
		window.App.Collections.Fonts.fetch();
	}
);