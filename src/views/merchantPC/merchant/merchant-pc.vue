<template>
  <div class="merchantPc">
    <div class="merchantPc_container">
        <head-nav :isLogin="false" :title="title" id="mainHeader"></head-nav>
        <div class="merchantContent">
            <div class="header">
                <div class="headerContent">
                    <div class="steps">
                        <div class="numberPC one">
                          <img src="@/assets/global/ic_stepdone.png" alt="" srcset="">
                        </div>
                        <span class="active">注册账号</span>
                    </div>
                    <div class="steps">
                        <div class="numberPC one two_search">2</div>
                        <span class="active">认领企业</span>
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
                      <input type="text" v-model="name" placeholder="请输入机构名称" />
                    </div>
                  </div>
                  <div class="formItem">
                    <label for="name">机构类型<span>*</span></label>
                    <div class="input">
                      <el-select v-model="type" placeholder="请选择">
                        <el-option
                          v-for="item in companyTypes"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="formItem uploadImg">
                    <label for="name">机构Logo</label>
                    <div class="input">
                      <div class="input">
                        <div class="imgList fl">
                          <el-upload
                            class="upload-demo"
                            action=""
                            :http-request="upload"
                            :multiple="false"
                            :show-file-list="false">
                            <div class="imgDesrcibe" style="display: block;width: 100%;height: 100%;position: relative;">
                              <img class="introduceImg" style="display: block;width: 100%;height: 100%" :src="introduceImg" alt="" srcset="">
                              <div class="deleteIcon" @click.stop="deleteFileId" v-if="fileId !== ''">
                                <i class="el-icon-delete"></i>
                              </div>
                            </div>
                            <div class="addPhotoIcon" v-if="fileId == ''">
                              <img src="@/assets/globalPc/ic_form_addphoto@3x.png" alt="">
                            </div>
                          </el-upload>
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
                      <el-select v-model="provinceCode" @change="provinceCodeChange" placeholder="请选择">
                        <el-option
                          v-for="item in provinceList"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                      </el-select>
                      <el-select v-model="cityCode" @change="cityCodeChange" placeholder="请选择">
                        <el-option
                          v-for="item in cityList"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                      </el-select>
                      <el-select v-model="areaCode" @change="areaCodeChange" placeholder="请选择">
                        <el-option
                          v-for="item in areaList"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="formItem map">
                    <label for="name">地址定位</label>
                    <div class="input">
                      <el-select class="selectAddress" v-model="searchInput" :loading="loading" :remote-method="selectAddressInput" @change="selectAddressChange" reserve-keyword filterable remote placeholder="请选择">
                        <el-option
                          v-for="item in searchResult"
                          :key="item.id"
                          :label="item.name"
                          :value="item.lnglat">
                        </el-option>
                      </el-select>
                      <!-- <div class="mapContainer">
                        <el-amap vid="amap" ref="map" :center="center" :zoom="zoom" :plugin="plugin" :events="events"></el-amap>
                        <div class="point"><img src="@/assets/global/map_pin.png" alt=""></div>
                      </div> -->
                    </div>
                  </div>
                  <div class="mapContainer">
                    <el-amap vid="amap" ref="map" :center="center" :zoom="zoom" :plugin="plugin" :events="events"></el-amap>
                    <div class="point"><img src="@/assets/global/map_pin.png" alt=""></div>
                    <div class="location" @click="getCurrentPositionLaglng"><img src="@/assets/global/ic_map_locating.png" alt=""></div>
                  </div>
                  <div class="formItem">
                    <label for="name">详细地址<span>*</span></label>
                    <div class="input">
                      <input type="text" v-model="address" placeholder="请填写详细地址" />
                    </div>
                  </div>
                  <div class="formItem">
                    <label for="name">联系人<span>*</span></label>
                    <div class="input">
                      <input type="text" v-model="contact" placeholder="请填写联系人" />
                    </div>
                  </div>
                  <div class="formItem">
                    <label for="name">联系电话<span>*</span></label>
                    <div class="input">
                      <input type="phone" v-model="phone" placeholder="请填写联系电话" />
                    </div>
                  </div>
                  <div class="formItem">
                    <label for="name">QQ号</label>
                    <div class="input">
                      <input type="phone" v-model="qq" placeholder="请填写QQ号" />
                    </div>
                  </div>
                  <div class="formItem">
                    <label for="name">电子邮箱</label>
                    <div class="input">
                      <input type="text" v-model="email" placeholder="请填写电子邮箱" />
                    </div>
                  </div>
                  <div class="formItem textArea">
                    <label for="name">详细介绍</label>
                    <div class="input">
                      <textarea type="text" row="4" v-model="introduce" placeholder="请输入机构详细介绍"></textarea>
                    </div>
                  </div>
                  <div class="formItem uploadImg">
                    <label for="name">介绍图</label>
                    <div class="input">
                      <div class="introImgList">
                        <div class="uploadImgList">
                          <el-upload
                            :class="imgTotal >= 8 ? 'disabled' : ''"
                            action=""
                            list-type="picture-card"
                            :multiple="true"
                            :limit="8"
                            :file-list="fileList"
                            :before-remove="handleRemoveBefore"
                            :on-remove="handleRemove"
                            :http-request="uploadList">
                            <i class="el-icon-plus"></i>
                          </el-upload>
                        </div>
                      </div>
                      <div class="warning">
                        <p>添加几张图片，让您的服务更受欢迎</p>
                        <p>建议尺寸: 400*400px，最多8张</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="submitBtn" @click="submit">
                  <button>下一步</button>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footerContent">
                <div class="qrcode">
                    <!-- <img style="display: block;width: 120PX;height: 120PX;margin-bottom: 8PX;" src="@/assets/globalPc/qrcode.png" alt=""> -->
                    <!-- <span style="font-size: 12PX;color: #FFFFFF;">下载财税鱼APP</span> -->
                </div>
                <span class="line">Copyright 2019  |  杭州税牛科技有限公司  |  浙ICP备19028668号  |  <a href="https://res.caishuiyu.com/common/h5/privacy_agreement.html" style="text-decoration-line: none;color: #ffffff;">用户隐私协议</a>  |  All Rights Reserved</span>
                <span class="line">  地址：杭州市西湖区金色西溪商务中心B座</span>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import headNav from '@/components/merchantPC/headNav.vue'
