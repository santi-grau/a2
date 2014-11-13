<div class="panel panel-default font <% if(data.weights.length == 0){ %>empty <% } %>" data-hash="<%= data.hash %>" droppable="true">
	<div class="panel-heading" role="tab" id="heading<%= data.hash %>">
		<div class="row">
			<div class="col-md-1">
				<a data-toggle="collapse" data-parent="#accordion" href="#<%= data.hash %>" aria-expanded="true" aria-controls="<%= data.hash %>" class="glyphicon glyphicon-circle-arrow-down"></a>
				<a class="glyphicon glyphicon-th-list sort"></a>
				<a class="glyphicon glyphicon-cog edit"></a>
			</div>
			<div class="col-md-8">
				<h4 class="panel-title" class="clearfix">
					<input class="fontName" value="<%= data.name %>" maxlength="30">
				</h4>
			</div>
			<div class="col-md-3 utils">
				<a href="javascritp:void(0)" class="status btn btn-<% if(data.status){ %>success<% }else{ %>default<% } %> btn-xs">
					<span class="success">Enabled</span>
					<span class="default">Disabled</span>
				</a>
				<a href="javascritp:void(0)" class="delete btn btn-danger btn-xs">Delete</a>
				<span class="badge"><%= data.weights.length %></span>
			</div>
		</div>
	</div>
	<div id="<%= data.hash %>" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading<%= data.hash %>">
		<div class="panel-body">
			<span class="empty-msg">No weights available</span>
			<ul class="sortable weights"></ul>
		</div>
	</div>
</div>