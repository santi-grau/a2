// ┌────────────────────────────────────────────────────────────────────┐
// | Weight.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone'],
	function(Backbone, WeightView){
		var Weight = Backbone.View.extend({
			events: {
				'click .status': 'changeStatus',
				'click .def': 'changeDefault',
				'click .delete': 'deleteRequest',
				'keyup .weightName' : 'stopTyping'
			},
			initialize: function(data){
				this.parent = data.parent;
				this.model.on('change:status', this.updateStatus, this);
				this.model.on('change:def', this.updateDefault, this);
				this.model.on('destroy', this.removeWeight, this);
			},
			changeStatus: function(){
				if(this.model.get('status') && this.model.get('def')) return alert('Cannot disable default weight');
				this.model.set('status', !this.model.get('status'));
			},
			changeDefault: function(){
				if(!this.model.get('status')) return alert('Cannot make default a disabled weight');
				this.parent.model.get('weights').each(function(model){
					model.set('def', false);
				});
				this.model.set('def', true);
				window.App.Collections.Fonts.sync();
			},
			updateStatus: function(model, attr){
				if(attr) this.$('.status').removeClass('btn-default').addClass('btn-success');
				else this.$('.status').addClass('btn-default').removeClass('btn-success');
			},
			updateDefault: function(model, attr){
				if(attr) this.$('.def').removeClass('btn-default').addClass('btn-primary');
				else this.$('.def').addClass('btn-default').removeClass('btn-primary');
			},
			deleteRequest: function(){
				if(this.model.get('def')) return alert('Cannot delete default weight, please select a new default and delete');
				var r = confirm("Are you sure you want to delete this weight (" + this.model.get('name') + ") ?");
				if (r) this.remove();
			},
			remove: function(){
				var weights = [];
				$.each($.parseJSON(this.model.get('files')), function(i,j){
					j.forEach(function(f){
						weights.push(f)
					})
				});
				this.model.destroy();
				$.ajax({
					type: "POST",
					url: basePath + "fonts.php",
					data: {action: 'deleteWeights', data : weights}
				});
			},
			addWeight: function(model){
				var weightPartial = _.template(WeightView);
				var weightView = $(weightPartial({ data : model.toJSON() }));
				var weight = new Weight({ model : model, el : $(weightView).appendTo(this.$('.weights')) });
				this.$('.badge').html(this.model.get('weights').length)
			},
			removeWeight: function(){
				this.$el.remove();
			},
			stopTyping: function(){
				if(this.typingInterval) clearTimeout(this.typingInterval);
				this.typingInterval = setTimeout(_.bind(this.saveName, this), 1000);
			},
			stripVowelAccent: function(str){
				var rExps=[ {re:/[\xC0-\xC6]/g, ch:'A'}, {re:/[\xE0-\xE6]/g, ch:'a'}, {re:/[\xC8-\xCB]/g, ch:'E'}, {re:/[\xE8-\xEB]/g, ch:'e'}, {re:/[\xCC-\xCF]/g, ch:'I'}, {re:/[\xEC-\xEF]/g, ch:'i'}, {re:/[\xD2-\xD6]/g, ch:'O'}, {re:/[\xF2-\xF6]/g, ch:'o'}, {re:/[\xD9-\xDC]/g, ch:'U'}, {re:/[\xF9-\xFC]/g, ch:'u'}, {re:/[\xD1]/g, ch:'N'}, {re:/[\xF1]/g, ch:'n'}, {re:/\s+/g, ch:'-'} ];
				for(var i=0, len=rExps.length; i<len; i++) str = str.replace(rExps[i].re, rExps[i].ch);
				return str;
			},
			saveName: function(){
				this.model.set('name', this.$('.weightName').val());
				this.model.set('hash', this.stripVowelAccent(this.$('.weightName').val()).toLowerCase());
				window.App.Collections.Fonts.sync();
			}
		});
		return Weight;
	}
);