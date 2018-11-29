<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/15
 * Time: 17:48
 */


include "../../config/sqlconfig.php";

$upFile = $_FILES['file'];

/**
 * 创建文件夹函数,用于创建保存文件的文件夹
 * @param str $dirPath 文件夹名称
 * @return str $dirPath 文件夹名称
 */

$name = $_POST['name'];
$oldprice = $_POST['oldprice'];
$price = $_POST['price'];
$kind = $_POST['kind'];


//判断文件是否为空或者出错
if ($upFile['error']==0 && !empty($upFile)) {
    $dirpath = "../../images/goods/";
    $filetypearr = explode(".",$_FILES['file']['name']);
    $filetype = $filetypearr[(count($filetypearr))-1];
    $filename = "goods".time().".".$filetype;
    $queryPath = $dirpath.$filename;
    $way = "/images/goods/".$filename;
    //move_uploaded_file将浏览器缓存file转移到服务器文件夹
    if(move_uploaded_file($_FILES['file']['tmp_name'],$queryPath)){
        $sql = "INSERT INTO goods (name,oldprice,price,img,kind) VALUES ('$name','$oldprice','$price','$way','$kind')";
        if ($conn->query($sql))
        {
            $result['code'] = 1;
        }
        else
        {
            $result['code'] = 0;
            $result['error'] = $conn->error;
        }
    }
}

echo json_encode($result);

