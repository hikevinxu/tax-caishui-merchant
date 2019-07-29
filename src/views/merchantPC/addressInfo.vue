<template>
  <div class="addressInfo">
    <div class="address">
      <div class="title">
        地址信息
      </div>
      <div class="content">
        <div class="item info">
          <div class="editAddress">
            <el-select :disabled="editMark" v-model="provinceCode" @change="provinceCodeChange" placeholder="请选择">
              <el-option
                v-for="item in provinceList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-select :disabled="editMark" class="selectCity" v-model="cityCode"  @change="cityCodeChange" placeholder="请选择">
              <el-option
                v-for="item in cityList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-select :disabled="editMark" class="selectArea" v-model="areaCode" placeholder="请选择">
              <el-option
                v-for="item in areaList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
            <el-input :disabled="editMark" class="addressInput" v-model="address" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="item map">
          <div class="itemTitle">地图信息</div>
          <el-select class="selectAddress" v-model="searchInput" :loading="loading" :remote-method="selectAddressInput" @change="selectAddressChange" reserve-keyword filterable remote placeholder="请选择">
            <el-option
              v-for="item in searchResult"
              :key="item.id"
              :label="item.name"
              :value="item.lnglat">
            </el-option>
          </el-select>
          <div class="map">
            <el-amap vid="amap" ref="map" :center="center" :zoom="zoom" :plugin="plugin" :events="events"></el-amap>
            <div class="point"><img src="@/assets/global/map_pin.png" alt=""></div>
            <div class="location" @click="getCurrentPositionLaglng"><img src="../../assets/global/ic_map_locating.png" alt=""></div>
          </div>
        </div>
      </div>
      <div class="editBtn" v-if="editMark">
        <button @click="editAddress">编辑地址</button>
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
import VueAMap from 'vue-amap'
import { config } from '@/utils/global'
import requestApi from '@/api/requestApi'
import globalApi from '@/api/globalApi'
Vue.use(VueAMap)

// 初始化高德地图的 key 和插件
VueAMap.initAMapApiLoader({
  key: config.amapKey,
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder', 'AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

export default {
  data(){
    return {
      loading: false,
      temp: {},
      searchResult: [],
      provinceCode: '',
      provinceList: [],
      cityCode: '',
      cityList: [],
      areaCode: '',
      areaList: [],
      searchInput: '',
      editMark: true,
      address: '',
      center: [116.397477,39.908692],
      zoom: 16,
      events: {
        init: (o) => {
          console.log(o)
        },
        'dragend': (e) => {
          var centerPoint = this.$refs.map.$$getCenter()
          this.center = centerPoint
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress(centerPoint, (status, result) => {
            if (status == 'complete') {
              console.log(result.regeocode)
              // this.address = result.regeocode.formattedAddress
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
              
            }
          }
        }
      ],
    }
  },
  created() {
    this.companyAddressGet()
    this.getProvinceList()
  },
  methods: {
    companyAddressGet() {
      requestApi.companyAddressGet().then(res => {
        if(res.code == 0){
          console.log(res)
          this.address = res.data.address
          if (res.data.location != '') {
            this.center[1] = res.data.location.split(',')[0]
            this.center[0] = res.data.location.split(',')[1]
            this.selectAddressChange(this.center)
          } else {
            this.getCurrentPositionLaglng()
          }
          this.provinceCode = res.data.provinceCode
          this.cityCode = res.data.cityCode
          this.areaCode = res.data.areaCode
          let params = {
            provinceCode: this.provinceCode
          }
          globalApi.getAddressCitys(params).then(res => {
            if(res.code == 0){
              this.cityList = res.data
            }
          })
          let data = {
            provinceCode: this.provinceCode,
            cityCode: this.cityCode
          }
          globalApi.getAddressAreas(data).then(res => {
            if(res.code == 0){
              this.areaList = res.data
            }
          })
        }
      })
    },
    getProvinceList() {
      globalApi.getAddressProvinces().then(res => {
        if(res.code == 0){
          this.provinceList = res.data
        }
      })
    },
    // getLagLng(){
    //   this.closeMapDialog()
    //   let data = {
    //     address: this.address,
    //     center: this.center
    //   }
    //   eventManager.returnEvent('mapLagLng', data)
    //   this.$router.back(-1)
    // },
    getCurrentPositionLaglng(){
      this.getLocationLoading = true
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
        this.center = [data.position.lng, data.position.lat]
        this.getLocationLoading = false
      })
      AMap.event.addListener(geolocation, 'error', (data) => {
        this.$message({
          message: '获取位置信息超时',
          type: 'error',
          showClose: true,
          duration: 1000
        })
      })
    },
    selectAddressChange (val) {
      console.log(val)
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
    provinceCodeChange(val){
      this.cityCode = ''
      this.areaCode = ''
      this.cityList = []
      this.areaList = []
      let params = {
        provinceCode: val
      }
      globalApi.getAddressCitys(params).then(res => {
        if(res.code == 0){
          this.cityList = res.data
        }
      })
    },
    cityCodeChange(val){
      this.areaCode = ''
      this.areaList = []
      let data = {
        provinceCode: this.provinceCode,
        cityCode: val
      }
      globalApi.getAddressAreas(data).then(res => {
        if(res.code == 0){
          this.areaList = res.data
        }
      })
    },
    editAddress(){
      this.companyAddressGet()
      this.getProvinceList()
      this.editMark = false
    },
    save () {
      let params = {
        address: this.address,
        provinceCode: this.provinceCode,
        cityCode: this.cityCode,
        areaCode: this.areaCode,
        location: this.center[1] + ',' + this.center[0]
      }
      requestApi.companyAddressUpdate(params).then(res => {
        if(res.code == 0){
          this.$message({
            message: '修改成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.companyAddressGet()
          this.getProvinceList()
          this.editMark = true
        }
      })
    },
    canael() {
      this.companyAddressGet()
      this.getProvinceList()
      this.editMark = true
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
    height: 620Px;
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
      height: 450Px;
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
          .location {
            width: 38Px;
            height: 38Px;
            background-color: #fff;
            position: absolute;
            bottom: 50Px;
            left: 10Px;
            border-radius: 5Px;
            border: 1Px solid #ccc;
            cursor: pointer;
            img {
              display: block;
              width: 24Px;
              height: 24Px;
              position: absolute;
              top: 7Px;
              left: 7Px;
            }
          }
          .amap-geolocation-con {
            display: none;
          }
        }
        .selectAddress {
          .el-input {
            width: 456Px;
          }
        }
      }
      .info {
        border-right: 1Px solid rgba(0,0,0,0.08);
        .editAddress {
          .el-select {
            .el-input {
              width: 145Px;
              min-width: 140Px;
            }
          }
          .selectArea,
          .selectCity {
            margin-left: 10Px;
          }
          .addressInput {
            width: 456Px;
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
