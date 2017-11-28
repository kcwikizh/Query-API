//index.js
const app = getApp()
import config from '../../config/config'
Page({
  data: {

  },
  onLoad: function () {
    wx.request({
      url: 'https://wx.kcwiki.org/query',
      data: {
        query: 'mapfast'
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json', (GET模式才能用)
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: (res) => {
        if (res.data.status == "success") {
          console.log(config);
          config.setApiBase('https://wx.kcwiki.org');
        }
        else if ( res.data.status == "error" ) {
          //获取接口数据出错
          wx.request({
            url: 'https://exp.wx.kcwiki.org/query',
            data: {
              query: 'mapfast'
            },
            method: 'POST',
            header: {
              //'content-type': 'application/json', (GET模式才能用)
              "Content-Type": "application/x-www-form-urlencoded",
            },
            success: (res) => {
              if (res.data.status == "success") {
                console.log('数据获取成功');
                config.setApiBase('https://exp.wx.kcwiki.org');
              }
              else if ( res.data.status == "error" ) {
                //获取接口数据出错
                console.log(res.errMsg);
                wx.showToast({
                  title:'服务不可用',
                })
              }
            },
          })
        }
      },
    })
  },

})
