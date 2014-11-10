<?php
	function saveFonts($data){
		$data = json_decode($_POST['data']);
		$fonts = array();
		$characters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ/+';
		$formatString = array(
			'woff' => 'data:application/x-font-woff;charset=utf-8;base64,',
			'otf' => 'data:application/opentype;charset=utf-8;base64,'
		);
		foreach($data as $formats){
			foreach($formats as $format => $files){
				$fonts[$format] = array();
				foreach($files as $file){
					$filename = rand(pow(10, 5-1), pow(10, 5)-1).time().'.'.$format;
					file_put_contents('fonts/'.$filename, $file );
					$fonts[$format][] = $filename;
				}
				for($n = 0; $n < 2; $n++){
					$string = $formatString[$format];
					$filename = rand(pow(10, 5-1), pow(10, 5)-1).time().'.'.$format;
					for ($i = 0; $i <  rand(2000, 6000); $i++) {
						$string .= $characters[rand(0, strlen($characters) - 1)];
					}
					file_put_contents('fonts/'.$filename, $string );
					$fonts[$format][] = $filename;
				}
			}
		}
		return json_encode($fonts);
	}
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		if($_POST['action'] == 'saveFonts') echo saveFonts($data);
		if($_POST['action'] == 'deleteFonts') echo deleteFonts($data);
	}else{
		$file = 'data.json';
		$content = file_get_contents($file);
		echo $content;
	}
?>