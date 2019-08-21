const app = getApp()
var wayIndex = -1;
var school_area = '';
var grade = '';
// 当联想词数量较多，使列表高度超过340rpx，那设置style的height属性为340rpx，小于340rpx的不设置height，由联想词列表自身填充
// 结合上面wxml的<scroll-view>
var arrayHeight = 0;
Page({
  data: {
    inputValue: '',
    bindSource: [],
    hideScroll: true,
  },

  onLoad: function () {

  },
  //当键盘输入时，触发input事件
  bindinput: function (e) {
    var that = this;
    var prefix = e.detail.value
    //匹配的结果
    var newSource = []
    if (prefix != "") {
      wx.request({
        url: 'https://api.tianapi.com/txapi/lajifenlei/', //垃圾分类接口
        data: {
          key: '9b1e305899153e3f07eeddd594c2b5f2',
          word: prefix
        },
        success: function (res) {
          if (res.data.code == 200) {
            let temp_data = res.data.newslist;
            var newSource = res.data.newslist.concat(temp_data)
            that.setData({
              hideScroll: false,
              bindSource: newSource,
              arrayHeight: newSource.length * 71
            })
          } 
        }
      })
    }
  },
  query: function (e) {
    var that = this;
    var s = this.data.bindSource[e.target.id]
    that.setData({
      name: s.name,
      type: s.type,
      explain: s.explain,
      contain: s.contain,
      tip: s.tip,
      inputValue: s.name,
      hideScroll: true,
      bindSource: []
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
      title: '你是什么垃圾？',
      path: '/pages/laji/laji',

      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  }
})