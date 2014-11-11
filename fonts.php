<?php
	function saveFonts(){
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
	function deleteWeights($data){
		foreach($data as $file){
			$path = 'fonts/'.$file;
			if (file_exists($path)) unlink($path);
		}
	}
	function updateData($data){
		file_put_contents('data.json', $data );
	}
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		if($_POST['action'] == 'saveFonts') echo saveFonts();
		if($_POST['action'] == 'deleteWeights') echo deleteWeights($_POST['data']);
		if($_POST['action'] == 'updateData') echo updateData($_POST['data']);
	}else{
		$file = 'data.json';
		$content = file_get_contents($file);
		echo $content;
	}
?>