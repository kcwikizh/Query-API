
const app = getApp();
import {apiBase} from '../../config/config'

Page({
  data: {
    pageData:{},
    mapNo:'',
    selctPointIndex:''
  },
  bindPickerChange: function(event){
    console.log(event.detail);
    this.setData({
      selctPointIndex: event.detail.value
    })
  },
  getData: function(mapNo){
    wx.request({
      url: `${apiBase}/query`,
      data: {
        query: 'map',
        mapno: mapNo
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json', (GET模式才能用)
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: (res) => {
        if (res.data.status == "success") {
          console.log(res.data.data);
          this.setData({
            pageData: res.data.data
          })
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
  getPointData: function(mapNo){
    wx.request({
      url: `${apiBase}/query`,
      data: {
        query: 'map',
        mapno: mapNo
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json', (GET模式才能用)
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: (res) => {
        if (res.data.status == "success") {
          console.log(res.data.data);
          this.setData({
            pageData: res.data.data
          })
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
  onLoad: function (e) {
    this.getData(e.mid)
    this.setData({
      mapNo: e.mid
    })
  }
})
