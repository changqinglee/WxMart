<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/14
 * Time: 15:00
 */

$host = 'localhost';
$username = 'root';
$password = 'root';
$dbname = 'yhmart';

$appid = "wx2d37b63eabd74b61";

$secret = "3e5e8305e42d159cc0bf852ca0150c58";

$mch_id = "1388056502";

$device_info = "XCX";

$notify_url = "https://xcx.shyuanhuan.com/pay/payresult.php/";

$wxpaykey = "9Cg1VFKG00bc341ZAKga3SESYorm5gcs";

$conn = new mysqli($host,$username,$password,$dbname);

if ($conn->connect_error){
    die($conn->connect_error);
}