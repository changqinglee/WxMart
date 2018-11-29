<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/29
 * Time: 11:33
 */


include "../config/sqlconfig.php";

$id = (int)$_POST['id'];
$discussid = $_POST['discussid'];
$discuss = $_POST['discuss'];
$discussnum = $_POST['discussnum'];

$sql = "INSERT INTO discuss (orderid,discuss,discussnum,discussid) VALUES ($id,'$discuss','$discussnum','$discussid')";

if ($conn->query($sql)){
    $result['code'] = 1;
}
else{
    $result['code'] = 0;
    $result['error'] = $conn->error;
    $result['sql'] = $sql;
}

echo json_encode($result);