import Vue from 'vue'
import VueAMap from 'vue-amap'
import { config } from '@/utils/global'
import api from '@/api/apiH5'
import apiPC from '@/api/api'
import globalApi from '@/api/globalApi'
import qs from 'qs' 
Vue.use(VueAMap)

// 初始化高德地图的 key 和插件
VueAMap.initAMapApiLoader({
  key: config.amapKey,
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder', 'AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

export default {
  name: 'merchant-pc',
  components: {
    headNav
  },
  data(){
    return {
      title: '返回登录',
      companyInfo: {},
      companyId: '',
      name: '',
      phone: '',
      loading: '',
      fileId: '',
      introduceImg: '',
      provinceList: [],
      cityList: [],
      areaList: [],
      cityCode: '',
      cityName: '',
      areaCode: '',
      areaName: '',
      introduce: '',
      provinceCode: '',
      provinceName: '',
      searchInput: '',
      type: '',
      typeValue: '',
      companyTypes: [],
      qq: '',
      email: '',
      contact: '',
      searchResult: [],
      fileList: [],
      fileIntroList: [],
      imgTotal: 0,
      disable: false,
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
              this.location = result.regeocode.formattedAddress
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
              this.getCompanyInfo()
            }
          }
        }
      ],
      location: '',
      address: ''
    }
  },
  created() {
    window.addEventListener('resize', function () {
     if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded()
        }, 0)
      }
    })
    this.getProvinceList()
    this.getCompanyTypes()
  },
  methods: {
    getCompanyInfo(){
      if (this.$route.query.id) {
        console.log(this.$route.query.id)
        let companyParams = {
          id: this.$route.query.id
        }
        api.getMerchantCompanyDetail(companyParams).then(res => {
          if(res.code == 0) {
            this.companyInfo = res.data
            this.name = this.companyInfo.name
            this.companyId = this.companyInfo.id
            this.provinceCode = this.companyInfo.provinceCode
            this.cityCode = this.companyInfo.cityCode
            this.areaCode = this.companyInfo.areaCode
            if(this.companyInfo.location){
              this.center[0] = this.companyInfo.location.split(',')[1]
              this.center[1] = this.companyInfo.location.split(',')[0]
              this.selectAddressChange(this.center)
            } else {
              this.getCurrentPositionLaglng()
            }
            if(this.companyInfo.phones.length > 0){
              this.phone = this.companyInfo.phones[0]
            }
            this.address = this.companyInfo.address
            let params = {
              provinceCode: this.provinceCode
            }
            globalApi.getAddressProvinces().then(res => {
              if(res.code == 0){
                this.provinceList = res.data
                for(let i=0;i<res.data.length;i++){
                  if (res.data[i].code == this.provinceCode){
                    this.provinceName = res.data[i].name
                    let params = {
                      provinceCode: this.provinceCode
                    }
                    globalApi.getAddressCitys(params).then(res => {
                      if(res.code == 0){
                        for(let i=0;i<res.data.length;i++){
                          this.cityList = res.data
                          if (res.data[i].code == this.cityCode){
                            this.cityName = res.data[i].name
                            let data = {
                              provinceCode: this.provinceCode,
                              cityCode: this.cityCode
                            }
                            globalApi.getAddressAreas(data).then(res => {
                              this.areaList = res.data
                              if(res.code == 0){
                                for(let i=0;i<res.data.length;i++){
                                  if (res.data[i].code == this.areaCode){
                                    this.areaName = res.data[i].name
                                  }
                                }
                              }
                            })
                          }
                        }
                      }
                    })
                  }
                }
              }
            })
          }
        })
      }
    },
    //上传图片
    upload (files) {
      const loading = this.$loading({
        lock: true,
        text: '正在上传图片，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      console.log(files)
      let formData = new FormData()
      formData.append('files', files.file)
      apiPC.fileupload(formData).then(res => {
        if (res.code == 0) {
          console.log(res)
          this.fileId =  res.data[0].fileId
          let reader = new FileReader();
          let file = files.file
          let imgUrlBase64
          if(file){
            imgUrlBase64 = reader.readAsDataURL(file);
            reader.onload = (e) => {
              this.introduceImg = reader.result
              loading.close()
            }
          }
        }
      }).catch(err => {
        loading.close()
        this.$message.error('上传失败，请重新上传')
      })
    },
    deleteFileId(){
      this.introduceImg = '',
      this.fileId = ''
    },
    uploadList(files){
      const loading = this.$loading({
        lock: true,
        text: '正在上传图片，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let formData = new FormData()
      formData.append('files', files.file)
      apiPC.fileupload(formData).then(res => {
        if (res.code == 0) {
          console.log(res)
          let img =  res.data[0].fileId
          this.fileIntroList.push(img)
          this.imgTotal = this.fileIntroList.length
          loading.close()
        }
      }).catch(err => {
        loading.close()
        this.$message.error('上传失败，请重新上传')
      })
    },
    handleRemoveBefore(file,fileList) {
      console.log(file)
      for(let i=0;i<fileList.length;i++){
        console.log(fileList[i])
        if(file.uid == fileList[i].uid){
          this.fileIntroList.splice(i, 1)
        }
      }
      console.log(this.fileIntroList)
      this.imgTotal = this.fileIntroList.length
    },
    handleRemove(file,fileList){
      // console.log(file)
      // console.log(this.fileList)
      // console.log(fileList)
      // console.log(this.fileIntroList)
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
      for(let i=0;i<this.provinceList.length;i++){
        if(this.provinceList[i].code == val){
          this.provinceName = this.provinceList[i].name
        }
      }
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
      for(let i=0;i<this.cityList.length;i++){
        if(this.cityList[i].code == val){
          this.cityName = this.cityList[i].name
        }
      }
    },
    areaCodeChange(val) {
      for(let i=0;i<this.areaList.length;i++){
        if(this.areaList[i].code == val){
          this.areaName = this.areaList[i].name
        }
      }
    },
    getProvinceList() {
      globalApi.getAddressProvinces().then(res => {
        if(res.code == 0){
          this.provinceList = res.data
        }
      })
    },
    getCompanyTypes(){
      api.merchantCompanyTypes().then(res => {
        console.log(res)
        if(res.code == 0){
          this.companyTypes = res.data
        }
      })
    },
    // getLagLng(){
    //   this.closeMapDialog()
    //   let data = {
    //     address: this.location,
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
        this.center = [data.position.lng, data.position.lat];
        this.location = data.formattedAddress
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
    submit() {
      if(this.name == '') {
        this.$message({
          message: '机构名称不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if(this.type == ''){
        this.$message({
          message: '机构类型不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if (!this.provinceCode || this.provinceCode == '' || !this.cityCode || this.cityCode == '' || !this.areaCode || this.areaCode == '') {
        this.$message({
          message: '所选地区不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return 
      }
      if(this.address == ''){
        this.$message({
          message: '详细地址不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return 
      }
      if(this.contact == ''){
        this.$message({
          message: '联系人不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return 
      }
      if(this.phone == ''){
        this.$message({
          message: '联系电话不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return 
      }
      if(!this.phone.match(/(0\d{2,3}(-)?)?\d{7,8}/) && !this.phone.match(/^(0|86|17951)?1[0-9]{10}$/)){
        this.$message({
          message: '联系电话格式不正确',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return 
      }
      
      let data = {
        name: this.name,
        type: this.type,
        logo: this.fileId,
        bindCompanyId: this.companyId,
        cityCode:this.cityCode,
        areaCode: this.areaCode,
        provinceCode: this.provinceCode,
        contactName: this.contact,
        address: this.provinceName + this.cityName + this.areaName + this.address,
        location: this.center[1].toString() + ',' + this.center[0].toString(),
        contactPhone: this.phone,
        qq: this.qq,
        email: this.email,
        introduce: this.introduce,
        publicityImgs: this.fileIntroList
      }
      console.log(data)
      api.merchantSaveCompany(data).then(res => {
        if(res.code == 0){
          this.$message({
            message: '保存成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.$router.push('/certification-pc')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-demo{
  width: 100%;
  height: 100%;
}

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
              position: relative;
              .addPhotoIcon {
                width: 36Px;
                height: 36Px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                img {
                  display: block;
                  width: 100%;
                  height: 100%;
                }
              }
              .deleteIcon {
                width: 27Px;
                height: 27Px;
                position: absolute;
                right: 0;
                bottom: 0;
                .el-icon-delete {
                  background-color: rgba(0,0,0,.45);
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%,-50%);
                  font-size: 20Px;
                  color: #fff;
                }
              }
              .el-upload {
                width: 100%;
                height: 100%;
              }
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
            background: #FF7F4A;
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
        .formItem.uploadImg {
          .imgList {
            .el-upload {
              width: 100%;
              height: 100%;
            }
          }
          .introImgList{
            width: 312Px;
            height: auto;
            box-sizing: border-box;
            background: #FFFFFF;
            overflow: hidden;
            .uploadImgList {
              .el-upload-list__item,
              .el-upload-list__item-actions,
              .el-upload {
                width: 72Px;
                height: 72Px;
              }
              .el-upload-list--picture-card .el-upload-list__item {
                margin: 0 4Px 4Px 0;
              }
              .el-upload {
                position: relative;
                .el-icon-plus {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
              .disabled .el-upload--picture-card {
                display: none;
              }
              .imgTotal {
                font-family: PingFangSC-Regular;
                font-size: 12Px;
                color: rgba(0,0,0,0.60);
                text-align: left;
                line-height: 18Px;
              }
            }
          }
        }
      }
    }
  }
  .merchantPc .merchantPc_container .merchantContent .register_form .form .formItem.uploadImg .uploadImgList {
    width: auto;
    height: auto;
  }
  .map {
    .amap-geolocation-con {
      display: none;
    }
  }
}
</style>
<style lang="scss">
.mapContainer {
  height: 250Px;
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
  .amap-controls {
    .amap-toolbar {
      display: none;
    }
    .amap-scalecontrol {
      display: none;
    }
    .amap-geolocation-con {
      display: none;
    }
  }
}
</style>
