<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/14
 * Time: 15:16
 */

include "../config/sqlconfig.php";

if (!isset($_POST['type'])){
    $selbanner = "SELECT * FROM images WHERE type = 'banner'";
}
else{
    $type = $_POST['type'];
    $selbanner = "SELECT * FROM images WHERE type = '$type'";
}

$resimages = $conn->query($selbanner);

if ($resimages->num_rows > 0){
    while($rowimages = $resimages->fetch_assoc()){
        $resultimages[] = $rowimages;
    }
}

echo json_encode($resultimages);