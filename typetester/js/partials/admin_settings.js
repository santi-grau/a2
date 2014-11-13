<div class="options row col-md-12">
	<div class="col-md-5">
		<div class="input-group">
			<span class="input-group-addon">Buy link</span>
			<input type="text" id="buyInput" class="form-control" placeholder="http://..." value="<%= data.buypage %>">
		</div>
	</div>
	<div class="col-md-2">
		<div class="input-group">
			<span class="input-group-addon">Hash</span>
			<input type="text" id="hashInput" class="form-control" placeholder="hash" value="<%= data.hash %>">
		</div>
	</div>
	<div class="col-md-2">
		<div class="input-group">
			<span class="input-group-addon">Size</span>
			<input id="sizeInput" class="form-control" type="number" value="<%= data.defSize %>">
		</div>
	</div>
	<div class="col-md-2">
		<div class="input-group">
			<span class="input-group-addon">Height</span>
			<input class="form-control" id="heightInput" type="number" value="<%= data.defHeight %>">
		</div>
	</div>
	<div class="col-md-1 closebut">
		<a href="javascript:void(0)">x Close</a>
	</div>
</div>
<div id="editor"></div>
<div id="colorCircle">
	<a id="outerCircle">
		<div id="colorZoom">
			<div class="inner"></div>
		</div>
	</a>
	<div id="centerCircle"></div>
</div>