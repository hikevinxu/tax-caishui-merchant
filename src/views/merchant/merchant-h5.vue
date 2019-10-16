<template>
  <div class="merchant-h5-page">
    <div class="merchant-h5">
      <div class="merchant-h5-header">
        <div class="header">
            <div class="headerContent">
                <div class="steps">
                    <div class="number one">
                      <img src="@/assets/global/ic_stepdone.png" alt="" srcset="">
                    </div>
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
          <div class="formItem rightIcon">
            <label for="type">机构类型<span class="notNull">*</span></label>
            <div class="input">
                <van-field readonly v-model="type" placeholder="请选择" @click="showPicker = true"/>
                <div class="icon">
                  <img src="@/assets/global/ic_arrow_dropdown@3x.png" alt="">
                </div>
            </div>
            <div class="picker">
              <van-popup v-model="showPicker" position="bottom">
                  <van-picker
                    show-toolbar
                    value-key="name"
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
                  />
                </van-popup>
            </div>
          </div>
          <div class="formItem upload">
            <label for="fileList">机构Logo</label>
            <div class="input">
              <van-uploader v-model="fileList" multiple :max-count="1" @delete="deleteUpload" :before-read="beforeRead" 
              :after-read='upload'/>
            </div>
            <div class="prompt">
              <p>请上传图片</p>
              <p>尺寸240*240px</p>
            </div>
          </div>
          <div class="formItem">
            <label for="position">所在地区<span class="notNull">*</span></label>
            <div class="input">
                <van-field readonly v-model="value" placeholder="请选择" @click="showAreaPicker = true"/>
                <div class="icon">
                  <img src="@/assets/global/ic_arrow_dropdown@3x.png" alt="">
                </div>
            </div>
            <div class="picker rightIcon">
              <van-popup v-model="showAreaPicker" position="bottom">
                <van-area :area-list="areaList" :value="areaCode" :columns-num="3" title="请选择" @cancel="showAreaPicker = false" @confirm="selectArea" />
              </van-popup>
            </div>
          </div>
          <div class="formItem rightIcon">
            <label for="laglng">地图定位<span class="notNull">*</span></label>
            <div class="input">
                <van-field readonly v-model="laglng" placeholder="请选择" @click="showMapDialog"/>
                <div class="icon">
                  <img src="@/assets/global/ic_form_location.png" alt="">
                </div>
            </div>
          </div>
          <div class="formItem">
            <label for="name">详细地址<span class="notNull">*</span></label>
            <div class="input">
              <van-field v-model="address" placeholder="详细地址不能为空" />
            </div>
          </div>
          <div class="formItem">
            <label for="person">联系人<span class="notNull">*</span></label>
            <div class="input">
                <van-field v-model="contact" placeholder="请填写联系人" />
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
              <van-field v-model="introduce" type="textarea" placeholder="请输入机构详细介绍" rows="3" />
            </div>
          </div>
          <div class="formItem introPic">
            <label for="email">介绍图 <span class="warning">添加几张图片，让您的服务更受欢迎</span></label>
            <div class="input">
              <div class="introPicList">
                <van-uploader v-model="fileIntroList" multiple :max-count="8" @delete="fileIntroDelete" :before-read="beforeReadIntro" 
                :after-read='uploadIntro'/>
              </div>
              <div class="prompt">
                <p>最多8张 建议尺寸: 400*400px</p>
              </div>
            </div>
          </div>
          <div class="submitbtn">
            <van-button :loading="submitLoading"  loading-type="spinner" type="primary" size="large" @click="jumpNextStep">下一步</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import api from '@/api/apiH5'
import apiPC from '@/api/api'
import globalApi from '@/api/globalApi'
import { eventManager, regExp } from '@/utils/global'
import areaList from '@/utils/areaList'
import { Field, Picker, Popup, Uploader, Toast, Button, Icon, Loading, Area } from 'vant'
Vue.use(Field).use(Picker).use(Popup).use(Uploader).use(Toast).use(Button).use(Icon).use(Loading).use(Area)

