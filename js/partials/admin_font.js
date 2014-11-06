<div class="panel panel-default">
	<div class="panel-heading" role="tab" id="headingTwo">
		<h4 class="panel-title" class="clearfix">
			<a data-toggle="collapse" data-parent="#accordion" href="#<%= data.hash %>" aria-expanded="true" aria-controls="<%= data.hash %>">
				<%= data.name %>
			</a>
			<span class="badge"><%= data.weights.length %></span>
		</h4>
	</div>
	<div id="<%= data.hash %>" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
		<div class="panel-body">
			<ul class="sortable">
				<li class="clearfix" >
					<span class="col-xs-10">
						<input value="Weight 1" maxlength="30">
					</span>
					<a href="javascritp:void(0)" class="btn btn-success btn-xs">
						Enabled
					</a>
					<a href="javascritp:void(0)" class="btn btn-danger btn-xs">
						Delete
					</a>
				</li>
				<li>Item 2</li>
				<li>Item 3</li>
				<li>Item 4</li>
				<li>Item 5</li>
				<li>Item 6</li>
				<li>Item 7</li>
				<li>Item 8</li>
				<li>Item 9</li>
			</ul>
		</div>
	</div>
</div>