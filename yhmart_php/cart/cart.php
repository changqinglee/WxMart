<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/16
 * Time: 15:38
 */

include "../config/sqlconfig.php";

$openid = $_POST['openid'];
$goodsid = $_POST['goodsid'];

$check = "SELECT * FROM cart WHERE uid = '$openid' AND goods_id = '$goodsid'";
$resche = $conn->query($check);
if ($resche->num_rows > 0)
{
    while ($rowche = $resche->fetch_assoc()){
        $resultche = $rowche;
    }
    $cartid = $resultche['id'];
    $newnum = (int)$resultche['num']+1;
    $update = "UPDATE cart SET num = $newnum WHERE id = $cartid";
    if ($conn->query($update)){
        $result['code'] = 1;
        $result['openid'] = $openid;
    }
    else{
        $result['code'] = 0;
        $result['error'] = $conn->error;
        $result['sql'] = $update;
        $result['openid'] = $openid;
    }
}
else{
    $sql = "INSERT INTO cart (uid,goods_id,num,status) VALUES ('$openid',$goodsid,1,1)";
    if ($conn->query($sql)){
        $result['code'] = 1;
        $result['openid'] = $openid;
    }
    else{
        $result['code'] = 0;
        $result['error'] = $conn->error;
        $result['sql'] = $sql;
        $result['openid'] = $openid;
    }
}

echo json_encode($result);