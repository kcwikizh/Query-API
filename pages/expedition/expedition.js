const app = getApp();
import {apiBase} from '../../config/config'

Page({
  data: {
    animationData: {},
    pageData:[],
    blockVisiable:''
  },
  showContent: function(event){
    this.setData({
      blockVisiable: event.target.id+''
    })
  },
  getData: function(){
    wx.request({
      url: `${apiBase}/query`,
      data: {
        query: 'expedition'
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json', (GET模式才能用)
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: (res) => {
        if (res.data.status == "success") {
          console.log(res.data.data)
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
      },
    })
  },
  onLoad: function () {
    this.getData();

  },
})
