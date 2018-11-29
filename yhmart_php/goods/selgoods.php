<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/15
 * Time: 20:49
 */

include "../config/sqlconfig.php";

$id = $_POST['id'];

$sql = "SELECT * FROM goods WHERE id = $id";
$res = $conn->query($sql);
if ($res->num_rows > 0)
{
    while ($row = $res->fetch_assoc())
    {
        $result = $row;
    }
}

echo json_encode($result);