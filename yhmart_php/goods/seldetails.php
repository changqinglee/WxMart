<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/26
 * Time: 12:50
 */

include "../config/sqlconfig.php";

$id = $_POST['id'];

$sql = "SELECT * FROM goodsdetail WHERE good_id = $id ORDER BY idx";
$res = $conn->query($sql);
if ($res->num_rows > 0)
{
    while ($row = $res->fetch_assoc())
    {
        $result[] = $row;
    }
}

echo json_encode($result);