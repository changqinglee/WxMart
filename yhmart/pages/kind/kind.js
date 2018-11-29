// pages/kind/kind.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:app.globalData.url,
    kind:{},
    selKind:0,
    cildKind:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    /*if(app.globalData.kind != null||app.globalData.kind != undefined){
      _this.setData({
        selKind:app.globalData.kind,
      });
      app.globalData.kind = undefined;
      _this.selChildKind(_this.data.selKind);
    }*/
    /*if(app.globalData.kind == null||app.globalData.kind == undefined){
      _this.setData({
        selKind:0,
      });
    }else{
      _this.setData({
        selKind:parseInt(app.globalData.kind),
      });
      app.globalData.kind = null;
      _this.selChildKind(_this.data.selKind)
    }*/
    wx.request({
      url: this.data.url+'/selkind/selkind.php',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        _this.setData({
          kind:res.data
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
    _this.selChildKind(_this.data.selKind);
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
    if(app.globalData.kind == null||app.globalData.kind == undefined){
      _this.setData({
        selKind:0,
      });
      _this.selChildKind(_this.data.selKind)
    }else{
      _this.selChildKind(app.globalData.kind)
      _this.setData({
        selKind:app.globalData.kind,
      });
      app.globalData.kind = null;
    }
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
  *点击改变一级类目
  */
 changeKind:function(e){
  var _this = this;
  _this.setData({
    selKind:e.currentTarget.dataset.idx,
  });
  _this.selChildKind(_this.data.selKind);
 },
 selChildKind:function(idx){
   var _this = this;
   wx.request({
     url: this.data.url+'/selkind/selkind.php',
     data: {idx:parseInt(idx)+1},
     method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
     success: function(res){
       _this.setData({
        cildKind:res.data,
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
 toGoodsList:function(e){
   wx.navigateTo({
     url: '/pages/goods/goods?id='+e.currentTarget.dataset.id,
   })
 }
})