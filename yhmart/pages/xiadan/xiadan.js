// pages/xiadan/xiadan.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:app.globalData.url,
    openid:app.globalData.openid,
    goodsDet:[],
    hasAddress:false,
    address:{},
    totalnum:0,
    totalprice:0,
    hasweixiu:false,
    photo:[],
    xiadan:{},
    textvalue:"",
    tag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if(options.id){
    _this.selgoodsDet(options.id);
    }else{
      _this.setData({
        goodsDet:app.globalData.carts
      })
      var goodsDet = _this.data.goodsDet;
      for(var i = 0;i<goodsDet.length;i++){
        if(goodsDet[i].name == '水电路维修' || goodsDet[i].name == '木工类维修' || goodsDet[i].name == '瓦工类维修' || goodsDet[i].name == '油漆类维修'){
          _this.setData({
            hasweixiu:true
          })
        }
      }
      console.log(_this.data.goodsDet);
      _this.gettotalPrice();
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    wx.request({
      url: _this.data.url+'/user/seladdress.php',
      data: {
        openid:app.globalData.openid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        if(res.data){
          _this.setData({
            address:res.data,
            hasAddress:true
          })
        }
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  selgoodsDet:function(e){
    var _this = this;
    wx.request({
      url: _this.data.url+"/goods/selgoods.php",
      data: {
        id:e,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        console.log(res);
        var arr = _this.data.goodsDet;
        arr.push(res.data);
        _this.setData({
          goodsDet:arr
                });
        _this.gettotalPrice();
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  xiadan:function(e){
    var _this = this;
    if(_this.data.hasAddress == false){
      wx.showToast({
        title:"请先添加收货地址",
        icon:"none"
      })
      return false;
    }
    var photo = _this.data.photo;
    var body = _this.data.goodsDet[0].name;
    var detail = "[";
    var price = parseFloat(_this.data.totalprice)*100;
    var out_trade_no = new Date().getTime()+_this.randomWord(false,6);
    var goodsDet = _this.data.goodsDet;
    for(var i = 0;i<goodsDet.length;i++){
      var gooditem = goodsDet[i];
      detail += '{"id":"'+gooditem.id+'","img":"'+gooditem.img+'","kind":"'+gooditem.kind+'","name":"'+gooditem.name+'","price":"'+gooditem.price+'"';
      if(gooditem.num && i == goodsDet.length - 1){
        //detail += ",num:''"+gooditem.num+"''}"
        detail += ',"num":"'+gooditem.num+'"}';
      }else if(gooditem.num){
        detail += ',"num":"'+gooditem.num+'"},'
      }
      else{
        detail += "}"
      }
    }
    detail += "]";
    //console.log(detail);
    if(_this.data.hasweixiu){
      console.log(_this.data.textvalue)
      if(_this.data.textvalue == ""){
        wx.showToast({
          title:"请描述您的问题",
          icon:"none",
        })
        return false;
      }
      if(photo.length == 0){
        wx.showToast({
          title:"请添加图片",
          icon:"none",
        })
        return false;
      }
      var index = 0;
      for(var j = 0;j<photo.length;j++){
        index = j;
        wx.uploadFile({
          url: _this.data.url+'/pay/xiadanimg.php',
          filePath:photo[j],
          name:'img',
          // header: {}, // 设置请求的 header
           formData: {
            out_trade_no:out_trade_no,
           }, // HTTP 请求中其他额外的 form data
          success: function(res){
            //res.data = JSON.parse(res.data);
            console.log(res);
          },
          fail: function() {
            console.log(res);
          },
          complete: function() {
            // complete
          }
        })
      }
    }
      wx.request({
        url:  _this.data.url+'/pay/xiadan.php',
        data: {
          out_trade_no:out_trade_no,
          body:body,
          detail:detail,
          total_fee:price,
          openid:app.globalData.openid,
          intro:_this.data.textvalue,
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
        success: function(res){
          // success
          var timeStamp = Date.parse(new Date()).toString();
          wx.request({
            url: _this.data.url+'/md5.php',
            data: {
              srt:"appId="+res.data.appid+"&nonceStr="+res.data.nonceStr+"&package=prepay_id="+res.data.package+"&signType=MD5&timeStamp="+timeStamp+"&key="+app.globalData.wxpay
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
            success: function(result){
              wx.requestPayment({
                timeStamp: timeStamp,
                nonceStr: res.data.nonceStr,
                package: 'prepay_id='+res.data.package,
                signType: 'MD5',
                paySign: result.data,
                success (res) {
                  if(res.errMsg == 'requestPayment:ok'){
                    wx.showToast({
                      title:"支付成功！",
                      icon:"success"
                    });
                    setTimeout(function(){
                      wx.navigateTo({
                        url: '/pages/index/index',
                      })
                    },1500)
                  }
                },
                fail (res) {
                  console.log(res);
                }
              })
            },
            fail: function() {
              // fail
            },
            complete: function() {
              // complete
            }
          })
  
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },
  plusnum:function(e){
    var i = e.currentTarget.dataset.idx;
    var _this = this;
    var goodsDet = _this.data.goodsDet;
    if(goodsDet[i].num){
      goodsDet[i]['num'] = parseInt(goodsDet[i]['num']);
      goodsDet[i]['num'] += 1;
    }else{
      goodsDet[i]['num'] = 2;
    }
    console.log(goodsDet);
    _this.setData({
      goodsDet:goodsDet,
    })
    _this.gettotalPrice();
  },
  jiannum:function(e){
    var i = e.currentTarget.dataset.idx;
    var _this = this;
    var goodsDet = _this.data.goodsDet;
    if(goodsDet[i].num && goodsDet[i].num > 1){
      goodsDet[i]['num'] -= 1;
      _this.setData({
        goodsDet:goodsDet,
      })
      _this.gettotalPrice();
    }else{
      wx.showToast({
        icon:"none",
        title:"数量不能小于1"
      })
    }
  },
  gettotalPrice:function(e){
    var _this = this;
    var goodsDet = _this.data.goodsDet;
    var totalPrice = 0;
    var totalnum = 0;
    for(var i = 0;i<goodsDet.length;i++){
      if(goodsDet[i].num){
        totalPrice += parseInt(goodsDet[i].num) * parseFloat(goodsDet[i].price);
        totalnum += parseInt(goodsDet[i].num);
      }else{
        totalPrice += parseFloat(goodsDet[i].price,2);
        totalnum += 1;
      }
    }
    _this.setData({
      totalprice:parseFloat(totalPrice).toFixed(2),
      totalnum:totalnum,
    })
  },
  toAddAddress:function(e){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  addphoto:function(e){
    var _this = this;
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        var img = res.tempFilePaths;
        var photo = _this.data.photo;
        for(var i = 0;i<img.length;i++){
          photo.push(img[i]);
        }
        _this.setData({
          photo:photo
        })
        console.log(_this.data.photo);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  /*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
** xuanfeng 2014-08-28
*/
 
 randomWord:function(randomFlag, min, max){
  var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if(randomFlag){
      range = Math.round(Math.random() * (max-min)) + min;
  }
  for(var i=0; i<range; i++){
      var pos = Math.round(Math.random() * (arr.length-1));
      str += arr[pos];
  }
  return str;
},
textareaInput:function(e){
  var _this = this;
  _this.setData({
    textvalue:e.detail.value,
  })
}
})