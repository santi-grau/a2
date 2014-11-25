<% _.each(data, function(weight) { %>
	<% if(!weight.status) return; %>
	<li>
		<a href="javascript:void(0)" data-hash="<%= weight.hash %>">
			<div>
				<%= weight.name %>
			</div>
		</a>
	</li>
<% }); %>