const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



const share = res => {
  //console.log(res);
  return {
    title: res.name,
    path: res.path,
    //imageUrl: '/images/share.jpg',
    success: function (res) {
      console.log('转发成功');// 转发成功
    },
    fail: function (res) {
      console.log('转发失败');// 转发失败
    }
  }
}
module.exports = {
  share: share,
  formatTime: formatTime
}
