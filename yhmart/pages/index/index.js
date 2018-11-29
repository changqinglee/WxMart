//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    url:app.globalData.url,
    wujin:{},
    richang:{},
    weixiu:{},
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    duration:500
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
    wx.login({
      success: function(res){
        wx.request({
          url: _this.data.url+"/user/getopenid.php",
          data: {
            code:res.code
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
          success: function(res){
            console.log(res.data.openid);
            app.globalData.openid = res.data.openid;
            console.log(app.globalData.openid);
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
    wx.request({
      url: this.data.url+'/selimg/selbanner.php',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        _this.setData({
          banner:res.data
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
      url: this.data.url+'/goods/selindexgoods.php',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        console.log(res);
        _this.setData({
          wujin:res.data[0],
          richang:res.data[1],
          weixiu:res.data[2]
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toKindPage:function(e){
    app.globalData.kind = e.currentTarget.dataset.kind;
    wx.switchTab({
      url: '/pages/kind/kind'
    })
  },
  togoodsDet:function(e){
   wx.navigateTo({
    url: "/pages/goodsDet/goodsDet?id="+e.currentTarget.dataset.id,
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
  toDingdan:function(e){
    wx.switchTab({
      url: '/pages/dingdan/dingdan',
    })
  },
  toMine:function(e){
    wx.navigateTo({
      url: '/pages/mine/mine',
    })
  }
})
