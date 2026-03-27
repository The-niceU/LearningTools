Page({
  data: {
    notice: {}
  },
  onLoad(options) {
    // 接收从列表页传来的公告 ID
    const noticeId = options.id;
    this.loadNoticeDetail(noticeId);
  },
  // 加载对应公告的详情（模拟数据，后续可对接接口）
  loadNoticeDetail(id) {
    const noticeData = {
      "1": {
        title: "期末考试安排已公布",
        time: "2026-03-28",
        content: "各位同学：2026年春季学期期末考试时间为6月24日-7月5日，具体科目及考场安排请登录教务系统查询。"
      },
      "2": {
        title: "图书馆开放时间调整",
        time: "2026-03-27",
        content: "江安校区图书馆4月1日-4月3日开放时间调整为8:00-20:00，望相互转告。"
      },
      "3": {
        title: "校园网维护通知",
        time: "2026-03-26",
        content: "校园网将于3月30日23:00-次日02:00维护，期间可能中断，请提前准备。"
      }
    };
    this.setData({ notice: noticeData[id] });
  }
});