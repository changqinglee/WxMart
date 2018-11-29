<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/15
 * Time: 14:46
 */

include "../config/sqlconfig.php";

$id = $_POST['id'];

$sql = "SELECT name FROM kind WHERE id = $id";

$res = $conn->query($sql);
if ($res->num_rows > 0){
    while ($row = $res->fetch_assoc()){
        $result = $row['name'];
    }
}

echo $result;