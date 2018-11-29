<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/17
 * Time: 23:33
 */

header('Access-Control-Allow-Origin:*');

include "../config/sqlconfig.php";

$testxml  = file_get_contents("php://input");

libxml_disable_entity_loader(true);
$data = json_decode(json_encode(simplexml_load_string($testxml, 'SimpleXMLElement', LIBXML_NOCDATA)), true);

ksort($data);
$buff = '';
foreach ($data as $k => $v){
    if($k != 'sign'){
        $buff .= $k . '=' . $v . '&';
    }
}

$stringSignTemp = $buff . "key=".$wxpaykey;//key为证书密钥
$sign = strtoupper(md5($stringSignTemp));


if($sign == $data['sign']){
    //处理完成之后，告诉微信成功结果
    echo 'SUCCESS';

    $log = "INSERT INTO orders_log (code) VALUES ('SUCCESS')";

    $conn->query($log);

    $out_trade_no = $data['out_trade_no'];
    $is_subscribe = $data['is_subscribe'];
    $bank_type = $data['bank_type'];
    $transaction_id = $data['transaction_id'];
    $time_end = $data['time_end'];

    $sql = "UPDATE orders SET is_subscribe = '$is_subscribe' , bank = '$bank_type' , transaction_id = '$transaction_id' , time_end = '$time_end' , finished = 'Y' WHERE out_trade_no = '$out_trade_no'";

    if ($conn->query($sql)){
        $code = 1;
        $insert = "INSERT INTO orders_log (code) VALUES ('$code')";
    }
    else{
        $code = 0;
        $error = $conn->error;
        $sql = $sql;
        $insert = "INSERT INTO orders_log (code,error,text) VALUES ('$code','$error','$sql')";
    }

    $conn->query($insert);

    $back = "INSERT INTO orders_log (text) VALUES ('$bank_type')";
    $conn->query($back);

    exit();
}