// ┌────────────────────────────────────────────────────────────────────┐
// | Font.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'collections/Weights'],
	function(Backbone, Weights){
		var Font = Backbone.Model.extend({
			defaults: {
				weights : null,
				name : null,
				hash : null,
				defContent : [{"value":"Introducing","attributes":{"font":"regular-extrabold"}},{"value":"\n","attributes":{}},{"value":"the ","attributes":{"font":"regular-extrabold"}},{"value":"A2-TYPE","attributes":{"color":"rgb(245, 0, 252)","font":"regular-extrabold"}},{"value":"\n","attributes":{}},{"value":"TESTER:","attributes":{"color":"rgb(245, 0, 252)","font":"regular-extrabold"}},{"value":"\n","attributes":{}},{"value":"Design your","attributes":{"font":"regular-extrabold"}},{"value":"\n","attributes":{}},{"value":"own specimen","attributes":{"font":"regular-extrabold"}},{"value":"\n","attributes":{}},{"value":"from our list","attributes":{"font":"regular-extrabold"}},{"value":"\n","attributes":{}},{"value":"of fonts.","attributes":{"font":"regular-extrabold"}},{"value":"\n","attributes":{}},{"value":"Highlight","attributes":{"color":"rgb(255, 255, 255)","background":"rgb(127, 73, 0)", "font":"regular-extrabold"}},{"value":" any","attributes":{"color":"rgb(127, 72, 0)","font":"regular-extrabold"}},{"value":"\n","attributes":{}},{"value":"font and click","attributes":{"color":"rgb(127, 73, 0)","font":"regular-extrabold"}},{"value":"\n","attributes":{}},{"value":"on ","attributes":{"color":"rgb(127, 73, 0)","font":"regular-extrabold"}},{"value":"!","attributes":{"image":"img/buy.png"}},{"value":"       that’s","attributes":{"font":"regular-extrabold"}},{"value":"\n","attributes":{}},{"value":"it. easy. ","attributes":{"font":"regular-extrabold"}},{"value":"\n","attributes":{}}],
				defSize : null,
				defHeight : null,
				defWidth : null,
				buypage : null,
				css : null,
				loading : false,
				loaded : 0,
				heightRatio : null,
				order: null
			},
			initialize: function(){
				this.set('weights', new Weights(this.get('weights')));
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
					url: '/fonts/' + font + '.json',
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