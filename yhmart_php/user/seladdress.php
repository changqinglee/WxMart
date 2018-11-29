<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/18
 * Time: 21:59
 */

include "../config/sqlconfig.php";

$openid = $_POST['openid'];

$sql = "SELECT * FROM address WHERE openid = '$openid'";

$res = $conn->query($sql);
if($res->num_rows> 0){
    while ($row = $res->fetch_assoc()){
        $result = $row;
    }
}
else{
    $result = false;
}

echo json_encode($result);