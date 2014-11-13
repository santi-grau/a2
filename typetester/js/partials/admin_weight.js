<li class="clearfix weight" data-hash="<%= data.hash %>" >
	<div class="row">
		<div class="col-md-1">
			<a class="glyphicon glyphicon-th-list sort"></a>
		</div>
		<div class="col-md-8">
			<input class="weightName" value="<%= data.name %>" maxlength="30">
		</div>
		<div class="col-md-3 utils">
			<a href="javascritp:void(0)" class="def btn btn-<% if(data.def){ %>primary<% }else{ %>default<% } %> btn-xs">
				Default
			</a>
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