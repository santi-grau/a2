<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<title>A2 Type Converter's Admin</title>
		<meta name="description" content="A2 Type Converter's Admin">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" id="mainStylesheet" href="css/admin.css">
	</head>
	<body>
		<div id="saving">Saving data...</div>
		<div id="header">
			<div id="heart" class=""></div>
		</div>
		<div id="fontlist" class="col-xs-12">
			<div class="panel-group sortable fonts" id="accordion" role="tablist" aria-multiselectable="true"></div>
		</div>
		<div id="settings"></div>
		<?php  if (strpos('http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'],'a2.local') !== false) { ?>
			<script src="js/libs/requirejs/require.js" data-main="js/admin.js"></script>
		<?php }else{ ?>
			<script src="build/admin.js"></script>
		<?php } ?>
	</body>
</html>