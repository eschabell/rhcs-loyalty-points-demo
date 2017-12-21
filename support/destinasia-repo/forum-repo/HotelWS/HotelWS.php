<?php 

$input = json_decode(file_get_contents('php://input'),true);


$characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
$resCode = '';
$max = strlen($characters) - 1;
for ($i = 0; $i < 6; $i++) {
	$resCode .= $characters[mt_rand(0, $max)];
}

$price = round(rand(30,300)*$input["hotelNights"],2);

$resp = array(
		"hotelId" => $input["hotelId"],
		"hotelArrivalDate"=>$input["hotelArrivalDate"],
		"hotelNights"=>$input["hotelNights"],
		"hotelCity"=>$input["hotelCity"],
		"hotelResCode"=>$resCode,
		"hotelPrice"=>$price,
		"hotelResStatus"=>"OK"
);
$wrapresp = array($resp);

echo json_encode($resp,JSON_UNESCAPED_SLASHES);


?>
