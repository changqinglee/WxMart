<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/16
 * Time: 13:23
 */

include "../config/sqlconfig.php";

$code = $_POST['code'];

$url = "https://api.weixin.qq.com/sns/jscode2session?appid=".$appid."&secret=".$secret."&js_code=".$code."&grant_type=authorization_code";

function cget($url){
    $postUrl = $url;
    $curl = curl_init();//初始化curl
    curl_setopt($curl, CURLOPT_URL,$postUrl);//抓取指定网页
    curl_setopt($curl, CURLOPT_HEADER, 0);//设置header
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); //不验证证书下同
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    $data = curl_exec($curl);//运行curl
    curl_close($curl);
    return $data;
}

$resopen = cget($url);

$info = json_decode($resopen,true);

$openid = $info['openid'];

$sql = "SELECT id FROM wx_user WHERE openid = '$openid'";

$res = $conn->query($sql);

if ($res->num_rows == 0){
    $insert = "INSERT INTO wx_user (openid) VALUES ('$openid')";
    if ($conn->query($insert)){
        echo "success";
    }else{
        echo  $conn->error;
    }
}

echo $resopen;