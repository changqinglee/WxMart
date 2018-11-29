<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/16
 * Time: 19:46
 */

include "../config/sqlconfig.php";

$openid = $_POST['openid'];

$sql = "SELECT * FROM cart WHERE uid = '$openid'";

$res = $conn->query($sql);

if ($res->num_rows > 0){
    while ($row = $res->fetch_assoc()){
        $cart[] = $row;
    }
    for ($i = 0;$i<count($cart);$i++){
        $goodsid = $cart[$i]['goods_id'];
        $selgoods = "SELECT * FROM goods WHERE id = $goodsid";
        $resgood = $conn->query($selgoods);
        if ($resgood->num_rows > 0){
            while ($row = $resgood->fetch_assoc()){
                $resultgood = $row;
            }
        }
        $resultgood['num'] = $cart[$i]['num'];
        $resultgood['selected'] = true;
        $result[] = $resultgood;
    }
}else{
    $result = 0;
}
echo json_encode($result);

