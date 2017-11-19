const app = getApp();
import {apiBase} from '../../config/config'
// var iotDrawer = require('../../components/drawer-menu/index.js');

Page(Object.assign({}, {}, {
  data: {
    pageData:{},
  },
  getMoreDetail: function( wid ){
    wx.request({
      url: `${apiBase}/query`,
      data: {
        query: 'akashiitem',
        wid: wid,
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json', (GET模式才能用)
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: (res) => {
        if (res.data.status == "success") {
          console.log(res.data);
          this.setData({
            itemDetaildata: res.data.data
          });
        }
        else if ( res.data.status == "error" ) {
          //获取接口数据出错
          console.log(res.errMsg);
          wx.showToast({
            title:'数据获取出错',
          })
        }
      }
    })
  },
  onLoad: function ( e ) {
    this.getMoreDetail(e.wid);
  },
}));
