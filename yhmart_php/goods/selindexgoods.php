<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/17
 * Time: 14:23
 */

include "../config/sqlconfig.php";

$father = array(1,2,4);

for ($i = 0;$i<count($father);$i++){
    $goods = array();
    $fatherkind = $father[$i];
    if($i == 0){
        $sql = "SELECT * FROM goods WHERE kind in (SELECT id FROM kind WHERE fatherid = $fatherkind) limit 0,4";
    }
    else{
        $sql = "SELECT * FROM goods WHERE kind in (SELECT id FROM kind WHERE fatherid = $fatherkind) limit 0,2";
    }
    $res = $conn->query($sql);
    if ($res->num_rows > 0){
        while ($row = $res->fetch_assoc()){
            $goods[] = $row;
        }
    }
    $result[] = $goods;
}

echo json_encode($result);