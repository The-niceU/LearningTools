Page({
  data: {
    schedule: [
      {
        day: "周一",
        courses: [{name: "移动互联网技术", time: "1-2节"}, {name: "数据结构", time: "3-4节"}]
      },
      {
        day: "周二",
        courses: [{name: "计算机系统结构", time: "1-2节"}, {name: "编译原理", time: "3-4节"}]
      },
      {
        day: "周三",
        courses: [{name: "移动互联网技术", time: "1-2节"}, {name: "体育课", time: "3-4节"}]
      },
      {
        day: "周四",
        courses: [{name: "数据结构", time: "1-2节"}, {name: "编译原理", time: "3-4节"}]
      },
      {
        day: "周五",
        courses: [{name: "计算机系统结构", time: "1-2节"}]
      }
    ],
    emptyRooms: [
      {building: "江安校区一教", room: "201"},
      {building: "望江校区二教", room: "305"},
      {building: "华西校区三教", room: "102"}
    ],
    weather: { temp: '--', info: '加载中...' },
    phones: [
      {name: "教务处", num: "028-85404040"},
      {name: "医务室", num: "028-85401120"},
      {name: "后勤处", num: "028-85407890"},
      {name: "保卫处", num: "028-85401110"}
    ]
  },
  onLoad() {
    this.getWeather();
  },

// 获取天气（新免费IP定位API，无需传城市参数）
getWeather() {
  const that = this;
  wx.request({
    // 接口地址（直接复制）
    url: 'https://v.api.aa1.cn/api/api-tianqi-6/?city=成都',
    // 请求方式：GET（和接口文档一致）
    method: 'GET',
    success: (res) => {
      console.log("天气API返回:", res.data); // 调试用，可删除
      // 接口返回成功（判断状态码）
      if (res.data.code === "200" || res.statusCode === 200) {
        that.setData({
          weather: {
            temp: res.data.temperature,  // 温度（对应接口返回的temperature）
            info: res.data.weather,      // 天气状况（对应接口返回的weather）
            city: res.data.city,         // 当前IP所在城市（自动获取）
            date: res.data.date,         // 日期
            wind: res.data.manner,       // 风向风度
            air: res.data.air_uality    // 空气质量
          }
        });
      } else {
        wx.showToast({
          title: '天气数据获取失败',
          icon: 'none'
        });
      }
    },
    
  });
},

  makeCall(e){
    wx.makePhoneCall({phoneNumber:e.currentTarget.dataset.num})
  },
  copyNum(e){
    wx.setClipboardData({data:e.currentTarget.dataset.num})
  },
  // 跳转到校园地图页面
goToMap() {
  wx.navigateTo({
    url: '/pages/map/map',
    // 增加跳转动画和提示
    success: () => {
      wx.showToast({
        title: '加载地图中...',
        icon: 'none',
        duration: 800
      })
    }
  })
}
})
