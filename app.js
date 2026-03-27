App({
  onLaunch() {
    // 保留模板原有日志功能
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 小程序启动自动初始化登录状态
    this.initUserState()
  },

  // 全局数据（所有页面都能访问）
  globalData: {
    openid: "", // 用户唯一ID（数据隔离用）
    userInfo: null, // 用户头像、昵称
    isLogin: false // 登录状态
  },

  // 初始化用户登录状态
  initUserState() {
    // 读取本地存储的用户信息
    const userInfo = wx.getStorageSync('userInfo')
    const openid = wx.getStorageSync('openid')
    
    if (userInfo && openid) {
      // 已经登录，直接写入全局数据
      this.globalData.userInfo = userInfo
      this.globalData.openid = openid
      this.globalData.isLogin = true
      console.log("自动登录成功", userInfo)
    } else {
      // 未登录，生成唯一用户ID（用于数据隔离）
      const newOpenid = 'user_' + Date.now() + Math.random().toString(36).slice(2)
      wx.setStorageSync('openid', newOpenid)
      this.globalData.openid = newOpenid
      console.log("生成用户ID", newOpenid)
    }
  },

  // 保存用户登录信息
  saveUserInfo(userInfo) {
    wx.setStorageSync('userInfo', userInfo)
    this.globalData.userInfo = userInfo
    this.globalData.isLogin = true
  },

  // 退出登录
  logout() {
    wx.removeStorageSync('userInfo')
    this.globalData.userInfo = null
    this.globalData.isLogin = false
    wx.showToast({ title: '已退出登录', icon: 'success' })
  }
})