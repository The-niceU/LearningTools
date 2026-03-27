Page({
  data: {
    notices: [
      "教务处：关于2025年秋季学期期末考试安排的通知",
      "图书馆：新增电子资源数据库访问权限",
      "后勤处：校园绿化维护施工通知"
    ],
    calendars: [
      "本学期：2025.09-2026.01",
      "国庆放假：10.01-10.07",
      "期末考试：12.25-01.10"
    ],
    lectures: [
      {name: "人工智能前沿技术", time: "10.15 14:00 江安校区一教"},
      {name: "移动互联网发展趋势", time: "10.20 19:00 望江校区二教"}
    ],
    // 控制折叠状态
    showNotice: true,
    showCalendar: false,
    showLecture: false
  },

  // 切换通知面板
  toggleNotice() {
    this.setData({ showNotice: !this.data.showNotice })
  },

  // 切换校历面板
  toggleCalendar() {
    this.setData({ showCalendar: !this.data.showCalendar })
  },

  // 切换讲座面板
  toggleLecture() {
    this.setData({ showLecture: !this.data.showLecture })
  }
})