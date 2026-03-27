// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 真正的登录流程
    this.userLogin()
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    openid: "",    // 用户唯一ID
    isLogin: false // 登录状态
  },
  // 登录函数
  userLogin() {
    wx.login({
      success: (res) => {
        if (res.code) {
          // 1. 获取code
          // 2. 传给后端换取 openid（这里需要你的后端接口）
          // wx.request({
          //   url: '你的后端登录接口',
          //   data: { code: res.code },
          //   success: (res) => {
          //     this.globalData.openid = res.data.openid
          //     this.globalData.isLogin = true
          //   }
          // })
        }
      }
    })
  }
})
