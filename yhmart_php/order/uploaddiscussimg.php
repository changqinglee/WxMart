<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/29
 * Time: 11:15
 */


include "../config/sqlconfig.php";

$id = $_POST['id'];

$discussid = $_POST['discussid'];

$upFile = $_FILES['file'];

if ($upFile['error']==0 && !empty($upFile)) {
    $dirpath = "../images/discussimg/";
    $filetypearr = explode(".",$_FILES['file']['name']);
    $filetype = $filetypearr[(count($filetypearr))-1];
    $filename = GetRandStr(6).time().".".$filetype;
    $queryPath = $dirpath.$filename;
    $way = "/images/discussimg/".$filename;
    //move_uploaded_file将浏览器缓存file转移到服务器文件夹
    if(move_uploaded_file($_FILES['file']['tmp_name'],$queryPath)){
        $sql = "INSERT INTO discussimg (discussid,discussimg) VALUES ('$discussid','$way')";
        if ($conn->query($sql))
        {
            $result['code'] = 1;
        }
        else
        {
            $result['code'] = 0;
            $result['error'] = $conn->error;
            $result['sql'] = $sql;
        }
    }
}


function GetRandStr($length)
{
    $str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $len = strlen($str) - 1;
    $randstr = '';
    for ($i = 0; $i < $length; $i++) {
        $num = mt_rand(0, $len);
        $randstr .= $str[$num];
    }
    return $randstr;
}


echo json_encode($result);