<template>
  <div class="map-h5" ref="mapPage">
    <div class="mapContainer">
      <div id="container">
        <el-amap vid="amap" ref="map" :center="center" :zoom="zoom" :plugin="plugin" :events="events"></el-amap>
        <div class="search-box">
          <span class="searchIcon"><img src="@/assets/global/ic_search@3x.png" alt=""></span>
          <el-amap-search-box :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
        </div>
        <div class="reGetLocation" @click="getCurrentPositionLaglng">
          <div v-if="getLocationLoading" class="geo_over">
            <van-loading />
          </div>
          <div v-else class="geo_over">
            <img src="../../assets/global/ic_map_locating.png" alt="">
          </div>
        </div>
        <div class="point"><img src="@/assets/global/map_pin.png" alt=""></div>
        <div class="selectAddress">
          <div class="inner"> 
            <div class="text">
              <span><img src="@/assets/global/ic_form_location.png" alt=""></span>
              <div class="addressDetail">{{address}}</div>
            </div>
            <div class="btn" >
              <van-button type="primary" size="large" @click="getLagLng">确定使用该地址</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Vue from 'vue'
import VueAMap from 'vue-amap'
import { config } from '@/utils/global'
import { eventManager } from '@/utils/global'
import { Field, Picker, Popup, Uploader, Toast, Button, Icon, Loading, Area } from 'vant'
Vue.use(VueAMap).use(Field).use(Picker).use(Popup).use(Uploader).use(Toast).use(Button).use(Icon).use(Loading).use(Area)

// 初始化高德地图的 key 和插件
VueAMap.initAMapApiLoader({
  key: config.amapKey,
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder', 'AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

export default {
  data(){
    return {
      searchOption: {
        city: '',
        citylimit: true
      },
      getLocationLoading: false,
      currentPosition: false,
      center: [116.397477,39.908692],
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
              if (this.$route.query.location) {
                // console.log(this.$route.query.location.split(','))
                this.center = this.$route.query.location.split(',')
                this.selectAddressChange(this.$route.query.location.split(','))
              } else {
                this.getCurrentPositionLaglng()
              }
            }
          }
        }
      ],
      address: ''
    }
  },
  mounted (){
    let clientHeight = `${document.documentElement.clientHeight}`
    this.$refs.mapPage.style.height = clientHeight+'px'
  },
  methods: {
    back() {
      window.history.back()
    },
    closeMapDialog () {

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
      this.closeMapDialog()
      let data = {
        address: this.address,
        center: this.center
      }
      eventManager.returnEvent('mapLagLng', data)
      this.$router.back(-1)
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
    },
    selectAddressChange (val) {
      var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      })
      geocoder.getAddress(val, (status, result) => {
        if (status == 'complete') {
          this.address = result.regeocode.formattedAddress
        }
      })
    },
  }
}
</script>
<style lang="scss">
.map-h5 {
  width: 100vw;
  height: 100vh;
  .mapContainer {
    width: 100%;
    height: 100%;
    #container {
      width: 100%;
      height: 100%;
      position: relative;
      .reGetLocation {
        position: absolute;
        left: 16px;
        bottom: 190px;
        .geo_loading,
        .geo_over {
          width: 40px;
          height: 40px;
          border-radius: 3px;
          background: #FFFFFF;
          box-shadow: 0 8px 16px 0 rgba(0,0,0,0.12);
          border-radius: 4px;
          img {
            width: 24px;
            height: 24px;
            margin: 8px;
          }
        }
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
      .search-box {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        height: 50px;
        background: #FFFFFF;
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.12);
        .searchIcon {
          width: 24px;
          height: 24px;
          position: absolute;
          top: 13px;
          left: 16px;
          z-index: 100000;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .el-vue-search-box-container {
          height: 50px;
          box-shadow: none;
        }
        .el-vue-search-box-container .search-box-wrapper input {
          height: 36px;
          line-height: 36px;
          background: #FAFAFA;
          border-radius: 2px;
          padding-left: 30px;
          margin-left: 8px;
        }
        .el-vue-search-box-container .search-tips {
          width: 100%;
        }
        .el-vue-search-box-container .search-box-wrapper .search-btn {
          padding: 0 16px;
          width: auto;
        }
        .el-vue-search-box-container .search-tips {
          border: 0;
        }
      }
      .selectAddress {
        box-sizing: border-box;
        position: absolute;
        bottom: 24px;
        left: 16px;
        right: 16px;
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.12);
        border-radius: 4px;
        .inner {
          width: 100%;
          background: #FFFFFF;
          padding-bottom: 16px;
          box-shadow: 0 8px 16px 0 rgba(0,0,0,0.12);
          border-radius: 4px;
          overflow: hidden;
          .btn {
            margin: 0 24px;
            margin-top: 16px;
          }
        }
        .text {
          margin: 0 24px;
          margin-top: 24px;
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
      }
    }
  }
}
</style>
<style lang="scss">
.map-h5 .mapContainer .amap-logo {
  display: none!important;
}
.map-h5 .mapContainer  .amap-copyright {
  display: none!important;
}
.map-h5 .mapContainer .selectAddress .van-button--large {
  height: 36px;
  border-radius: 18px;
  line-height: 36px;
  background-image: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
  border: 0;
}
.map-h5 #container .amap-touch-toolbar .amap-zoomcontrol {
  display: none;
}
.map-h5 #container .amap-geolocation-con {
  display: none;
}
.map-h5 #container .amap-scalecontrol {
  display: none;
}
.map-h5 #container .van-loading__spinner {
  width: 20px;
  height: 20px;
  margin: 10px;
  color: #333!important;
}
</style>
