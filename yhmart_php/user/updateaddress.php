<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/21
 * Time: 14:58
 */

include "../config/sqlconfig.php";

$openid = $_POST['openid'];

$name = $_POST['name'];

$tel = $_POST['tel'];

$detail = $_POST['detail'];

$qu = $_POST['qu'];

$sel = "SELECT * FROM address WHERE openid = '$openid'";

$res = $conn->query($sel);

if ($res->num_rows > 0){
    $sql = "UPDATE address SET name = '$name' , tel = '$tel' , qu = '$qu' , detail = '$detail' WHERE openid = '$openid'";
}
else{
    $sql = "INSERT INTO address (openid,name,tel,qu,detail) VALUES ('$openid','$name','$tel','$qu','$detail')";
}

if ($conn->query($sql)){
    $result['code'] = 1;
}
else{
    $result['code'] = 0;
    $result['error'] = $conn->error;
    $result['sql'] = $sql;
}

echo json_encode($result);