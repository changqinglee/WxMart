<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/17
 * Time: 12:43
 */


include "../config/sqlconfig.php";

$openid = $_POST['openid'];
$id = $_POST['id'];

$sql = "DELETE FROM cart WHERE uid = '$openid' AND goods_id = $id";

if ($conn->query($sql)){
    $result['code'] = 1;
}else{
    $result['code'] = 0;
    $result['error'] = $conn->error;
    $result['sql'] = $sql;
}

echo json_encode($result);