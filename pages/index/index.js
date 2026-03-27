// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    notices: [
      {
      id: 1,
      title: "期末考试安排已公布",
      detailUrl: "/pages/noticeDetail/noticeDetail?id=1"
    },
    {
      id: 2,
      title: "图书馆开放时间调整",
      detailUrl: "/pages/noticeDetail/noticeDetail?id=2"
    },
    {
      id: 3,
      title: "校园网维护通知",
      detailUrl: "/pages/noticeDetail/noticeDetail?id=3"
    }
  ]
  },

// 公告点击跳转函数
goNoticeDetail(e) {
  // 获取当前点击项绑定的详情页 URL
  const targetUrl = e.currentTarget.dataset.url;
  wx.navigateTo({
    url: targetUrl
  });
},

  goInfo(){wx.switchTab({url:"/pages/info/info"})},
  goTool(){wx.switchTab({url:"/pages/tool/tool"})},
  goLife(){wx.switchTab({url:"/pages/life/life"})},
  goMap(){wx.navigateTo({url:"/pages/map/map"})}
})
