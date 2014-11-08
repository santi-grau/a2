<li class="clearfix" >
	<div class="row">
		<div class="col-md-1">
			<a class="glyphicon glyphicon-th-list sort"></a>
		</div>
		<div class="col-md-9">
			<input class="weightName" value="<%= data.name %>" maxlength="30">
		</div>
		<div class="col-md-2 utils">
			<a href="javascritp:void(0)" class="status btn btn-<% if(data.status){ %>success<% }else{ %>default<% } %> btn-xs">
				<span class="success">Enabled</span>
				<span class="default">Disabled</span>
			</a>
			<a href="javascritp:void(0)" class="delete btn btn-danger btn-xs">
				Delete
			</a>
		</div>
	</div>
</li>