<template>
  <div class="merchant-h5-page">
    <div class="merchant-h5">
      <div class="merchant-h5-header">
        <div class="header">
            <div class="headerContent">
                <div class="steps">
                    <div class="number one">1</div>
                    <span class="acitve">注册账号</span>
                </div>
                <div class="steps">
                    <div class="number one two">2</div>
                    <span class="acitve">认领企业</span>
                </div>
                <div class="steps">
                    <div class="number">3</div>
                    <span>提交资质</span>
                </div>
            </div>
        </div>
      </div>
      <div class="enterpriseInfo">
        <div class="title">完善企业基本资料</div>
        <div class="form">
          <div class="formItem">
            <label for="name">机构名称<span class="notNull">*</span></label>
            <div class="input">
              <van-field v-model="name" placeholder="机构名称不能为空" />
            </div>
          </div>
          <div class="formItem">
            <label for="type">机构类型<span class="notNull">*</span></label>
            <div class="input">
                <van-field readonly v-model="type" placeholder="请选择" @click="showPicker = true"/>
            </div>
            <div class="picker">
              <van-popup v-model="showPicker" position="bottom">
                  <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
                  />
                </van-popup>
            </div>
          </div>
          <div class="formItem upload">
            <label for="fileList">机构Logo<span class="notNull">*</span></label>
            <div class="input">
              <van-uploader v-model="fileList" multiple :max-count="2" :before-read="beforeRead" />
            </div>
            <div class="prompt">
              <p>请上传图片</p>
              <p>尺寸240*240px</p>
            </div>
          </div>
          <div class="formItem">
            <label for="position">所在地区<span class="notNull">*</span></label>
            <div class="input">
                <van-field readonly v-model="position" placeholder="请选择" @click="showPicker = true"/>
            </div>
            <div class="picker">
              <van-popup v-model="showPicker" position="bottom">
                  <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
                  />
                </van-popup>
            </div>
          </div>
          <div class="formItem">
            <label for="laglng">地图定位<span class="notNull">*</span></label>
            <div class="input">
                <van-field readonly v-model="laglng" placeholder="请选择" @click="showMapDialog"/>
            </div>
            <div class="picker">
              <van-popup v-model="showMap" :style="{ width: '100%', height: '100%' }">
                <div class="mapContainer">
                  <div class="closeIcon" @click="closeMapDialog">
                    <img src="@/assets/global/ic_white_close.png" alt="">
                  </div>
                  <div id="container">
                    <el-amap vid="amap" ref="map" :center="center" :zoom="zoom" :plugin="plugin" :events="events"></el-amap>
                    <!-- <div class="mapHeader">
                      <span @click="closeMapDialog" class="closeIcon"><img src="@/assets/global/ic_close@3x.png" alt=""></span>
                      <span>地图定位</span>
                    </div> -->
                    <div class="search-box">
                      <span class="searchIcon"><img src="@/assets/global/ic_search@3x.png" alt=""></span>
                      <el-amap-search-box :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
                    </div>
                    <div class="reGetLocation" @click="getCurrentPositionLaglng">
                      <div :class=" getLocationLoading ? 'geo_loading' : 'geo_over'"></div>
                    </div>
                    <div class="point"><img src="@/assets/global/location.png" alt=""></div>
                    <div class="selectAddress">
                      <div class="inner"> 
                        <div class="text">
                          <span><img src="@/assets/global/firm_ic_address@3x.png" alt=""></span>
                          <div class="addressDetail">{{address}}</div>
                        </div>
                        <div class="btn" >
                          <van-button type="primary" size="large" @click="getLagLng">确定使用该地址</van-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </van-popup>
            </div>
          </div>
          <div class="formItem">
            <label for="person">联系人</label>
            <div class="input">
                <van-field v-model="person" placeholder="请填写联系人" />
            </div>
          </div>
          <div class="formItem">
            <label for="phone">联系电话<span class="notNull">*</span></label>
            <div class="input">
                <van-field v-model="phone" placeholder="联系电话不能为空" />
            </div>
          </div>
          <div class="formItem">
            <label for="QQAccount">QQ号</label>
            <div class="input">
                <van-field v-model="QQAccount" placeholder="请填写QQ号" />
            </div>
          </div>
          <div class="formItem">
            <label for="email">电子邮箱</label>
            <div class="input">
              <van-field v-model="email" placeholder="请填写电子邮箱" />
            </div>
          </div>
          <div class="formItem textArea">
            <label for="email">详细介绍</label>
            <div class="input">
              <van-field v-model="intro" type="textarea" placeholder="请输入机构详细介绍" rows="3" />
            </div>
          </div>
          <div class="formItem introPic">
            <label for="email">介绍图 <span class="warning">添加几张图片，让您的服务更受欢迎</span></label>
            <div class="input">
              <div class="introPicList">
                <van-uploader v-model="fileList" multiple :max-count="8" :before-read="beforeRead" />
              </div>
              <div class="prompt">
                <p>最多8张 建议尺寸: 400*400px</p>
              </div>
            </div>
          </div>
          <div class="submitbtn">
            <van-button type="primary" size="large">下一步</van-button>
          </div>
        </div>
      </div>
    </div>
    <!-- <button @click="goChat">去聊天</button> -->
  </div>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap';
