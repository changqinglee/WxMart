<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/16
 * Time: 23:00
 */

include "../config/sqlconfig.php";

$type = $_POST['type'];
$id = $_POST['id'];
$openid = $_POST['openid'];


$sql = "SELECT * FROM cart WHERE uid = '$openid' AND goods_id = $id";

$res = $conn->query($sql);
if($res->num_rows > 0){
    while ($row = $res->fetch_assoc()){
        $cart = $row;
    }
}else{
    echo $sql;
}

$cartid = $cart['id'];

if ($type == "plus"){
    $newNum = (int)$cart['num']+1;
}else{
    $newNum = (int)$cart['num']-1;
}

$sql = "UPDATE cart SET num = $newNum WHERE id = $cartid";
if ($conn->query($sql)){
    $resule['code'] = 1;
}else{
    $resule['code'] = 0;
    $resule['error'] = $conn->error;
    $resule['sql'] = $sql;
}

echo json_encode($resule);