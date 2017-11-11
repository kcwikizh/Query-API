const app = getApp();
import {apiBase} from '../../config/config'
var iotDrawer = require('../../components/drawer-menu/index.js');

Page(Object.assign({}, iotDrawer, {
  data: {
    pageData:{},
    itemData:{},
    itemDetaildata:{}
  },
  openDrawer: function(){
    console.log('打开抽屉菜单');
    this.openIotDrawer();
  },
  getMoreDetail: function( event ){
    wx.request({
      url: `${apiBase}/query`,
      data: {
        query: 'akashiitem',
        wid: event.currentTarget.id,
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
      },
    })
  },
  getDetail: function( event ){
    wx.request({
      url: `${apiBase}/query`,
      data: {
        query: 'akashilist',
        type: event.currentTarget.id,
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
            itemData: res.data.data
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
  getData: function(){
    wx.request({
      url: `${apiBase}/query`,
      data: {
        query: `akashitype`
      },
      method: 'POST',
      header: {
        //'content-type': 'application/json', (GET模式才能用)
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: (res) => {
        if (res.data.status == "success") {
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
    console.log(this);
  },
}));
