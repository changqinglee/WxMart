<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/23
 * Time: 20:00
 */


include "../../config/sqlconfig.php";

$sql = "SELECT * FROM goods";

$res = $conn->query($sql);
if ($res->num_rows > 0){
    while ($row = $res->fetch_assoc()){
        $goods[] = $row;
    }
}

$html = "";

for ($i = 0;$i<count($goods);$i++){
    $item = $goods[$i];
    $html .= "<option value='".$item['id']."'>".$item['name']."</option>";
}


?>
<!doctype html>
<html lang="zh_CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="../res/js/jquery-3.3.1.min.js"></script>
    <title>商品添加属性</title>
</head>
<body>
<select name="name" id="name">
    <?php echo $html;?>
</select>

<div class="nature">
    <div>
        属性名：<input type="text" class="key">属性值：<input type="text" class="value">
    </div>
</div>
<button id="addNature">添加属性</button>&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" id="natureSub">提交</button>
<script>
    var addhtml = '<div>属性名：<input type="text" class="key">属性值：<input type="text" class="value"></div>';
    $("#addNature").click(function () {
        var html = $(".nature").html();
        $(".nature").html(html+addhtml);
    });
    $("#natureSub").click(function () {
        var json = "{";
        var key = document.getElementsByClassName("key");
        var val = document.getElementsByClassName("value");
        var length = key.length;
        for (var i = 0;i<length;i++){
            if (i == length-1){
                json += '"'+key[i].value+'":"'+val[i].value+'"';
            }else {
                json += '"'+key[i].value+'":"'+val[i].value+'",';
            }
        }
        json += "}";

        $.post(
            "addnatureOP.php",
            {
                id:$("#name").val(),
                nature:json
            },
        function (res) {
            console.log(res);
        },
        "json"
        )
    })
</script>
</body>
</html>
