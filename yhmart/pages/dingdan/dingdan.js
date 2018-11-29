// pages/dingdan/dingdan.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:app.globalData.url,
    hasUserInfo:false,
    openid:app.globalData.openid,
    userInfo:{},
    order:[],
    hasorder:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
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
      url: _this.data.url+'/pay/selorder.php',
      data: {
        openid:app.globalData.openid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        console.log(res);
        var data = res.data;
        for(var i = 0;i<data.length;i++){
          var dataitem = data[i];
          dataitem.detail = JSON.parse(dataitem.detail);
          var detail = dataitem.detail;
          var sum = 0;
          for(var j = 0;j < detail.length;j++){
            sum += detail[j].num?parseInt(detail[j].num):1;
          }
          dataitem['sum'] = sum;
        }
        _this.setData({
          order:res.data,
          hasorder:true
        })
        console.log(_this.data.order);
        // success
      },
      fail: function(res) {
        // fail
        console.log(res);
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toPinglun:function(e){
    wx.navigateTo({
      url: '/pages/pinglun/pinglun?id='+e.currentTarget.dataset.id,
    })
  }
})