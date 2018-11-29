# WxMart
简单微信小程序商城demo

下载之后修改yhmart文件夹中的app.js中的globalData里面的url和wxpay的值分别是微信小程序请求的服务器地址和微信商户的微信支付密钥
（微信请求的服务器地址必须支持https协议）

# 修改yhmart_php文件夹中的config文件夹中的sqlconfig

1.$host 修改为你的数据库的地址

2.$username 修改为你的数据库的用户名

3.$password 修改为你的数据库的密码

4.$dbname 修改为你的书库库名

5.$appid 修改为你的微信小程序的appid

6.$secret 修改为你的小程序的secret密钥

7.$mch_id 你的微信商户的商户号

8.$notify_url 微信支付结果的回调地址  （接收回调的文件是  yhmart_php/pay/payresult.php）

9.$wxpaykey 修改为你的微信商户支付的 API密钥

