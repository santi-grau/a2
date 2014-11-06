<?php
	$file = 'data.json';
	echo json_encode(readfile($file));
?>