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
				defContent : [{"value":"Introducing","attributes":{}},{"value":"\n","attributes":{}},{"value":"the ","attributes":{}},{"value":"A2-TYPE","attributes":{"color":"rgb(245, 0, 252)"}},{"value":"\n","attributes":{}},{"value":"TESTER:","attributes":{"color":"rgb(245, 0, 252)"}},{"value":"\n","attributes":{}},{"value":"Design your","attributes":{}},{"value":"\n","attributes":{}},{"value":"own specimen","attributes":{}},{"value":"\n","attributes":{}},{"value":"from our list","attributes":{}},{"value":"\n","attributes":{}},{"value":"of fonts.","attributes":{}},{"value":"\n","attributes":{}},{"value":"Highlight","attributes":{"color":"rgb(255, 255, 255)","background":"rgb(127, 73, 0)"}},{"value":" any","attributes":{"color":"rgb(127, 72, 0)"}},{"value":"\n","attributes":{}},{"value":"font and click","attributes":{"color":"rgb(127, 73, 0)"}},{"value":"\n","attributes":{}},{"value":"on ","attributes":{"color":"rgb(127, 73, 0)"}},{"value":"!","attributes":{"image":"img/buy.png"}},{"value":"       that’s","attributes":{}},{"value":"\n","attributes":{}},{"value":"it. easy. ","attributes":{}},{"value":"\n","attributes":{}}],
				defSize : null,
				defHeight : null,
				defWidth : null,
				buypage : null,
				css : null,
				loading : false,
				loaded : 0,
				heightRatio : null,
				order: 0
			},
			initialize: function(){
				this.set('weights', new Weights(this.get('weights')));
			},
			uploadFonts: function(files){
				for (var i=0; i < files.length; i++) {
					if(files[i].name.indexOf('.otf') == -1) return alert('Please use an OTF font file');
					var reader = new FileReader();
					var file = files[i];
					var self = this;
					reader.onloadend = ( function(file) {
						return function(data) {
							self.convertFont(data, file);
						};
					})(files[i]);
					reader.readAsArrayBuffer(files[i]);
				}
			},
			convertFont: function(data, file){
				var xmlhttp=new XMLHttpRequest();
				xmlhttp.open("POST","http://ec2-54-69-52-7.us-west-2.compute.amazonaws.com");
				xmlhttp.send(data.target.result);
				var self = this;
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
						self.makeWeight(file.name, file.name.replace(/\W/g, '').toLowerCase(), xmlhttp.responseText);
					}
				}
			},
			updatePositions: function(positions){
				_.each(positions, _.bind(function(position){
					var model = this.get('weights').findWhere({hash:position.hash});
					model.set('order', position.position)
				}, this));
				this.get('weights').sort();
			},
			makeWeight: function(name, hash, files){
				var self = this;
				var weight = this.get('weights').add({
					name : name,
					hash : hash,
					order: 0,
					status : true
				});
				$.ajax({
					type: "POST",
					url: "fonts.php",
					data: {action: 'saveFonts', data : files},
					success: function(data){
						weight.set('files', data);
					}
				});
			},
			loadFont : function(font){
				if(this.get('css')) return;
				this.set('loading', true);
				$('#loadingFont').addClass('active');
				var fontFiles = [];
				var weights = window.App.Collections.Fonts.findWhere({hash:font}).get('weights');
				weights.each(_.bind(function(weightModel){
					var familyName = [];
					$.parseJSON(weightModel.get('files')).woff.forEach(function(fontFile){
						familyName.push( 'f' + fontFile.split('.')[0] );
						fontFiles.push(fontFile);
					});
					weightModel.set('familyName' , familyName.join(', '));
				},this));
				var totalFiles = fontFiles.length - 1;
				var css = [];
				$.each(fontFiles, _.bind(function(i,j){
					$.ajax({ 
						async:false, url:"fonts/"+j, success: _.bind(function(data){
							css.push({
								'font-family' : '"f' + j.split('.')[0] +'"',
								'src' : "url('" + data + "')"
							})
							if(totalFiles > 0) totalFiles--;
							else return this.buildFont(css);
							this.set({
								'loaded' : (fontFiles.length - totalFiles) * 100
							})
						}, this)
					});
				}, this));
			},
			buildFont: function(css){
				$('#loadingFont').removeClass('active');
				this.set({
					'css' : css,
					'loading' : false
				})
			}
		});
		return Font;
	}
);