// pages/address/address.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:app.globalData.url,
    address:{},
    qu:['黄浦区','徐汇区','长宁区','静安区','普陀区','虹口区','杨浦区','浦东新区','闵行区','宝山区','嘉定区','金山区','松江区','青浦区','奉贤区','崇明区'],
    index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
        console.log(res);
        _this.data.qu.unshift(res.data.qu);
        if(res.data){
          _this.setData({
            address:res.data,
            hasAddress:true,
            qu:_this.data.qu
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
  bindPickerChange:function(e){
    var idx = e.detail.value;
    this.setData({
      index:idx,
    })
  },
  addressSubmit:function(e){
    var _this = this;
    var detail = e.detail.value;
    if(detail.name == ''){
      wx.showToast({
        title:"请输入姓名",
        icon:"none"
      })
      return false;
    }
    if(detail.tel == ''){
      wx.showToast({
        title:"请输入电话号码",
        icon:"none"
      })
      return false;
    }
    if(detail.detail == ''){
      wx.showToast({
        title:"请输入详细地址并精确到门牌号",
        icon:"none"
      })
      return false;
    }
    wx.request({
      url: _this.data.url+'/user/updateaddress.php',
      data: {
        openid:app.globalData.openid,
        name:detail.name,
        tel:detail.tel,
        detail:detail.detail,
        qu:_this.data.qu[_this.data.index]
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        if(res.data.code == 1){
          wx.showToast({
            title:"更新成功",
            icon:"success"
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          }, 1500);
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