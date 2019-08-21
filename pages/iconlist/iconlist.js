Page({
  data: {},
  Tianapi: function () {
    this.onLoad();
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://api.tianapi.com/txapi/saylove/', //天行数据土味情话接口
      data: {
        key: '9b1e305899153e3f07eeddd594c2b5f2'  //apikey请在https://www.tianapi.com中获得
      },
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            content: res.data.newslist[0].content
          })
        } else {
          that.setData({
            content: res.data.msg
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
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
      title: '安利一段土味情话~',
      path: '/pages/iconlist/iconlist',

      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
      
    }
  }
})
