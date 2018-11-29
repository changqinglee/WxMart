// pages/pinglun/pinglun.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    url:app.globalData.url,
    order:{},
    goodsnum:0,
    photo:[],
    array:['1分','2分','3分','4分','5分','6分','7分','8分','9分','10分'],
    index:0,
    discuss:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      id:options.id
    });
    wx.request({
      url: _this.data.url+'/pay/selorder.php',
      data: {
        id:_this.data.id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        var data = res.data;
        var goodsnum = 0;
        for(var i = 0;i<data.length;i++){
          data[i].detail = JSON.parse(data[i].detail);
        }
        console.log(res);
        var detail = data[0].detail;
        for(var j = 0;j<detail.length;j++){
          goodsnum += parseInt(detail[j].num);
        }
        _this.setData({
          order:res.data[0],
          goodsnum:goodsnum
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  addphoto:function(e){
    var _this = this;
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        var photos = [];
        for(var i = 0;i<res.tempFilePaths.length;i++){
          photos.push(res.tempFilePaths[i])
        }
        _this.setData({
          photo:photos
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
  bindPickerChange:function(e){
    this.setData({
      index:e.detail.value
    })
  },
  discussSub:function(e){
    var photos = this.data.photo;
    var _this = this;
    var discussid = _this.randomWord(6)+app.globalData.openid;
    if(photos.length > 0){
      for(var i = 0;i<photos.length;i++){
        var index = i;
        var file = photos[i];
        wx.uploadFile({
          url: _this.data.url+'/order/uploaddiscussimg.php',
          filePath:file,
          name:'file',
          // header: {}, // 设置请求的 header
          formData: {
            id:_this.data.id,
            discussid:discussid
          }, // HTTP 请求中其他额外的 form data
          success: function(res){
            res.data = JSON.parse(res.data)
            console.log(res)
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      }
    };
    wx.request({
      url: _this.data.url+'/order/adddiscuss.php',
      data: {
        id:_this.data.id,
        discussid:discussid,
        discuss:_this.data.discuss,
        discussnum:_this.data.array[_this.data.index]
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        if(res.data.code == 1){
          wx.showToast({
            title:"评论发布成功",
            icon:"success"
          })
          setTimeout(function () {
          //要延时执行的代码
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
          })
          }, 1000)
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
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
    this.setData({
      discuss:e.detail.value
    })
  }
})