<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/14
 * Time: 20:08
 */

include "../config/sqlconfig.php";

if (isset($_POST['idx'])){
    $id = $_POST['idx'];
    $sql = "SELECT * FROM kind WHERE id in (SELECT id FROM kind WHERE fatherid = $id)";
}
else{
    $sql = "SELECT * FROM kind WHERE fatherid = 0";
}

$res = $conn->query($sql);

if ($res->num_rows > 0){
    while ($row = $res->fetch_assoc())
    {
        $result[] = $row;
    }
}

echo json_encode($result);