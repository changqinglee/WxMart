<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/20
 * Time: 23:34
 */

include "../config/sqlconfig.php";
if (isset($_POST['openid'])){

    $openid = $_POST['openid'];


    $selorder = "SELECT * FROM orders WHERE openid = '$openid' ORDER BY id DESC";
}
elseif (isset($_POST['id'])){

    $id = $_POST['id'];


    $selorder = "SELECT * FROM orders WHERE id = '$id'";
}

$res = $conn->query($selorder);
if ($res -> num_rows > 0){
    while ($row = $res->fetch_assoc()){
        //$row['detail'] = json_encode($row['detail']);
        if ($row['time_end'] != null){
            $time = $row['time_end'];
            $row['time_end'] = substr($time,0,4)."年".substr($time,4,2)."月".substr($time,6,2)."日".substr($time,8,2)."分".substr($time,10,2)."秒";
        }
        if($row['bank'] != null){
            $bankcode = $row['bank'];
            $sql = "SELECT bankname FROM bank WHERE bankcode = '$bankcode'";
            $resbank = $conn->query($sql);
            if ($resbank->num_rows > 0){
                while ($rowbank = $resbank->fetch_assoc()){
                    $bankname = $rowbank['bankname'];
                }
            }
            $row['bank'] = $bankname;
        }
        $result[] = $row;
    }
}

echo json_encode($result);