// 【唯一新增：必须加在最顶部，修复按钮无响应】
const app = getApp();

Page({
  data: {
    openid: "",
    canteens: [
      { name: "江安校区一食堂", time: "6:30-21:00", food: "麻辣香锅、牛肉面" },
      { name: "望江校区二食堂", time: "6:30-20:30", food: "冒菜、炒饭" }
    ],
    express: [
      { name: "顺丰快递", address: "江安校区东门快递点" },
      { name: "中通快递", address: "望江校区南门快递点" }
    ],
    goods: "",
    place: "",
    content: "",
    lostList: [],      // 原有失物招领列表
    feedbackList: []   // 原有意见反馈列表
  },

  // 页面加载（保留原有逻辑，仅补充openid赋值）
  onLoad() {
    this.setData({
      openid: app.globalData.openid
    })
    this.loadMyData(); // 加载本地数据（原有逻辑）
  },

  // =====================================
  // 【原有功能：读取本地存储的个人数据】（完全未改动）
  // =====================================
  loadMyData() {
    const openid = this.data.openid;
    // 读取本地所有数据
    let allLost = wx.getStorageSync("lostList") || [];
    let allFeed = wx.getStorageSync("feedbackList") || [];
  
    // 兼容处理：旧数据（无openid）也显示，新数据按openid筛选
    let myLost = allLost.filter(item => {
      // 旧数据无openid → 显示；新数据必须匹配当前用户openid
      return !item.openid || item.openid == openid;
    });
    let myFeed = allFeed.filter(item => {
      return !item.openid || item.openid == openid;
    });
  
    this.setData({
      lostList: myLost,
      feedbackList: myFeed
    });
  },

  // =====================================
  // 【原有输入绑定】（完全未改动）
  // =====================================
  setGoods(e) { this.setData({ goods: e.detail.value }) },
  setPlace(e) { this.setData({ place: e.detail.value }) },
  setContent(e) { this.setData({ content: e.detail.value }) },

  // =====================================
  // 【原有发布功能：失物招领】（仅补充openid，逻辑未改动）
  // =====================================
  submitLost() {
    let { openid, goods, place } = this.data;
    if (!goods || !place) {
      wx.showToast({ title: '请填写完整', icon: 'none' });
      return;
    }

    let newItem = { openid, goods, place };
    let allLost = wx.getStorageSync("lostList") || [];
    allLost.push(newItem);

    wx.setStorageSync("lostList", allLost);
    this.setData({ goods: "", place: "" });
    this.loadMyData();
    wx.showToast({ title: '发布成功' });
  },

  // =====================================
  // 【原有发布功能：意见反馈】（仅补充openid，逻辑未改动）
  // =====================================
  submitFeedback() {
    let { openid, content } = this.data;
    if (!content) {
      wx.showToast({ title: '请输入内容', icon: 'none' });
      return;
    }

    let newItem = { openid, content };
    let allFeed = wx.getStorageSync("feedbackList") || [];
    allFeed.push(newItem);

    wx.setStorageSync("feedbackList", allFeed);
    this.setData({ content: "" });
    this.loadMyData();
    wx.showToast({ title: '反馈成功' });
  },

  // =====================================
  // 【原有删除功能：失物招领】（完全未改动）
  // =====================================
  deleteLost(e) {
    let index = e.currentTarget.dataset.index;
    let openid = this.data.openid;
    // 1. 读取当前用户显示的失物列表（和页面渲染的列表完全一致）
    let myLost = this.data.lostList; 
    // 2. 校验索引有效性
    if (index < 0 || index >= myLost.length) {
      wx.showToast({ title: '数据不存在', icon: 'none' });
      return;
    }
    // 3. 拿到要删除的那条数据
    let deleteItem = myLost[index];
    // 4. 读取本地所有失物数据，过滤掉要删除的这条
    let allLost = wx.getStorageSync("lostList") || [];
    allLost = allLost.filter(item => {
      // 精准匹配：openid+goods+place 确保删对数据
      return !(item.openid === deleteItem.openid && item.goods === deleteItem.goods && item.place === deleteItem.place);
    });
    // 5. 同步到本地存储并刷新列表
    wx.setStorageSync("lostList", allLost);
    this.loadMyData();
    wx.showToast({ title: '删除成功', icon: 'success' });
  },

  // =====================================
  // 【原有删除功能：意见反馈】（完全未改动）
  // =====================================
  deleteFeedback(e) {
    let index = e.currentTarget.dataset.index;
    let openid = this.data.openid;
    // 1. 读取当前用户显示的反馈列表（和页面渲染的列表完全一致）
    let myFeed = this.data.feedbackList;
    // 2. 校验索引有效性
    if (index < 0 || index >= myFeed.length) {
      wx.showToast({ title: '数据不存在', icon: 'none' });
      return;
    }
    // 3. 拿到要删除的那条数据
    let deleteItem = myFeed[index];
    // 4. 读取本地所有反馈数据，过滤掉要删除的这条
    let allFeed = wx.getStorageSync("feedbackList") || [];
    allFeed = allFeed.filter(item => {
      // 精准匹配：openid+content 确保删对数据
      return !(item.openid === deleteItem.openid && item.content === deleteItem.content);
    });
    // 5. 同步到本地存储并刷新列表
    wx.setStorageSync("feedbackList", allFeed);
    this.loadMyData();
    wx.showToast({ title: '删除成功', icon: 'success' });
  }
});