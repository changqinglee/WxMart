<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/23
 * Time: 21:08
 */


include "../../config/sqlconfig.php";

$id = $_POST['id'];
$nature = $_POST['nature'];

$sql = "UPDATE goods SET nature = '$nature' WHERE id = $id";

if ($conn->query($sql)){
    $result['code'] = 1;
}
else{
    $result['code'] = 0;
    $result['error'] = $conn->error;
    $result['sql'] = $sql;
}

echo json_encode($result);