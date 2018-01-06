
const app = getApp();
import {apiBase} from '../../config/config'

Page({
  data: {
    pageData:{},
    pointData:{},
    mapNo:'',
    difficulty: '',
    assessment: '',
    selctPointIndex:'',
  },
  bindPointChange: function(event){
    this.setData({
      selctPointIndex: event.detail.value
    })
    this.getPointData({
      mapno: this.data.mapNo,
      point: this.data.pageData.point[this.data.selctPointIndex]
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
  getPointData: function( payload ){
    console.log(payload);
    wx.request({
      url: `${apiBase}/query`,
      data: {
        query: 'point',
        ... payload
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
            pointData: res.data.data
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
