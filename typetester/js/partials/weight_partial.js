<% _.each(data, function(weight) { %>
	<li>
		<a href="javascript:void(0)" data-hash="<%= weight.hash %>">
			<div>
				<%= weight.name %>
			</div>
		</a>
	</li>
<% }); %>