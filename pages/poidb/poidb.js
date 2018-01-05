
const app = getApp();
import {apiBase} from '../../config/config'

Page({
  data: {
    pageData:[],
    currentTab: 0
  },
  clickTab: function(e){
    // console.log(e);
    this.setData({
      currentTab: Number(e.currentTarget.dataset.current)
    })
  },
  swiperTab: function(e){
    // console.log(e);
    this.setData({
      currentTab: Number(e.detail.current)
    })
  },
  toDetail:function( event ){
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: `/pages/poidb-detail/poidb-detail?mid=${id}`
    })
  },
  getData: function(){
    wx.request({
      url: `${apiBase}/query`,
      data: {
        query: 'area'
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json', (GET模式才能用)
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: (res) => {
        if (res.data.status == "success") {
          console.log(res.data.data);
          let index = 0
          let normal = {}
          let event = {}
          for (let a in res.data.data) {
            if (index < 6) {
              normal[a] = (res.data.data[a])
            }
            else {
              event[a] = (res.data.data[a])
            }
            index++;
          }
          this.setData({
            pageData: [normal,event]
          });
          console.log(this.data);
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
    this.getData()
  }
})
