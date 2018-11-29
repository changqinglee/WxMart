// pages/goods/goods.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      url:app.globalData.url,
      headAd:'',
      goods:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.selHeadAd();
    wx.request({
      url:  _this.data.url+"/selkind/selkindname.php",
      data: {
        id:options.id,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        _this.setData({
          kindName:res.data
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
    wx.request({
      url: _this.data.url+"/goods/goodslist.php",
      data: {
        kind:options.id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        console.log(res);
        _this.setData({
          goods:res.data
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

  /*
  *自定义函数
  */
 selHeadAd:function(e){
   var _this = this;
   wx.request({
     url: _this.data.url+"/selimg/selbanner.php",
     data: {
       type:"headAd"
     },
     method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
     success: function(res){
       _this.setData({
         headAd:res.data,
       })
     }
   });
 },
 toGoodsDet:function(e){
   wx.navigateTo({
     url: "/pages/goodsDet/goodsDet?id="+e.currentTarget.dataset.id,
   })
 },
 joincart:function(e){
   var _this = this;
   console.log(app.globalData.openid);
   wx.request({
     url: _this.data.url+'/cart/cart.php',
     data: {
       openid:app.globalData.openid,
       goodsid:e.currentTarget.dataset.id
     },
     method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
     success: function(res){
       console.log(res);
       if(res.data.code == 1){
         wx.showToast({
          title:"添加成功！",
          icon:"success",
         })
       }
     },
     fail: function() {
       // fail
     },
     complete: function() {
       // complete
     }
   })
 }
})