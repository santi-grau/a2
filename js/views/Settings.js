// ┌────────────────────────────────────────────────────────────────────┐
// | Settings.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'quill', 'color'],
	function(Backbone, Quill, Color){
		var Settings = Backbone.View.extend({
			el: '#settings',
			events: {
				
			},
			initialize: function(){
				this.$el.addClass('active');
				
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
							'-moz-font-feature-settings': 'kern=1'
						}
					}
				});
				this.quill.setContents(this.model.get('defContent'));
				this.quill.addStyles({
					'body' : {
						'font-size' : this.model.get('defSize') + 'px',
						'line-height' : this.model.get('defHeight') + 'px'
					}
				});
			}
		});
		return Settings;
	}
);