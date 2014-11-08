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
			saveName: function(){
				this.model.set('name', this.$('.weightName').val());
			}
		});
		return Weight;
	}
);