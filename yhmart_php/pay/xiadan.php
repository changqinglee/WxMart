<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/17
 * Time: 18:26
 */

include "../config/sqlconfig.php";

$body = $_POST['body'];

$detail = $_POST['detail'];

$openid = $_POST['openid'];

$total_fee = $_POST['total_fee'];

$out_trade_no = $_POST['out_trade_no'];

$url = "https://api.mch.weixin.qq.com/pay/unifiedorder";

$nonce_str = GetRandStr(32);

$intro = $_POST['intro'];

$ip = $_SERVER['REMOTE_ADDR'];

$stringA = "appid=".$appid."&attach=福利商城&body=".$body."&detail=".$detail."&mch_id=".$mch_id."&nonce_str=".$nonce_str."&notify_url=".$notify_url."&openid=".$openid."&out_trade_no=".$out_trade_no."&total_fee=".$total_fee."&trade_type=JSAPI";

$stringSignTemp = $stringA."&key=".$wxpaykey;

$sign = strtoupper(MD5($stringSignTemp));


/*
 * appid 公众号/小程序 id
 * mch_id 商户号
 * openid 用户标识
 * is_subscribe 是否关注公众账号
 * bank_type 付款银行
 * detail 商品详情
 * total_fee 订单金额
 * transaction_id 微信支付订单号
 * out_trade_no 商户订单号
 * time_end 支付完成时间
 * */

//$result['detail'] = "$detail";


    $sql = "INSERT INTO orders (appid,mch_id,openid,detail,total_fee,out_trade_no,intro) VALUES ('$appid','$mch_id','$openid','$detail','$total_fee','$out_trade_no','$intro')";

    if ($conn->query($sql)){
        $result['status'] = 1;
    }
    else{
        $result['status'] = 0;
        $result['error'] = $conn->error;
        $result['sql'] = $sql;
    }

$postdata = "<xml>
    <appid>".$appid."</appid>  
    <attach>福利商城</attach>
    <body>".$body."</body>
    <mch_id>".$mch_id."</mch_id>
    <detail><![CDATA[".$detail."]]></detail>
    <nonce_str>".$nonce_str."</nonce_str>
    <notify_url>".$notify_url."</notify_url>
    <openid>".$openid."</openid>
    <out_trade_no>".$out_trade_no."</out_trade_no>
    <total_fee>".$total_fee."</total_fee>
    <trade_type>JSAPI</trade_type>
    <sign>".$sign."</sign>
</xml>";






$curl = curl_init();
     //设置抓取的url
      curl_setopt($curl, CURLOPT_URL, $url);
      //设置头文件的信息作为数据流输出
      curl_setopt($curl, CURLOPT_HEADER, 0);
      //设置获取的信息以文件流的形式返回，而不是直接输出。
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      //设置post方式提交
     curl_setopt($curl, CURLOPT_POST, 1);
     //设置post数据
     /*$post_data = array(
             "username" => "coder",
         "password" => "12345"
         );*/
     curl_setopt($curl, CURLOPT_POSTFIELDS, $postdata);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); //不验证证书下同
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
//执行命令
     $data = curl_exec($curl);
     //关闭URL请求
     curl_close($curl);
     //显示获得的数据


$p = xml_parser_create();
xml_parse_into_struct($p, $data, $vals, $index);
xml_parser_free($p);

/*$result['index'] = $index;
$result['vals'] = $vals;*/

/*$NONCE_STR = $index['NONCE_STR'];
$PREPAY_ID = $index['PREPAY_ID'];
$SIGN = $index['SIGN'];*/
//$result['data'] = $data;

$result['nonceStr'] = $vals[$index['NONCE_STR'][0]]['value'];
$result['package'] = $vals[$index['PREPAY_ID'][0]]['value'];
$result['paySign'] = $vals[$index['SIGN'][0]]['value'];
$result['appid'] = $vals[$index['APPID'][0]]['value'];



echo json_encode($result);






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

