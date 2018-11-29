<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/23
 * Time: 23:04
 */

include "../../config/sqlconfig.php";

$code = $_POST['code'];
$name = $_POST['name'];

$sql = "INSERT INTO bank (bankcode,bankname) VALUES ('$code','$name')";

if ($conn->query($sql)){
    $result['code'] = 1;
}
else{
    $result['code'] = 0;
    $result['error'] = $conn->error;
    $result['sql'] = $sql;
}

echo json_encode($result);