export default {
  name: 'merchant-h5',
  data (){
    return {
      companyInfo: {},
      companyId: '',
      name: '',
      type: '',
      typeValue: '',
      value: '',
      position: '',
      address: '',
      laglng: '',
      center: [],
      contact: '',
      phone: '',
      QQAccount: '',
      email: '',
      introduce: '',
      columns: [],
      areaList: areaList,
      showPicker: false,
      showAreaPicker: false,
      areaCode: '',
      provinceCode: '',
      cityCode: '',
      username: '',
      password: '',
      fileList: [],
      fileIntroList: [],
      introList: [],
      phone: '',
      fileId: '',
      fileLength: 0,
      submitLoading: false
    }
  },
  // created() {
  //   window.addEventListener('resize', function () {
  //    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
  //       window.setTimeout(function () {
  //         document.activeElement.scrollIntoViewIfNeeded()
  //       }, 0)
  //     }
  //   })
  //   this.getCompanyTypes()
  //   if(this.$route.query.item){
  //     this.getCompanyInfo()
  //   }
  // },
  activated(){
    window.addEventListener('resize', function () {
     if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded()
        }, 0)
      }
    })
    this.getCompanyTypes()
    if(this.$route.query.id){
      this.init()
      this.getCompanyInfo()
    }
    if(localStorage.getItem('initAddCompany')) {
      localStorage.removeItem('initAddCompany')
      this.init()
    }
  },
  methods: {
    // 初始化表单信息
    init() {
      this.name = ''
      this.provinceCode = ''
      this.cityCode = ''
      this.areaCode = ''
      this.center = []
      this.phone = ''
      this.value = ''
      this.address = ''
      this.fileList = []
      this.laglng = ''
      this.type = ''
      this.typeValue = ''
      this.companyId = ''
      this.contact = ''
      this.QQAccount = ''
      this.email = ''
      this.introduce = ''
      this.fileIntroList = []
    },
    getCertificationStatus(){
      api.getCertificationStatus().then(res => {
        if(res.code == 0){
          if(res.data.status == 100){
            this.$router.push({path: '/search-h5'})
          }else if(res.data.status == 101){
            this.$router.push({path: '/certification-h5'})
          }else if(res.data.status == 102){
            this.$router.push({
                path: '/success-h5',
                query: {
                  status: res.data.status,
                }
            })
          }else if(res.data.status == 103){
            // this.$router.push({path: '/home'})
          }else if(res.data.status == 999){
            this.$router.push({
                path: '/success-h5',
                query: {
                  status: res.data.status,
                }
            })
          }
        }
      })
    },
    getCompanyInfo(){
      if (this.$route.query.id) {
        let companyParams = {
          id: this.$route.query.id
        }
        api.getMerchantCompanyDetail(companyParams).then(res => {
          if(res.code == 0){
            this.companyId = this.$route.query.id
            this.companyInfo = res.data
            this.name = this.companyInfo.name
            this.provinceCode = this.companyInfo.provinceCode
            this.cityCode = this.companyInfo.cityCode
            this.areaCode = this.companyInfo.areaCode
            this.value = this.companyInfo.areaCode
            if(this.companyInfo.location){
              this.center[0] = this.companyInfo.location.split(',')[1]
              this.center[1] = this.companyInfo.location.split(',')[0]
            }
            if(this.companyInfo.phones.length > 0){
              this.phone = this.companyInfo.phones[0]
            }
            this.address = this.companyInfo.address
            this.laglng = this.companyInfo.address
            globalApi.getAddressProvinces().then(res => {
              if(res.code == 0){
                for(let i=0;i<res.data.length;i++){
                  if (res.data[i].code == this.provinceCode){
                    this.value = res.data[i].name
                    let params = {
                      provinceCode: this.provinceCode
                    }
                    globalApi.getAddressCitys(params).then(res => {
                      if(res.code == 0){
                        for(let i=0;i<res.data.length;i++){
                          if (res.data[i].code == this.cityCode){
                            this.value += res.data[i].name
                            let data = {
                              provinceCode: this.provinceCode,
                              cityCode: this.cityCode
                            }
                            globalApi.getAddressAreas(data).then(res => {
                              if(res.code == 0){
                                for(let i=0;i<res.data.length;i++){
                                  if (res.data[i].code == this.areaCode){
                                    this.value += res.data[i].name
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
    onConfirm(val,index){
      this.type = val.name
      this.typeValue = this.columns[index].value
      this.showPicker = false
    },
    getCompanyTypes(){
      api.merchantCompanyTypes().then(res => {
        if(res.code == 0){
          this.columns = res.data
        }
      })
    },
    selectArea(value){
      this.value = value[0].name + value[1].name + value[2].name
      // if(value[1].name == '北京市'){
      //     value[1].code = '110000'
      // }else if(value[1].name == '天津市'){
      //     value[1].code = '120000'
      // }else if(value[1].name == '上海市'){
      //     value[1].code = '310000'
      // }else if(value[1].name == '重庆市'){
      //     value[1].code = '500000'
      // }
      this.provinceCode = value[0].code
      this.cityCode = value[1].code
      this.areaCode = value[2].code
      this.showAreaPicker = false;
    },
    // 返回布尔值
    beforeRead(file) {
      // let reg = regExp.imgNameEx
      // if (reg.test(file.name)) {
      //   Toast('文件名不能包含回车符，\\，/，：，*，？，“，<，>，|等特殊字符，请修改文件名后重新上传！')
      //   return false
      // }
      return true
    },
    beforeReadIntro(file, detail) {
      // let reg = regExp.imgNameEx
      // console.log(file)
      // if (file instanceof Array) {
      //   for(let i=0;i<file.length;i++){
      //     if(reg.test(file[i].name)){
      //       Toast('文件名不能包含回车符，\\，/，：，*，？，“，<，>，|等特殊字符，请修改文件名后重新上传！')
      //       return false
      //     }
      //   }
      // } else {
      //   if (reg.test(file.name)) {
      //     Toast('文件名不能包含回车符，\\，/，：，*，？，“，<，>，|等特殊字符，请修改文件名后重新上传！')
      //     return false
      //   }
      // }
      this.fileLength = this.fileIntroList.length
      return true
    },
    upload(file){
      console.log(file.file)
      Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '正在上传图片'
      })
      let formData = new FormData()
      formData.append('files', file.file)
      apiPC.fileupload(formData).then(res => {
        console.log(res)
        if (res.code == 0) {
          this.fileId =  res.data[0].fileId
          this.fileList[0].fileId = res.data[0].fileId
          Toast.clear()
        }
      }).catch(err => {
        console.log(err)
        Toast.clear()
        Toast.fail('上传失败，请重新上传')
      })
    },
    deleteUpload(file) {
      // console.log(file)
      // console.log(this.fileList)
    },
    uploadIntro(file){
      // console.log(file)
      if(file instanceof Array){
        for (let i = 0; i < file.length; i++) {
          Toast.loading({
            duration: 0,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'spinner',
            message: '正在上传图片'
          })
          let image = file[i].file;
          let formData = new FormData()
          formData.append('files', image)
          apiPC.fileupload(formData).then(res => {
            if (res.code == 0) {
              this.fileIdIntro =  res.data[0].fileId
              let num =  Number(Number(this.fileLength) + i)
              this.fileIntroList[num].fileId = res.data[0].fileId
              // this.introList.push(this.fileIdIntro)
              // console.log(this.fileIntroList)
              Toast.clear()
            }
          }).catch(err => {
            Toast.clear()
            Toast.fail('上传失败，请重新上传')
          })
        }
      }else{
        Toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '正在上传图片'
        })
        let formData = new FormData()
        formData.append('files', file.file)
        apiPC.fileupload(formData).then(res => {
          if (res.code == 0) {
            this.fileIdIntro =  res.data[0].fileId
            this.fileIntroList[this.fileIntroList.length-1].fileId = res.data[0].fileId
            // this.introList.push(this.fileIdIntro)
            Toast.clear()
          }
        }).catch(err => {
          Toast.clear()
          Toast.fail('上传失败，请重新上传')
        })
      }
    },
    fileIntroDelete(file){
      // console.log(this.fileIntroList)
    },
    showMapDialog(){
      eventManager.addEvent('mapLagLng', (data) => {
        // console.log(data)
        this.laglng = data.address
        eventManager.removeEvent('mapLagLng')
        this.center = data.center
      })
      if (this.center.length > 0) {

        this.$router.push('/map-h5?location=' + this.center[0]+','+ this.center[1])
      } else {
        this.$router.push('/map-h5')
      }
      
    },
    jumpNextStep () {

      if(this.name == ''){
        Toast.fail('机构名称不能为空')
        return
      }

      if(this.typeValue == ''){
        Toast.fail('机构类型不能为空')
        return
      }

      if (!this.provinceCode || this.provinceCode == '' || !this.cityCode || this.cityCode == '' || !this.areaCode || this.areaCode == '') {
        Toast.fail('所选地区不能为空')
        return 
      }

      
      if(this.center.length < 2){
        Toast.fail('请先选择地图定位')
        return 
      }

      if(this.address == ''){
        Toast.fail('详细地址不能为空')
        return 
      }

      if(this.contact == ''){
        Toast.fail('联系人不能为空')
        return 
      }

      if(this.phone == ''){
        Toast.fail('联系电话不能为空')
        return 
      }

      if(!this.phone.match(/(0\d{2,3}(-)?)?\d{7,8}/) && !this.phone.match(/^(0|86|17951)?1[0-9]{10}$/)){
        Toast.fail('联系电话格式不正确')
        return 
      }

      if(this.fileList.length == 0){
        this.fileId = ''
      }else {
        this.fileId = this.fileList[0].fileId
      }

      let data = {
        name: this.name,
        type: this.typeValue,
        logo: this.fileId,
        bindCompanyId: this.companyId,
        cityCode:this.cityCode,
        areaCode: this.areaCode,
        provinceCode: this.provinceCode,
        contactName: this.contact,
        address: this.value + this.address,
        location: this.center[1].toString() + ',' + this.center[0].toString(),
        contactPhone: this.phone,
        qq: this.QQAccount,
        email: this.email,
        introduce: this.introduce,
        publicityImgs: []
      }
      for (let i=0;i<this.fileIntroList.length;i++) {
        data.publicityImgs.push(this.fileIntroList[i].fileId)
      }
      this.submitLoading = true
      api.merchantSaveCompany(data).then(res => {
        if(res.code == 0){
          Toast('保存成功')
          this.submitLoading = false
          this.$router.push('certification-h5')
        } else {
          this.submitLoading = false
        }
      }).catch(err => {
        this.submitLoading = false
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
  .input {
    position: relative;
    .icon {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 10px;
      right: 14px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
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
  box-shadow: 0 -8px 16px 0 rgba(0,0,0,0.12);
  border-radius: 4px;
	.inner {
    width: 100%;
    background: #FFFFFF;
    padding-bottom: 16px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.12);
    border-radius: 4px;
    overflow: hidden;
    .btn {
      margin: 0 12px;
      margin-top: 16px;
    }
  }
}
.selectAddress .text {
  margin: 0 12px;
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
.merchant-h5-page .enterpriseInfo .form .formItem.introPic .van-uploader__upload,
.merchant-h5-page .enterpriseInfo .form .formItem.upload .van-uploader__upload {
  background-color: #f5f5f5;
  border: 0;
}
.merchant-h5-page .enterpriseInfo .form .formItem.introPic .van-uploader__upload .van-icon-plus:before,
.merchant-h5-page .enterpriseInfo .form .formItem.upload .van-uploader__upload .van-icon-plus:before {
  content: "\F098";
}
.merchant-h5-page .enterpriseInfo {
  .van-uploader__upload {
    width: 72px;
    height: 72px;
  }
  .van-uploader__preview-image {
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
  textarea::-webkit-input-placeholder{
    color: rgba(0,0,0,0.26);
  }
  textarea::-moz-placeholder{
    color: rgba(0,0,0,0.26);      
  }
  textarea:-ms-input-placeholder{ 
    color: rgba(0,0,0,0.26);
  }
  .mapContainer .amap-logo {
    display: none;
  }
}
.merchant-h5-page #container .el-vue-search-box-container {
  height: 100%;
  border-radius: 4px;
}
.merchant-h5-page #container .el-vue-search-box-container .search-box-wrapper {
  border-radius: 4px;
}
.merchant-h5-page #container .el-vue-search-box-container .search-tips {
	width: 100%;
}
.merchant-h5-page #container .amap-touch-toolbar .amap-zoomcontrol {
  display: none;
}
.merchant-h5-page .enterpriseInfo .el-vue-search-box-container .search-box-wrapper input {
  height: 36px;
  line-height: 36px;
  padding-left: 25px;
  border-radius: 2px;
  margin-left: 8px;
  margin-right: 10px;
}
.merchant-h5-page .enterpriseInfo .el-vue-search-box-container .search-box-wrapper .search-btn {
  font-size: 15px;
  padding: 0 5px;
  font-family: PingFangSC-Medium;
  font-size: 15px;
  color: rgba(0,0,0,0.87);
  line-height: 18px;
  display: block;
  height: auto;
  text-align: center;
  border-left: 1px solid rgba(0,0,0,0.12);
}
.merchant-h5-page .enterpriseInfo .el-vue-search-box-container .search-tips {
  border: 0;
}
.merchant-h5-page #container .amap-geolocation-con {
  display: none;
  left: 16px!important;
	bottom: 190px!important;
}
.merchant-h5-page #container .amap-scalecontrol {
  display: none;
	left: 10px!important;
	bottom: 100px!important;
}
.merchant-h5-page .enterpriseInfo .van-loading__spinner {
  width: 20px;
  height: 20px;
  margin: 10px;
  color: #333!important;
}
.merchant-h5-page .enterpriseInfo .van-overlay {
  background-color: rgba(0,0,0,.4);
}
.merchant-h5-page .enterpriseInfo .van-popup {
  -webkit-transition: 0s ease-out;
  transition: 0s ease-out;
  -webkit-overflow-scrolling: touch;
}
.merchant-h5-page .van-cell:not(:last-child)::after {
  border: 0;
}
.merchant-h5-page .form .formItem .input .van-cell {
  padding-left: 0;
}
.merchant-h5-page .form .formItem.rightIcon .input .van-cell {
  padding-right: 44px;
  padding-left: 0;
}
.merchant-h5-page .form .formItem.textArea .input .van-cell {
  padding-left: 16px;
}
</style>
