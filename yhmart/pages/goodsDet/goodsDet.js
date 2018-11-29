// pages/goodsDet/goodsDet.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:app.globalData.url,
    goodsDet:{},
    nature:{},
    detail:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.selgoodsDet(options.id);
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
        res.data.nature = JSON.parse(res.data.nature);
        var nature = [];
        for(var key in res.data.nature){
          nature.push(key);
        }
        _this.setData({
          goodsDet:res.data,
          nature:nature,
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    }),
    wx.request({
      url: _this.data.url+'/goods/seldetails.php',
      data: {
        id:e,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        _this.setData({
          detail:res.data
        })
        console.log(_this.data.detail)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  joincarts:function(e){
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
  },
  toXiadain:function(e){
    var _this = this;
    var carts = [];
    carts.push(_this.data.goodsDet);
    app.globalData.carts = carts;
    wx.navigateTo({
      url: "/pages/xiadan/xiadan?id="
    })
  },
  
})