<template>
  <div class="addressInfo">
    <div class="address">
      <div class="title">
        地址信息
      </div>
      <div class="content">
        <div class="item info">
          <div class="itemTitle">公司地址</div>
          <div class="text" v-if="!editMark">
            <p>浙江省杭州市</p>
            <p>双龙街199号金色西溪B座</p>
          </div>
          <div class="editAddress" v-else>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.name"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select class="selectCity" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select class="selectAddress" v-model="input" :loading="loading" :remote-method="selectAddressInput" @change="selectAddressChange" reserve-keyword filterable remote placeholder="请选择">
              <el-option
                v-for="item in searchResult"
                :key="item.id"
                :label="item.name"
                :value="item.lnglat">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item map">
          <div class="itemTitle">地图信息</div>
          <div class="map">
            <el-amap vid="amap" ref="map" :center="center" :zoom="zoom" :plugin="plugin" :events="events"></el-amap>
            <div class="point"><img src="@/assets/global/map_pin.png" alt=""></div>
          </div>
        </div>
      </div>
      <div class="editBtn" v-if="!editMark">
        <button @click="editMark = true">编辑地址</button>
      </div>
      <div class="saveBtn" v-else>
        <button class="cancel" @click="canael">取消</button>
        <button class="save" @click="save">保存</button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueAMap from 'vue-amap';
import { setCookie } from '@/utils/cookie.js'
Vue.use(VueAMap)

// 初始化高德地图的 key 和插件
VueAMap.initAMapApiLoader({
  key: '54f7b2ff0b18deaefc0fd1925e434ead',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder', 'AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

export default {
  data(){
    return {
      loading: false,
      searchResult: [],
      options: [],
      value: '',
      input: '',
      editMark: false,
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
              console.log(result.regeocode)
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
              this.getCurrentPositionLaglng()
              // o.getCurrentPosition((status, result) => {
              //   this.getLocationLoading = true
              //   Toast.loading({
              //     duration: 0,       // 持续展示 toast
              //     forbidClick: true, // 禁用背景点击
              //     loadingType: 'spinner',
              //     message: '正在获取当前位置'
              //   })
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
              //         this.getLocationLoading = true
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
    toChat: function(){
      setCookie('uid', '15515268707')
      setCookie("sdktoken", "b3e8d33f9cfbc94f4ea0e8b41c41fb1c")
      window.open('./IM/im/main.html')
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
      // Toast.loading({
      //   duration: 0,       // 持续展示 toast
      //   forbidClick: true, // 禁用背景点击
      //   loadingType: 'spinner',
      //   message: '正在获取当前位置'
      // });
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
        // Toast.clear()
      })
      AMap.event.addListener(geolocation, 'error', (data) => {
        // Toast.clear()
        // Toast.fail("获取位置信息超时")
      })
    },
    selectAddressChange (val) {
      this.center = [val[0], val[1]]
      var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      })
      geocoder.getAddress(val, (status, result) => {
        if (status == 'complete') {
          // this.address = result.regeocode.formattedAddress
        }
      })
    },
    selectAddressInput(query){
      if (query !== '') {
        this.loading = true
        let autoOptions = {
          city: '全国'
        }
        var placeSearch = new AMap.PlaceSearch(autoOptions);
        placeSearch.search(query, (status, result) => {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result)
          if(result.info == "OK") {
            this.loading = false
            this.searchResult = result.poiList.pois
            for(let i=0;i<this.searchResult.length;i++){
              this.searchResult[i].lnglat = [this.searchResult[i].location.lng, this.searchResult[i].location.lat]
            }
          } else {
            this.searchResult = []
          }
        })
      } else {
        this.searchResult = []
      }
    },
    save () {
      // alert(this.center)
      // alert(this.address)
      this.$store.dispatch('initNimSDK')
    },
    canael() {
      console.log(this.$store.state)
    }
  }
}
</script>
<style lang="scss">
.addressInfo {
  width: 100vw;
  height: 100vh;
  font-size: 48PX;
  .address {
    height: 570Px;
    width: 100%;
    min-width: 1100Px;
    background: #FFFFFF;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.04);
    overflow: hidden;
    .title {
      font-family: PingFangSC-Medium;
      font-size: 16Px;
      color: rgba(0,0,0,0.87);
      line-height: 22Px;
      margin-top: 24Px;
      margin-left: 32Px;
    }
    .content {
      box-sizing: border-box;
      height: 400Px;
      margin-top: 24Px;
      .item {
        float: left;
        box-sizing: border-box;
        width: 50%;
        height: 100%;
        padding: 0 32Px;
        .itemTitle {
          font-family: PingFangSC-Regular;
          font-size: 14Px;
          color: rgba(0,0,0,0.60);
          text-align: left;
          line-height: 20Px;
        }
        .text {
          font-family: PingFangSC-Regular;
          font-size: 14Px;
          color: #000000;
          text-align: left;
          line-height: 20Px;
          margin-top: 16Px;
          p {
            margin-top: 8Px;
          }
        }
        .map {
          background: rgba(0, 0, 0, 0.04);
          height: 365Px;
          margin-top: 16Px;
          position: relative;
          .point {
            width: 20Px;
            height: 40Px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .info {
        border-right: 1Px solid rgba(0,0,0,0.08);
        .editAddress {
          .el-select {
            .el-input {
              width: 224Px;
              min-width: 200Px;
            }
          }
          .selectCity {
            margin-left: 8Px;
          }
          .selectAddress {
            .el-input {
              width: 456Px;
            }
          }
        }
      }
    }
    .saveBtn,
    .editBtn {
      float: right;
      button {
        width: 96Px;
        height: 36Px;
        border: 0;
        outline: none;
        cursor: pointer;
        background: #5AB3A4;
        border-radius: 4Px;
        font-family: PingFangSC-Medium;
        font-size: 15Px;
        color: #FFFFFF;
        text-align: center;
        margin-top: 40Px;
        margin-right: 28Px;
        line-height: 36Px;
      }
      .cancel {
        border: 1px solid rgba(0,0,0,0.38);
        color: rgba(0,0,0,0.87);
        font-size: 15Px;
        background: #FFF;
      }
      .save {
        background: #FF7F4A;
      }
      button:hover {
        background: #000;
      }
    }
  }
}
</style>
