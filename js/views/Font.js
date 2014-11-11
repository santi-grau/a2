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
				'dragleave' : 'dragleave',
				'keyup .fontName' : 'stopTyping'
			},
			initialize: function(){
				this.model.on('change:status', this.updateStatus, this);
				this.model.get('weights').on('add', this.addWeight, this);
				this.model.get('weights').on('destroy', this.removedWeight, this);
				$('.sortable.weights').sortable({
					axis: 'y',
					handle: ".sort",
					update: _.bind(this.updateWeightPositions, this)
				});
			},
			changeStatus: function(){
				this.model.set('status', !this.model.get('status'));
			},
			updateStatus: function(model, attr){
				if(attr) this.$('.status').removeClass('btn-default').addClass('btn-success');
				else this.$('.status').addClass('btn-default').removeClass('btn-success');
			},
			updateWeightPositions: function(event, ui){
				var positions = [];
				this.$('.weight').each(function(i){
					positions.push({hash: $(this).data('hash'), position: this.$('.weight').index($(this))});
				})
				this.model.updatePositions(positions);
				window.App.Collections.Fonts.sync();
			},
			deleteRequest: function(){
				var r = confirm("Are you sure you want to delete " + this.model.get('name'));
				if (r) this.model.destroy();
			},
			removedWeight: function(model, attr){
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
				this.$el.removeClass('loading');
			},
			drop: function(e){
				(e && e.preventDefault) && e.preventDefault();
				(e && e.originalEvent.stopPropagation) && e.originalEvent.stopPropagation();
				this.$el.removeClass('dragging-over');
				var dt = e.originalEvent.dataTransfer;
				this.model.uploadFonts(dt.files);
				if(dt.files.length) this.$el.addClass('loading');
			},
			dragover: function(e){
				(e && e.preventDefault) && e.preventDefault();
				this.$el.addClass('dragging-over');
			},
			dragleave: function(e){
				(e && e.preventDefault) && e.preventDefault();
				this.$el.removeClass('dragging-over');
			},
			stopTyping: function(){
				if(this.typingInterval) clearTimeout(this.typingInterval);
				this.typingInterval = setTimeout(_.bind(this.saveName, this), 1000);
			},
			stripVowelAccent: function(str){
				var rExps=[ {re:/[\xC0-\xC6]/g, ch:'A'}, {re:/[\xE0-\xE6]/g, ch:'a'}, {re:/[\xC8-\xCB]/g, ch:'E'}, {re:/[\xE8-\xEB]/g, ch:'e'}, {re:/[\xCC-\xCF]/g, ch:'I'}, {re:/[\xEC-\xEF]/g, ch:'i'}, {re:/[\xD2-\xD6]/g, ch:'O'}, {re:/[\xF2-\xF6]/g, ch:'o'}, {re:/[\xD9-\xDC]/g, ch:'U'}, {re:/[\xF9-\xFC]/g, ch:'u'}, {re:/[\xD1]/g, ch:'N'}, {re:/[\xF1]/g, ch:'n'} ];
				for(var i=0, len=rExps.length; i<len; i++) str = str.replace(rExps[i].re, rExps[i].ch);
				return str;
			},
			saveName: function(){
				this.model.set('name', this.$('.fontName').val());
				this.model.set('hash', this.stripVowelAccent(this.$('.fontName').val()).toLowerCase());
			}
		});
		return Font;
	}
);