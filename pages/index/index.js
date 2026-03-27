// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    notices: ["期末考试安排已公布","图书馆开放时间调整","校园网维护通知"]
  },
  goInfo(){wx.navigateTo({url:"/pages/info/info"})},
  goTool(){wx.navigateTo({url:"/pages/tool/tool"})},
  goLife(){wx.navigateTo({url:"/pages/life/life"})},
  goMap(){wx.navigateTo({url:"/pages/map/map"})}
})
