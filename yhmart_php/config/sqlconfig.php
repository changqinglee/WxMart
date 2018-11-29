<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/14
 * Time: 15:00
 */

$host = '数据库地址';     //修改为自己的数据库连接信息
$username = '数据库用户名';
$password = '数据库密码';
$dbname = '数据库的名称';

$appid = "wxxxxxxxxxxxxxxxxx"; //填写为自己微信小程序的APPID

$secret = "3e5e8305e42d159cc0bf852cxxxyyyxy";  //填写为自己的secret密钥

$mch_id = "1388050000";  //填写为自己微信商户的商户号

$device_info = "XCX";

$notify_url = "https://xcx.shyuanhuan.com/pay/payresult.php/";  //微信支付的回调地址

$wxpaykey = "9Cg1VFKG00bc341ZAKga3Sxxxxxxxxxx";  //自己微信商户的支付密钥

$conn = new mysqli($host,$username,$password,$dbname);

if ($conn->connect_error){
    die($conn->connect_error);
}