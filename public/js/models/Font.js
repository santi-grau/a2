// ┌────────────────────────────────────────────────────────────────────┐
// | Font.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone'],
	function(Backbone){
		var Font = Backbone.Model.extend({
			defaults: {
				weights : null,
				name : null,
				hash : null,
				defContent : null,
				defSize : null,
				defHeight : null,
				defWidth : null,
				buypage : null,
				css : null,
				loading : false,
				loaded : 0,
				heightRatio : null
			},
			loadFont : function(font){
				if(this.get('css')) return;
				this.set('loading', true);
				$('#loadingFont').addClass('active');
				$.ajax({
					xhr: _.bind(function() {
						var xhr = new window.XMLHttpRequest();
						xhr.addEventListener("progress", _.bind(function(evt) {
							if (evt.lengthComputable) {
								var percentComplete = evt.loaded / evt.total;
								this.set({
									'loaded' : Math.round(percentComplete * 100)
								})
							}
						}, this), false);
						return xhr;
					},this),
					type: 'GET',
					url: '/single/'+font,
					success: _.bind(function(data){
						$('#loadingFont').removeClass('active');
						this.set({
							'css' : data,
							'loaded' : 0,
							'loading' : false
						})
					},this)
				});
			}
		});
		return Font;
	}
);