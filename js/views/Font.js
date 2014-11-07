// ┌────────────────────────────────────────────────────────────────────┐
// | Font.js
// └────────────────────────────────────────────────────────────────────┘
define(['backbone', 'text!partials/admin_weight', 'views/Weight'],
	function(Backbone, WeightView, Weight){
		var Font = Backbone.View.extend({
			events: {
				'click .status': 'changeStatus',
				'click .delete': 'deleteRequest'
			},
			initialize: function(){
				this.model.on('change:status', this.updateStatus, this);
				this.model.get('weights').on('add', this.addWeight, this);
				$('.sortable.weights').sortable({
					axis: 'y',
					cancel: "input"
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
				var r = confirm("Are you sure you wnat to delete " + this.model.get('name'));
				if (r) this.model.destroy();
			},
			addWeight: function(model){
				var weightPartial = _.template(WeightView);
				var weightView = $(weightPartial({ data : model.toJSON() }));
				var weight = new Weight({ model : model, el : $(weightView).appendTo(this.$('.weights')) });
				this.$('.badge').html(this.model.get('weights').length)
			}
		});
		return Font;
	}
);