<template>
  <div class="merchantPc">
    <div class="merchantPc_container">
        <head-nav id="mainHeader"></head-nav>
        <div class="merchantContent">
            <div class="header">
                <div class="headerContent">
                    <div class="steps">
                        <div class="numberPC one">1</div>
                        <span class="active">注册账号</span>
                    </div>
                    <div class="steps">
                        <div class="numberPC two">2</div>
                        <span>认领企业</span>
                    </div>
                    <div class="steps">
                        <div class="numberPC">3</div>
                        <span>提交资质</span>
                    </div>
                </div>
            </div>
            <div class="register_form">
                <h4>完善企业基本资料</h4>
                <div class="form">
                  <div class="formItem">
                    <label for="name">机构名称<span>*</span></label>
                    <div class="input">
                      <input type="text" v-model="phone" placeholder="账号使用手机号" />
                    </div>
                  </div>
                  <div class="formItem">
                    <label for="name">机构类型<span>*</span></label>
                    <div class="input">
                      <el-select v-model="type" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.name"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="formItem uploadImg">
                    <label for="name">机构Logo<span>*</span></label>
                    <div class="input">
                      <div class="input">
                        <div class="imgList fl">

                        </div>
                        <div class="logoWarning fl">
                          <p>请上传图片</p>
                          <p>尺寸240*240px</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="formItem">
                    <label for="name">所在地区<span>*</span></label>
                    <div class="input address">
                      <el-select v-model="type" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.name"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <el-select v-model="type" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.name"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <el-select v-model="type" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.name"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="formItem map">
                    <label for="name">地址定位<span>*</span></label>
                    <div class="input">
                      <el-select class="selectAddress" v-model="input" :loading="loading" :remote-method="selectAddressInput" @change="selectAddressChange" reserve-keyword filterable remote placeholder="请选择">
                        <el-option
                          v-for="item in searchResult"
                          :key="item.id"
                          :label="item.name"
                          :value="item.lnglat">
                        </el-option>
                      </el-select>
                      <div class="mapContainer">
                        <el-amap vid="amap" ref="map" :center="center" :zoom="zoom" :plugin="plugin" :events="events"></el-amap>
                        <div class="point"><img src="@/assets/global/map_pin.png" alt=""></div>
                      </div>
                    </div>
                  </div>
                  <div class="formItem">
                    <label for="name">联系人<span>*</span></label>
                    <div class="input">
                      <input type="text" v-model="phone" placeholder="请填写联系人" />
                    </div>
                  </div>
                  <div class="formItem">
                    <label for="name">联系电话<span>*</span></label>
                    <div class="input">
                      <input type="text" v-model="phone" placeholder="请填写联系人" />
                    </div>
                  </div>
                  <div class="formItem">
                    <label for="name">QQ号<span>*</span></label>
                    <div class="input">
                      <input type="text" v-model="phone" placeholder="请填写QQ号" />
                    </div>
                  </div>
                  <div class="formItem">
                    <label for="name">电子邮箱<span>*</span></label>
                    <div class="input">
                      <input type="text" v-model="phone" placeholder="请填写电子邮箱" />
                    </div>
                  </div>
                  <div class="formItem textArea">
                    <label for="name">详细介绍<span>*</span></label>
                    <div class="input">
                      <textarea type="text" row="4" v-model="phone" placeholder="请输入机构详细介绍"></textarea>
                    </div>
                  </div>
                  <div class="formItem uploadImg">
                    <label for="name">介绍图<span>*</span></label>
                    <div class="input">
                      <div class="imgList">

                      </div>
                      <div class="warning">
                        <p>添加几张图片，让您的服务更受欢迎</p>
                        <p>建议尺寸: 400*400px，最多8张</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="submitBtn">
                  <button>下一步</button>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footerContent">
                <div class="qrcode">
                    <img style="display: block;width: 120PX;height: 120PX;margin-bottom: 8PX;" src="@/assets/globalPc/qrcode.png" alt="">
                    <span style="font-size: 12PX;color: #FFFFFF;">下载财税鱼APP</span>
                </div>
                <span class="line">Copyright 2019  |  杭州税牛科技有限公司  |  浙ICP备19028668号  |  <a href="https://res.caishuiyu.com/common/h5/privacy_agreement.html" style="text-decoration-line: none;color: #ffffff;">用户隐私协议</a>  |  All Rights Reserved</span>
                <span class="line">E-mail：kf@taxlioner.com  |  地址：杭州市西湖区金色西溪商务中心B座</span>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import headNav from '@/components/merchantPC/headNav.vue'
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
  name: 'login',
  components: {
    headNav
  },
  data(){
    return {
      phone: '',
      input: '',
      loading: '',
      options: [],
      type: '',
      searchResult: [],
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
        {
          pName: 'Geolocation',
          events: {
            init: (o) => {
              // o 是高德地图定位插件实例
              this.getCurrentPositionLaglng()
            }
          }
        }
      ],
      address: ''
    }
  },
  methods: {
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
  }
}
</script>
<style lang="scss" scoped>
.merchantPc{
  width: 100%;
  height: 100vh;
  #mainHeader {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .merchantPc_container{
    position: relative;
    width: 100%;
    height: 100vh;
    background: url(../../../assets/globalPc/bg.jpg) no-repeat;
    background-size: cover;
    background-position: 50%;
    .merchantContent{
      box-sizing: border-box;
      width: 808PX;
      height: 100vh;
      margin-left: auto;
      margin-right: auto;
      padding-top: 100Px;
      padding-bottom: 100Px;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .header{
        width: 100%;
        height: 100PX;
        background: #FFFFFF;
        border-radius: 4PX;
        .headerContent{
          height: 100%;
          width: 569PX;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-left: auto;
          margin-right: auto;
          .steps{
            width: 60PX;
            height: 100%;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            .numberPC{
              width: 36PX;
              height: 36PX;
              border-radius: 50%;
              background: #F5F5F5;
              border: 2PX solid #E0E0E0;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: PingFangSC-Medium;
              font-size: 20PX;
              color: rgba(0,0,0,0.38);
              line-height: 30PX;
              margin-bottom: 8PX;
              position: relative;
              img{
                display: block;
                width: 23PX;
                height: 23PX;
              }
            }
            .one{
              background: #FFEADA !important;
              border: 2PX solid #FFCFAC !important;
              color: #FF7F4A !important;
            }
            .active{
              color: #FF7F4A;
            }
            .two::before{
              position: absolute;
              display: block;
              content: '';
              top: 50%;
              left: 52PX;
              width: 193PX;
              height: 1PX;
              background:  rgba(0,0,0,0.12);
            }
            .two::after{
              position: absolute;
              display: block;
              content: '';
              top: 50%;
              right: 52PX;
              width: 193PX;
              height: 1PX;
              background:  rgba(0,0,0,0.12);
            }
            .two_search::before{
              position: absolute;
              display: block;
              content: '';
              top: 50%;
              left: 52PX;
              width: 193PX;
              height: 1PX;
              background:  rgba(0,0,0,0.12);
            }
            .two_search::after{
              position: absolute;
              display: block;
              content: '';
              top: 50%;
              right: 52PX;
              width: 193PX;
              height: 1PX;
              background:  #FFAD71;
            }
            .two_success::before{
              position: absolute;
              display: block;
              content: '';
              top: 50%;
              left: 52PX;
              width: 193PX;
              height: 1PX;
              background:  #FFAD71;
            }
            .two_success::after{
              position: absolute;
              display: block;
              content: '';
              top: 50%;
              right: 52PX;
              width: 193PX;
              height: 1PX;
              background:  #FFAD71;
            }
            span{
              font-family: PingFangSC-Regular;
              font-size: 12PX;
              color: rgba(0,0,0,0.60);
              /* text-align: left; */
              line-height: 18PX;
            }
          }
        }
      }
      .register_form{
        width: 100%;
        margin-top: 8PX;
        background: #FFFFFF;
        padding-top: 40PX;
        border-radius: 4PX;
        padding-bottom: 100Px;
        h4{
          font-size: 20PX;
          color: rgba(0,0,0,0.87);
          display: block;
          text-align: center;
          width: 312PX;
          margin-left: auto;
          margin-right: auto;
        }
        .form{
          width: 412PX;
          margin-left: auto;
          margin-right: auto;
          margin-top: 24PX;
          .formItem {
            display: flex;
            margin-top: 16Px;
            height: 40PX;
            label{
              width: 100Px;
              height: 100%;
              font-family: PingFangSC-Regular;
              font-size: 14Px;
              color: rgba(0,0,0,0.60);
              text-align: left;
              line-height: 40Px;
              span {
                color: #FF7F4A;
              }
            }
            .input {
              flex: 1;
              height: 100%;
              textarea,
              input {
                display: block;
                outline: none;
                border: none;
                width: 100%;
                box-sizing: border-box;
                background: #FAFAFA;
                height: 100%;
                line-height: 40PX;
                font-size: 14PX;
                color: rgba(0,0,0,0.60);
                padding: 0 16Px;
              }
            }
          }
          .formItem.map {
            height: auto;
            .input {
              .mapContainer {
                height: 150Px;
                margin-top: 16Px;
                position: relative;
                .point {
                  width: 20Px;
                  height: 40Px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -100%);
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
          }
          .formItem.textArea {
            height: auto;
            .input {
              textarea {
                max-width: 100%;
                height: 132Px;
                min-height: 132Px;
                resize: none;
              }
            }
          }
          .formItem.uploadImg {
            height: auto;
            .imgList {
              width: 72Px;
              height: 72Px;
              background-color: #fafafa;
            }
            .logoWarning {
              display: block;
              font-family: PingFangSC-Regular;
              font-size: 12Px;
              color: rgba(0,0,0,0.26);
              text-align: left;
              line-height: 18Px;
              margin-top: 18Px;
              margin-left: 16Px;
            }
            .fl {
              float: left;
            }
            .warning {
              font-family: PingFangSC-Regular;
              font-size: 12Px;
              color: rgba(0,0,0,0.26);
              text-align: left;
              line-height: 18Px;
              margin-top: 16Px;
            }
          }
        }
        .submitBtn {
          width: 100%;
          height: 36Px;
          button {
            display: block;
            width: 226Px;
            height: 36Px;
            border: 0;
            outline: none;
            cursor: pointer;
            background-image: linear-gradient(135deg, #FF7F4A 0%, #FB5332 100%);
            box-shadow: 0 2Px 4Px 0 rgba(255,173,113,0.30);
            border-radius: 4Px;
            font-family: PingFangSC-Medium;
            font-size: 15Px;
            color: #FFFFFF;
            text-align: center;
            line-height: 36Px;
            margin: 0 auto;
            margin-top: 32Px;
            margin-bottom: 100Px;
          }
          button:hover {
            background: #000;
          }
        }
      }
    }
    .footer{
      position: absolute;
      bottom: 0;
      left: 0;
      background: rgba(0,0,0,0.60);
      width: 100%;
      height: 90PX;
      .footerContent{
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        position: relative;
        .qrcode{
          width: 120PX;
          display: flex;
          flex-flow: column;
          align-items: center;
          position: absolute;
          bottom: 23PX;
          left: 108PX;
        }
        .line{
          font-size: 12PX;
          color: #FFFFFF;
          margin-bottom: 8PX;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.merchantPc {
  .merchantPc_container {
    .register_form {
      .form {
        .formItem {
          .input {
            .el-select {
              display: block;
            }
          }
        }
        .formItem .address {
          .el-select {
            float: left;
            width: 100Px;
            margin-left: 6Px;
            &:first-child {
               margin-left: 0Px;
            }
            .el-input__inner {
              background-color: #fafafa;
              border: 0;
            }
          }
        }
        .el-select{
          .el-input__inner {
            background-color: #fafafa;
            border: 0;
          }
        }
      }
    }
  }
}
</style>
