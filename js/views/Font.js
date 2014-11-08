// ┌────────────────────────────────────────────────────────────────────┐
// | Font.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'text!partials/admin_weight', 'views/Weight'],
	function(Backbone, WeightView, Weight){
		var Font = Backbone.View.extend({
			events: {
				'click .status:eq(0)': 'changeStatus',
				'click .delete:eq(0)': 'deleteRequest',
				'drop' : 'drop',
				'dragover' : 'dragover',
				'dragleave' : 'dragleave'
			},
			initialize: function(){
				this.model.on('change:status', this.updateStatus, this);
				this.model.get('weights').on('add', this.addWeight, this);
				this.model.get('weights').on('destroy', this.removedWeight, this);
				$('.sortable.weights').sortable({
					axis: 'y',
					handle: ".sort"
				});
			},
			changeStatus: function(){
				this.model.set('status', !this.model.get('status'));
			},
			updateStatus: function(model, attr){
				if(attr) this.$('.status').removeClass('btn-default').addClass('btn-success');
				else this.$('.status').addClass('btn-default').removeClass('btn-success');
			},
			deleteRequest: function(){
				var r = confirm("Are you sure you want to delete " + this.model.get('name'));
				if (r) this.model.destroy();
			},
			removedWeight: function(){
				var font = window.App.Collections.Fonts.findWhere({ hash : this.model.get('hash') });
				var length = font.get('weights').length;
				this.$('.badge').html(length);
				if(length == 0) this.$el.addClass('empty');
			},
			addWeight: function(model){
				var weightPartial = _.template(WeightView);
				var weightView = $(weightPartial({ data : model.toJSON() }));
				var weight = new Weight({ model : model, el : $(weightView).appendTo(this.$('.weights')) });
				this.$('.badge').html(this.model.get('weights').length);
				this.$el.removeClass('empty');
			},
			drop: function(e){
				(e && e.preventDefault) && e.preventDefault();
				(e && e.originalEvent.stopPropagation) && e.originalEvent.stopPropagation();
				this.$el.removeClass('dragging-over');
				var dt = e.originalEvent.dataTransfer;
				var files = dt.files;
				if(files.length) this.$el.addClass('loading');
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
					self.$el.removeClass('loading');
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
						self.makeWeight(file.name, file.name.replace(/\W/g, '').toLowerCase(), xmlhttp.responseText);
					}
				}
			},
			makeWeight: function(name, hash, files){
				this.model.get('weights').add({
					name : name,
					hash : hash,
					order: 0,
					status : true
				});
				$.ajax({
					type: "POST",
					url: "fonts.php",
					data: {data : files},
					success: function(data){
						console.log(data)
					}
				});
			},
			dragover: function(e){
				(e && e.preventDefault) && e.preventDefault();
				this.$el.addClass('dragging-over');
			},
			dragleave: function(e){
				(e && e.preventDefault) && e.preventDefault();
				this.$el.removeClass('dragging-over');
			}
		});
		return Font;
	}
);