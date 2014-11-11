// ┌────────────────────────────────────────────────────────────────────┐
// | Weight.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone'],
	function(Backbone, WeightView){
		var Weight = Backbone.View.extend({
			events: {
				'click .status': 'changeStatus',
				'click .delete': 'deleteRequest',
				'keyup .weightName' : 'stopTyping'
			},
			initialize: function(){
				this.model.on('change:status', this.updateStatus, this);
				this.model.on('destroy', this.removeWeight, this);
			},
			changeStatus: function(){
				this.model.set('status', !this.model.get('status'));
			},
			updateStatus: function(model, attr){
				if(attr) this.$('.status').removeClass('btn-default').addClass('btn-success');
				else this.$('.status').addClass('btn-default').removeClass('btn-success');
			},
			deleteRequest: function(){
				var r = confirm("Are you sure you want to delete this weight (" + this.model.get('name') + ") ?");
				if (r) this.model.destroy();
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
				this.model.set('hash', this.stripVowelAccent(this.$('.weightName').val()));
				console.log(this.model)
			}
		});
		return Weight;
	}
);