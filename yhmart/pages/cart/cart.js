// pages/cart/cart.js

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
    totalprice:0,
    carts:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
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
    this.selcarts();
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
  selcarts:function(e){
    var _this = this;
    wx.request({
      url: _this.data.url+"/cart/selcart.php",
      data: {
        openid:app.globalData.openid,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        _this.setData({
          carts:res.data
        });
        _this.getTotalPrice();
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeselected:function(e){
    var _this = this;
    const id = e.currentTarget.dataset.id;
    let carts = _this.data.carts;
    const selected = carts[id].selected;
    carts[id].selected = !selected;
    _this.setData({
      carts:carts
    });
    _this.getTotalPrice();
  },
  getTotalPrice:function(e){
    var _this = this;
    const carts = _this.data.carts;
    var total = 0;
    for(var i = 0;i<carts.length;i++){
      if(carts[i].selected){
        total += parseInt(carts[i].num)*parseFloat(carts[i].price);
      }
    }
    _this.setData({
      totalprice:total.toFixed(2),
    })
  },
  changecartnum:function(e){
    var _this = this;
    var type = e.currentTarget.dataset.type;
    var id = e.currentTarget.dataset.id;
    if(type == 'jian'){
      var num = e.currentTarget.dataset.num;
      if (num == 1){
        wx.showToast({
          title:"数量不能为0",
          icon:"none",
        })
      }
      else{
        wx.request({
          url: _this.data.url+'/cart/changecarts.php',
          data: {
            type:type,
            id:id,
            openid:app.globalData.openid
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
          success: function(res){
            console.log(res);
            _this.selcarts();
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      }
    }
    else{
      wx.request({
        url: _this.data.url+'/cart/changecarts.php',
        data: {
          type:type,
          id:id,
          openid:app.globalData.openid
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
        success: function(res){
          console.log(res);
          _this.selcarts();
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  },
  deletecarts:function(e){
    var _this = this;
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: _this.data.url+'/cart/deletecart.php',
      data: {
        openid:app.globalData.openid,
        id:id
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        console.log(res);
        if(res.data.code == 1){
          wx.showToast({
            title:"删除成功！",
            icon:"success",
          })
        }
        _this.selcarts();
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  toXiadan:function(e){
    var _this = this;
    var thiscart = _this.data.carts;
    var carts = [];
    for(var i = 0;i<thiscart.length;i++){
      if(thiscart[i].selected){
        carts.push(thiscart[i]);
      }
    }
    app.globalData.carts = carts;
    wx.navigateTo({
      url: "/pages/xiadan/xiadan",
    })
  }
})