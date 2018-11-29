<?php
/**
 * Created by PhpStorm.
 * User: enchonglee
 * Date: 2018/11/26
 * Time: 10:46
 */


include "../../config/sqlconfig.php";

$sql = "SELECT * FROM goods";
$res = $conn->query($sql);
if ($res->num_rows > 0){
    while ($row = $res->fetch_assoc()){
        $result[] = $row;
    }
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
    <title>Document</title>
    <script>
        window.onload = function () {
            var option;
            var opt = <?php echo json_encode($result)?>;
            for (var i = 0;i<opt.length;i++){
                var item = opt[i];
                option += "<option value = '"+item.id+"'>"+item.name+"</option>";
            }
            $("#kind").html(option);
        }
    </script>
</head>
<body>
<form id="form1" enctype="multipart/form-data">
    顺序<input type="text" name="price">
    商品<select name="kind" id="kind">

    </select>
    <input type="file">
</form>
<button id="form1sub">提交</button>
</body>
<script>
    $("#form1sub").click(function () {
        var formData = new FormData($('form')[0]);
        formData.append('file', $(':file')[0].files[0]);
        $.ajax({
            url: '../op/addgoodsdetailOP.php',
            type: 'POST',
            data: formData,
            //这两个设置项必填
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
                if (data.code == 1) {
                    alert("Success!");
                }
                else {
                    alert("ERROR");
                }
            },
            dataType:"json",
        })
    });
</script>
</html>