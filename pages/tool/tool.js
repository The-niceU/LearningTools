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

  // 获取天气
  getWeather() {
    wx.request({
      url: 'https://api.openweathermap.org/data/2.5/weather?q=Chengdu&appid=42c341777c384c7c3e1b869eaccb0f34&units=metric&lang=zh_cn',
      success: res => {
        if (res.data.main) {
          this.setData({
            weather: {
              temp: res.data.main.temp,
              info: res.data.weather[0].description
            }
          });
        }
      },
      fail: () => {
        this.setData({
          weather: { temp: '22', info: '晴' }
        });
      }
    });
  },

  makeCall(e){
    wx.makePhoneCall({phoneNumber:e.currentTarget.dataset.num})
  },
  copyNum(e){
    wx.setClipboardData({data:e.currentTarget.dataset.num})
  }
})
