const app = getApp();
import {apiBase} from '../../config/config'
// var iotDrawer = require('../../components/drawer-menu/index.js');

Page(Object.assign({}, {}, {
  data: {
    pageData:{},
    // tab:''
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
          // console.log(res.data);
          Object.keys(res.data.data.status).forEach((value, index) =>{
            if (index == 0) {

            }
            res.data.data.status[value] = res.data.data.status[value].filter((value, index) =>{
              return index < 10;
            });
          });
          console.log(res.data.data);
          this.setData({
            pageData: res.data.data
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
