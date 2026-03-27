Page({
  data: {
    markers: [
      {
        id: 1,
        latitude: 30.6308,
        longitude: 104.0839,
        name: "四川大学望江校区",
        width: 30,  // 标记点宽度（单位：px）
        height: 30  // 标记点高度（单位：px）
      },
      {
        id: 2,
        latitude: 30.5576,
        longitude: 103.9997,
        name: "图书馆",
        width: 30,  // 必须添加
        height: 30  // 必须添加
      }
    ],
    places: [
      {name:"望江校区图书馆", addr:"靠近南门，自习首选"},
      {name:"一教楼", addr:"基础教学楼"},
      {name:"江安校区食堂", addr:"美食集中地"}
    ]
  },
  showPlace(e) {
    let item = e.currentTarget.dataset.item;
    wx.showModal({
      title: item.name,
      content: item.addr,
      showCancel: false
    })
  }
})