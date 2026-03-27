Page({
  data: {
    canteens: [
      {name: "江安校区一食堂", time: "6:30-21:00", food: "麻辣香锅、牛肉面、盖浇饭"},
      {name: "望江校区二食堂", time: "6:30-20:30", food: "冒菜、炒饭、特色小吃"}
    ],
    express: [
      {name: "顺丰快递", address: "江安校区东门快递点"},
      {name: "中通快递", address: "望江校区南门快递点"}
    ],
    losts: [
      "江安校区一教丢失黑色钱包，内有校园卡",
      "望江校区图书馆丢失蓝色笔记本"
    ],
    goods:"",
    place:"",
    content:"",
    lostList: [],      // 失物列表
    feedbackList: []  // 反馈列表
  },
  // 页面打开时 —— 自动读取本地保存的数据
  onLoad() {
    this.loadData()
  },

  // 读取本地数据
  loadData() {
    let lost = wx.getStorageSync('lostList') || []
    let feedback = wx.getStorageSync('feedbackList') || []
    this.setData({
      lostList: lost,
      feedbackList: feedback
    })
  },
  
  setGoods(e){this.setData({goods:e.detail.value})},
  setPlace(e){this.setData({place:e.detail.value})},
  setContent(e){this.setData({content:e.detail.value})},

  submitLost(){
    let { goods, place, lostList } = this.data
    if (!goods || !place) {
      wx.showToast({ title: '请填写完整', icon: 'none' })
      return
    }
    let newList = [...lostList, { goods, place }]
    this.setData({
      lostList: newList,
      goods: "",
      place: ""
    })

    // 保存到本地
    wx.setStorageSync('lostList', newList)
    wx.showToast({ title: '发布成功' })
  },

  submitFeedback() {
    let { content } = this.data;
    // 校验反馈内容
    if (!content) {
      wx.showToast({ title: '请输入内容', icon: 'none' });
      return;
    }

    let newList = [...this.data.feedbackList, content];
    this.setData({
      feedbackList: newList,
      content: ""
    });

    wx.setStorageSync('feedbackList', newList);
    wx.showToast({ title: '提交成功' });
  },
    // ========== 删除单条失物 ==========
    deleteLost(e) {
      let index = e.currentTarget.dataset.index
      let list = this.data.lostList
      list.splice(index, 1)
      this.setData({ lostList: list })
      wx.setStorageSync('lostList', list)
    },
  
    // ========== 删除单条反馈 ==========
    deleteFeedback(e) {
      let index = e.currentTarget.dataset.index
      let list = this.data.feedbackList
      list.splice(index, 1)
      this.setData({ feedbackList: list })
      wx.setStorageSync('feedbackList', list)
    }
})