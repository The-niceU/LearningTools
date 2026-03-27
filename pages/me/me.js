const app = getApp()

Page({
  data: {
    isLogin: false,
    openid: "",
    userInfo: null,
    avatarUrl: "",
    nickname: "",
    lostList: [],
    feedbackList: []
  },

  onShow() {
    // 页面显示时，同步全局登录状态和用户数据
    this.initPage()
  },

  // 初始化页面数据
  initPage() {
    this.setData({
      isLogin: app.globalData.isLogin,
      openid: app.globalData.openid,
      userInfo: app.globalData.userInfo
    })
    // 加载当前用户的发布数据
    this.loadMyData()
  },

  // 加载用户自己的失物和反馈数据
  loadMyData() {
    const openid = app.globalData.openid
    // 读取本地存储的所有数据
    const allLost = wx.getStorageSync("lostList") || []
    const allFeed = wx.getStorageSync("feedbackList") || []
    // 只筛选当前用户的数据
    this.setData({
      lostList: allLost.filter(item => item.openid === openid),
      feedbackList: allFeed.filter(item => item.openid === openid)
    })
  },

  // 获取微信头像
onChooseAvatar(e) {
  this.setData({
    avatarUrl: e.detail.avatarUrl
  })
  // 实时预览头像（可选优化）
  this.setData({
    'userInfo.avatarUrl': e.detail.avatarUrl
  })
},


  // 获取微信昵称
  onInputNickname(e) {
    this.setData({
      nickname: e.detail.value
    })
  },

  // 提交登录
  submitLogin() {
    const { avatarUrl, nickname } = this.data
    if (!avatarUrl || !nickname) {
      wx.showToast({ title: '请完善头像和昵称', icon: 'none' })
      return
    }

    // 保存用户信息到全局和本地
    const userInfo = { avatarUrl, nickname }
    app.saveUserInfo(userInfo)

    // 更新页面状态
    this.setData({
      isLogin: true,
      userInfo: userInfo,
      avatarUrl: "",
      nickname: ""
    })

    wx.showToast({ title: '登录成功', icon: 'success' })
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.logout()
          this.initPage()
        }
      }
    })
  }
})