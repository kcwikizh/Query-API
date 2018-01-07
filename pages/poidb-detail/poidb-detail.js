
const app = getApp();
import {apiBase} from '../../config/config'

Page({
  data: {
    pageData:{},
    pointData:{},
    asseOption:[{
      value: 'S',
      label:'S以上'
    },{
      value: 'SA',
      label:'A以上'
    },{
      value: 'SAB',
      label:'B以上'
    }],
    diffOption:[{
      value: 3,
      label:'甲'
    },{
      value: 2,
      label:'乙'
    },{
      value: 1,
      label:'丙'
    }],
    mapNo:'',
    mapType:'',
    selctPointIndex:'',
    selctDiffIndex:'',
    selctAsseIndex:'',
  },
  bindPickerChange: function(event){
    if (event.target.id == 'point') {
      this.setData({
        selctPointIndex: event.detail.value
      })
    }else if (event.target.id == 'assessment') {
      this.setData({
        selctAsseIndex: event.detail.value
      })
    }else if (event.target.id == 'difficulty') {
      this.setData({
        selctDiffIndex: event.detail.value
      })
    }
    if (this.data.selctPointIndex != '' && this.data.selctAsseIndex != '') {
      if (this.data.mapType == 'event' && this.data.selctDiffIndex == '') {
        return
      }
      this.getPointData({
        mapno: this.data.mapNo,
        point: this.data.pageData.point[this.data.selctPointIndex],
        assessment: this.data.selctAsseIndex != '' ? (this.data.asseOption[this.data.selctAsseIndex].value):'',
        difficulty: this.data.selctDiffIndex != '' ? (this.data.diffOption[this.data.selctDiffIndex].value):''
      })
    }
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
      mapNo: e.mid,
      mapType: e.type
    })
  }
})
