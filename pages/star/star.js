// pages/star/star.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindSource:{},
    select_me: false,
    select_he: false,
    grade_name_me: '选择你的星座',
    grade_name_he: '选择对方星座',
    grades_me: ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'],//我的下拉列表的数据
    grades_he: ['所有','白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'],//对象下拉列表的数据
    index: 0,//选择的下拉列表下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (me, he) {
    var that = this
    
    if (me=='所有'){
      wx.request({
        url: 'https://api.tianapi.com/txapi/xingzuo/',
        data: {
          key: '9b1e305899153e3f07eeddd594c2b5f2',
          all: me,


          he: he




        },
        success: function (res) {
          if (res.data.code == 200) {
            that.setData({
              bindSource: res.data.newslist
              
            })
            wx.hideLoading()
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }else{
      wx.request({
        url: 'https://api.tianapi.com/txapi/xingzuo/',
        data: {
          key: '9b1e305899153e3f07eeddd594c2b5f2',
          me: me,


          he: he




        },
        success: function (res) {
          if (res.data.code == 200) {
            that.setData({
              bindSource: res.data.newslist
            })
            wx.hideLoading()
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })

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
  /*  点击下拉框 */
  bindShowMsg_me() {
    this.setData({
      select_me: !this.data.select
    })
  },
  bindShowMsg_he() {
    this.setData({
      select_he: !this.data.select
    })
  },
  /* 已选下拉框 */

  mySelect_me(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      grade_name_me: name,
      select_me: false
    })
    wx.setStorage({
      key: 'xingzuo_me',
      data: name
    })
  },
  mySelect_he(e) {
    var name = e.currentTarget.dataset.name
    console.log(name);
    var xingzuo_me = wx.getStorageSync('xingzuo_me');
    this.setData({
      grade_name_he: name,
      select_he: false
    })
    this.onLoad(name, xingzuo_me);
    wx.showLoading({
      title: '查询中',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: (res) => {
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      console.log(res.target);
    }
    else {
      console.log("来自右上角转发菜单")
    }
    return {
      title: '查询你的星座运势',
      path: '/pages/star/star',
      
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }

})