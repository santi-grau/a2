<?php
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$data = json_decode($_POST['data']);
		$fonts = array();
		foreach($data as $formats){
			foreach($formats as $format => $files){
				$fonts[$format] = array();
				foreach($files as $file){
					$filename = rand(pow(10, 20-1), pow(10, 20)-1).time().'.'.$format;
					file_put_contents('fonts/'.$filename, $file );
					$fonts[$format][] = $filename;
				}
			}
		}
		echo json_encode($fonts);
	}else{
		$file = 'data.json';
		$content = file_get_contents($file);
		echo $content;
	}
?>