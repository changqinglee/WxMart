<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/27
 * Time: 13:41
 */

include "../config/sqlconfig.php";

$out_trade_no = $_POST['out_trade_no'];

$upFile = $_FILES['img'];
if ($upFile['error']==0 && !empty($upFile)) {
    $dirpath = "../images/order_img/";
    $filetypearr = explode(".",$_FILES['img']['name']);
    $filetype = $filetypearr[(count($filetypearr))-1];
    $filename = "intro".time().GetRandStr(6).".".$filetype;
    $queryPath = $dirpath.$filename;
    $way = "/images/order_img/".$filename;
    //move_uploaded_file将浏览器缓存file转移到服务器文件夹
    if(move_uploaded_file($_FILES['img']['tmp_name'],$queryPath)){
        $sql = "INSERT INTO order_img (order_id,img) VALUES ('$out_trade_no','$way')";
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
