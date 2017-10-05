<?php
	//Get url from query
	//https://app.stillio.com/api/screenshots?api_token=qi4P5981S1I0JAB3VWJp5KNKviEopedx8Z4HWINjv7LbdNaTbqX5PzE6RSJM&url_id=3c809f22-13f6-49db-bfd8-63d3df847bb9
	$stillio_screenshot_base_url = "https://app.stillio.com/api/screenshots";
	$api_token = ISSET($_GET['api_token']) ? $_GET['api_token'] : null;
	$url_id = ISSET($_GET['url_id']) ? $_GET['url_id'] : null;
	//return content
	if($api_token != null && $url_id != null) {
		header('Content-Type: application/json');
		$stillio_screenshot_url = $stillio_screenshot_base_url.'?api_token='.$api_token.'&url_id='.$url_id;
		echo getData($stillio_screenshot_url);
	} else if($url_id != null && $api_token == null) {
		header('Content-Type: application/json');
		$data = ['text'=>'Need api_token'];
		echo json_encode($data);
	} else if($url_id == null && $api_token != null) {
		header('Content-Type: application/json');
		$data = ['text'=>'Need url_id'];
		echo json_encode($data);
	} else {
		header('Content-Type: application/json');
		$data = ['text'=>'Need api_token and url_id'];
		echo json_encode($data);
	}
	
	function getData($url, $post = null) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
		if(!empty($post)) {
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
		}
		$result = curl_exec($ch);
		curl_close($ch);
		return $result;
	}
?>