import { setCookie } from '@/utils/cookie.js'
import { nativeHideTitleBar } from '@/utils/nativeFunction.js'
import { Field, Picker, Popup, Uploader, Toast, Button, Icon } from 'vant'
Vue.use(VueAMap).use(Field).use(Picker).use(Popup).use(Uploader).use(Toast).use(Button).use(Icon)

// 初始化高德地图的 key 和插件
VueAMap.initAMapApiLoader({
  key: '54f7b2ff0b18deaefc0fd1925e434ead',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder', 'AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

export default {
  data (){
    return {
      name: '',
      type: '',
      position: '',
      laglng: '',
      person: '',
      phone: '',
      QQAccount: '',
      email: '',
      intro: '',
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false,
      username: '',
      password: '',
      fileList: [],
      phone: '',
      showMap: false,
      searchOption: {
        city: '杭州',
        citylimit: true
      },
      getLocationLoading: false,
      currentPosition: false,
      center: [121.59996, 31.197646],
      zoom: 16,
      events: {
        init: (o) => {
          // console.log(o)
        },
        'dragend': (e) => {
          // console.log(this)
          var centerPoint = this.$refs.map.$$getCenter()
          this.center = centerPoint
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress(centerPoint, (status, result) => {
            if (status == 'complete') {
              // console.log(result.regeocode)
              this.address = result.regeocode.formattedAddress
            }
          })
        }
      },
      plugin: [
        'ToolBar', 
        {
          pName: 'Scale',
          events: {
            init(o) {
              // console.log(o);
            }
          }
        },
        {
          pName: 'Geolocation',
          events: {
            init: (o) => {
              // o 是高德地图定位插件实例
              // o.getCurrentPosition((status, result) => {
              //   if (result && result.position) {
              //     console.log(self)
              //     this.center = [result.position.lng, result.position.lat];
              //     var geocoder = new AMap.Geocoder({
              //       radius: 1000,
              //       extensions: 'all'
              //     })
              //     geocoder.getAddress(this.center, (status, result) => {
              //       console.log(status)
              //       if (status == 'complete') {
              //         console.log(result.regeocode)
              //         this.address = result.regeocode.formattedAddress
              //         this.currentPosition = true
              //       } else if(status == 'error') {
              //         alert("定位失败！")
              //       }
              //       Toast.clear()
              //     })
              //   }
              // })
            }
          }
        }
      ],
      address: ''
    }
  },
  created() {
    
  },
  methods: {
    goChat(){
      setCookie('uid', '15515268707')
      setCookie("sdktoken", "b3e8d33f9cfbc94f4ea0e8b41c41fb1c")
      window.open('./IM/im/main.html')
    },
    onConfirm(val){
      console.log(val)
      this.showPicker = false
    },
    // 返回布尔值
    beforeRead(file) {
      console.log(file)
      var reader = new FileReader()
      reader.onload = function(evt){
        console.log(evt)
				var image = new Image();
        image.src=evt.target.result;
        image.onload = function(){
          var height = image.height;
          var width = image.width;
          var filesize = image.fileSize;
          console.log(height)
          console.log(width)
        }
      }
      reader.readAsDataURL(file)
      // if (file.type !== 'image/jpeg') {
      //   Toast('请上传 jpg 格式图片');
      //   return false;
      // }
      return true;
    },
    showMapDialog(){
      this.showMap = true;
      // nativeHideTitleBar({hide: true})
      // if (!this.currentPosition) {
      //   Toast.loading({
      //     duration: 0,       // 持续展示 toast
      //     forbidClick: true, // 禁用背景点击
      //     loadingType: 'spinner',
      //     message: '正在获取当前位置'
      //   });
      // }
      this.getCurrentPositionLaglng()
    },
    closeMapDialog(){
      this.showMap = false;
      nativeHideTitleBar({hide: false})
    },
    onSearchResult(pois) {
      // console.log(pois)
      if (pois.length > 0) {
        let center = {
          lng: pois[0].lng,
          lat: pois[0].lat
        };
        this.center = [center.lng, center.lat];
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
        geocoder.getAddress(this.center, (status, result) => {
          if (status == 'complete') {
            // console.log(result.regeocode)
            this.address = result.regeocode.formattedAddress
          }
        })
      }
    },
    getLagLng(){
      // console.log(this.plugin)
      this.closeMapDialog()
      alert('当前地址为：' + this.address + ',当前经纬度为：' + this.center)
    },
    getCurrentPositionLaglng(){
      this.getLocationLoading = true
      Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '正在获取当前位置'
      });
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,     
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB'
      })

      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', (data) => {
        this.center = [data.position.lng, data.position.lat];
        this.address = data.formattedAddress
        this.getLocationLoading = false
        Toast.clear()
      })
      AMap.event.addListener(geolocation, 'error', (data) => {
        Toast.clear()
        Toast.fail("获取位置信息超时")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.merchant-h5-page {
  background-color: #f5f5f5;
}
.merchant-h5-header {
  width: 100%;
  height: 100px;
  background-color: #fff;
}
.merchant-h5-header .header .headerContent .steps .two::before {
  background: #FFAD71;
}
.enterpriseInfo .title {
  height: 52px;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: rgba(0,0,0,0.87);
  text-align: left;
  line-height: 52px;
  margin-left: 16px;
}
.enterpriseInfo .form {
  background-color: #f5f5f5;
}
.enterpriseInfo .form .formItem {
  height: 48px;
  display: flex;
  background-color: #fff;
}
.enterpriseInfo .form .formItem.upload {
  height: 104px;
}
.enterpriseInfo .form .formItem.upload .input {
  margin-top: 16px;
  flex: 0;
}
.enterpriseInfo .form .formItem.introPic .prompt,
.enterpriseInfo .form .formItem.upload .prompt {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: rgba(0,0,0,0.26);
  text-align: left;
  line-height: 18px;
  margin-top: 34px;
}
.enterpriseInfo .form .formItem.upload .prompt p {
  margin: 0;
  padding: 0;
}
.enterpriseInfo .form .formItem label {
  box-sizing: border-box;
  width: 120px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: rgba(0,0,0,0.60);
  text-align: left;
  line-height: 48px;
  padding-left: 16px;
}
.formItem .input {
  flex: 1;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  text-align: left;
}
.notNull {
  color: #FF7F4A;
}
.merchant-h5 .van-action-sheet {
	height: 100%;
	max-height: 100%;
}
#container {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  bottom: 70px;
  .reGetLocation {
    position: absolute;
    left: 16px;
    bottom: 150px;
    .geo_loading {
      background: #fff url(https://webapi.amap.com/theme/v1.3/loading.gif) 50% 50% no-repeat;
      width: 35px;
      height: 35px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
    .geo_over {
      background: #fff url(https://webapi.amap.com/theme/v1.3/markers/b/loc_gray.png) 50% 50% no-repeat;
      width: 35px;
      height: 35px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
  }
}
.search-box {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  height: 48px;
  margin: 0 auto;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.12);
  border-radius: 4px;
  .el-vue-search-box-container .search-box-wrapper input {
    height: 36px;
    line-height: 36px;
  }
}
// .mapHeader {
//   position: absolute;
//   top: 0px;
//   left: 0px;
//   width: 100%;
//   height: 56px;
//   background-color: #fff;
//   text-align: center;
//   line-height: 56px;
//   font-family: PingFangSC-Medium;
//   font-size: 16px;
//   color: rgba(0,0,0,0.87);
//   .closeIcon {
//     position: absolute;
//     top: 16px;
//     left: 16px;
//     width: 24px;
//     height: 24px;
//     img {
//       display: block;
//       width: 100%;
//       height: 100%;
//     }
//   }
// }
.search-box .searchIcon {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 100000;
  img {
    width: 100%;
    height: 100%;
  }
}
#container .el-vue-search-box-container {
	position: absolute;
  width: 100%;
  height: 48px;
  background: #FFFFFF;
  box-shadow: none;
  border-radius: 0;
}
.point {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -100%);
	width: 20px;
  height: 40px;
  background-color: transparent;
  img {
    display: block;
    width: 100%;
		height: 100%;
  }
}
.selectAddress {
  width: 100%;
  box-sizing: border-box;
	position: absolute;
  bottom: 0px;
  left: 50%;
	transform: translate(-50%, 0);
	.inner {
    width: 100%;
    background: #FFFFFF;
    padding-bottom: 16px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.12);
    border-radius: 4px;
    overflow: hidden;
    .btn {
      margin: 0 16px;
      margin-top: 16px;
    }
  }
}
.selectAddress .text {
  margin: 0 16px;
  margin-top: 16px;
  display: flex;
  span {
    display: block;
    width: 20px;
    height: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .addressDetail {
    flex: 1;
    min-height: 40px;
    margin-left: 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.87);
    text-align: left;
    line-height: 20px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
.merchant-h5-page {
  text-align: left;
  .form {
    .formItem.textArea {
      display: block;
      margin-top: 8px;
      height: auto;
      label {
        width: 100%;
      }
      .input {
        width: 100%;
      }
    }
    .formItem.introPic {
      display: block;
      margin-top: 8px;
      height: auto;
      label {
        width: 100%;
        .warning {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: rgba(0,0,0,0.26);
          text-align: left;
          line-height: 18px;
          margin-left: 12px;
        }
      }
      .input {
        padding: 0 16px 8px;
        .prompt {
          margin-top: 8px;
        }
      }
    }
    .submitbtn {
      padding: 24px;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: #FFFFFF;
      text-align: center;
      line-height: 18px;
    }
    .van-popup {
      background: none;
    }
    .mapContainer {
      width: 100%;
      height: 100%;
      .closeIcon {
        width: 40px;
        height: 40px;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 0);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.enterpriseInfo .form .formItem.introPic .van-uploader__upload,
.enterpriseInfo .form .formItem.upload .van-uploader__upload {
  background-color: #f5f5f5;
  border: 0;
}
.enterpriseInfo .form .formItem.introPic .van-uploader__upload .van-icon-plus:before,
.enterpriseInfo .form .formItem.upload .van-uploader__upload .van-icon-plus:before {
  content: "\F098";
}
.enterpriseInfo {
  .van-uploader__upload {
    width: 72px;
    height: 72px;
  }
  .btn .van-button--large,
  .submitbtn .van-button--large {
    height: 36px;
    border-radius: 18px;
    line-height: 36px;
    background-image: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
    border: 0;
  }
  input::-webkit-input-placeholder{
    color: rgba(0,0,0,0.26);
  }
  input::-moz-placeholder{
    color: rgba(0,0,0,0.26);      
  }
  input:-ms-input-placeholder{ 
    color: rgba(0,0,0,0.26);
  }
  .mapContainer .amap-logo {
    display: none;
  }
}
#container .el-vue-search-box-container {
  height: 100%;
}
#container .el-vue-search-box-container .search-tips {
	width: 100%;
}
#container .amap-touch-toolbar .amap-zoomcontrol {
  display: none;
}
.enterpriseInfo .el-vue-search-box-container .search-box-wrapper input {
  height: 36px;
  line-height: 36px;
  padding-left: 25px;
  border-radius: 2px;
  margin-left: 8px;
  margin-right: 10px;
}
.enterpriseInfo .el-vue-search-box-container .search-box-wrapper .search-btn {
  font-size: 15px;
  margin-right: 10px;
  font-family: PingFangSC-Medium;
  font-size: 15px;
  color: rgba(0,0,0,0.87);
  line-height: 18px;
  display: block;
  height: auto;
  text-align: center;
  border-left: 1px solid rgba(0,0,0,0.12);
}
.enterpriseInfo .el-vue-search-box-container .search-tips {
  border: 0;
}
#container .amap-geolocation-con {
  display: none;
  left: 16px!important;
	bottom: 190px!important;
}
#container .amap-scalecontrol {
  display: none;
	left: 10px!important;
	bottom: 100px!important;
}
.enterpriseInfo .van-popup {
  -webkit-transition: 0s ease-out;
  transition: 0s ease-out;
  -webkit-overflow-scrolling: touch;
}
</style>
