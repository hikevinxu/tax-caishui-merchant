<template>
  <div class="certification-h5"> 
    <div class="certification-h5-header">
      <div class="header">
          <div class="headerContent">
              <div class="steps">
                  <div class="number one">
                      <img src="@/assets/global/ic_stepdone.png" alt="" srcset="">
                  </div>
                  <span class="acitve">注册账号</span>
              </div>
              <div class="steps">
                  <div class="number one two">
                      <img src="@/assets/global/ic_stepdone.png" alt="" srcset="">
                  </div>
                  <span class="acitve">认领企业</span>
              </div>
              <div class="steps">
                  <div class="number one">3</div>
                  <span class="acitve">提交资质</span>
              </div>
          </div>
      </div>
    </div>
    <div class="enterpriseInfo">
      <div class="title">资质认证</div>
      <div class="form">
        <div class="formItem">
          <label for="name">工商注册号<span class="notNull">*</span></label>
          <div class="input">
            <van-field v-model="businessLicenseNo" placeholder="工商注册号不能为空" />
          </div>
        </div>
        <div class="formItem upload">
          <label for="fileList">营业执照<span class="notNull">*</span></label>
          <div class="input">
            <van-uploader v-model="fileList" multiple @delete="uploadDelete" :max-count="1" :after-read="upload"/>
          </div>
          <div class="prompt">
            <p>请上传营业执照</p>
            <p>原件照片</p>
          </div>
        </div>
        <div class="formItem upload">
          <label for="fileList">法人手持身份证照片</label>
          <div class="input">
            <van-uploader v-model="fileList1" multiple @delete="uploadDelete1" :max-count="1" :after-read="upload1"/>
          </div>
          <div class="prompt">
            <p>请上传手持身份证</p>
            <p>正面照片</p>
          </div>
        </div>
        <div class="formItem upload">
          <label for="fileList">资质证书</label>
          <div class="input">
            <van-uploader v-model="fileList2" multiple @delete="uploadDelete2" :max-count="1" :after-read="upload2"/>
          </div>
          <div class="prompt">
            <p>可上传其他资质</p>
            <p>证书照片</p>
          </div>
        </div>
        <div class="xieyi">
          <div class="xieyiInner">
             <van-checkbox v-model="checked">我已阅读并同意</van-checkbox>
             <span class="agreement" @click="jumpAgreement">《用户服务协议》</span>
          </div>
        </div>
        <div class="submitbtn">
          <van-button type="primary" :loading="submitLoading" loading-type="spinner" size="large" @click="jumpNextStep">提交申请</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import api from '@/api/apiH5'
import apiPC from '@/api/api'
import { Field, Uploader, Toast, Button, Checkbox } from 'vant'
import { setTimeout } from 'timers';
Vue.use(Field).use(Uploader).use(Toast).use(Button).use(Checkbox)

export default {
  name: 'certification-h5',
  data () {
    return {
      businessLicenseNo: '',
      fileList: [],
      fileId: '',
      fileList1: [],
      fileId1: '',
      fileList2: [],
      fileId2: '',
      checked: false,
      submitLoading: false
    }
  },
  created(){
    this.getCertificationStatus()
  },
  methods: {
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
            this.$router.push({
                path: '/success-h5',
                query: {
                  status: res.data.status,
                }
            })
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
    beforeRead() {
    },
    upload(file){
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
          this.fileId =  res.data[0].fileId
          Toast.clear()
        }
      }).catch(err => {
        Toast.clear()
        Toast.fail('上传失败，请重新上传')
      })
    },
    uploadDelete(file){
      this.fileId = ''
    },
    upload1(file){
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
          this.fileId1 =  res.data[0].fileId
          Toast.clear()
        }
      }).catch(err => {
        Toast.clear()
        Toast.fail('上传失败，请重新上传')
      })
    },
    uploadDelete1(file){
      this.fileId1 = ''
    },
    upload2(file){
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
          this.fileId2 =  res.data[0].fileId
          Toast.clear()
        }
      }).catch(err => {
        Toast.clear()
        Toast.fail('上传失败，请重新上传')
      })
    },
    uploadDelete2(file){
      this.fileId2 = ''
    },
    jumpAgreement () {
      this.$router.push('agreement-h5')
    },
    jumpNextStep () {
      if (!this.businessLicenseNo || this.businessLicenseNo == '') {
        Toast.fail('工商注册号不能为空')
        return
      }

      if (!this.fileId || this.fileId == '') {
        Toast.fail('请先上传营业执照')
        return
      }

      if(!this.checked){
        Toast.fail('请先勾选服务协议')
        return 
      }

      let data = {
        businessLicenseNo: this.businessLicenseNo,
        businessLicenseImg: this.fileId,
        handheldIdCardImg: this.fileId1,
        otherCertificateImg: this.fileId2
      }
      this.submitLoading = true
      api.merchantSaveCertification(data).then(res => {
        if (res.code == 0){
          Toast('保存成功')
          this.submitLoading = false
          this.$router.push('success-h5')
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
.certification-h5 {
  min-height: 100vh;
  text-align: left;
  background-color: #f5f5f5;
  .certification-h5-header {
    background-color: #fff;
    .header .headerContent .steps .two::before {
      background: #FFAD71;
    }
    .header .headerContent .steps .two::after {
      background: #FFAD71;
    }
  }
  .enterpriseInfo {
    .title {
      height: 52px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: rgba(0,0,0,0.87);
      text-align: left;
      line-height: 52px;
      margin-left: 16px;
    }
    .form {
      background-color: #f5f5f5;
      .formItem {
        height: 48px;
        display: flex;
        background-color: #fff;
        label {
          box-sizing: border-box;
          width: 120px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: rgba(0,0,0,0.60);
          text-align: left;
          padding-left: 16px;
          padding-right: 16px;
          line-height: 1.5;
          padding-top: 13px;
        }
        .input {
          flex: 1;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          text-align: left;
        }
        .notNull {
          color: #FF7F4A;
        }
      }
      .formItem.upload {
        height: 104px;
        box-sizing: border-box;
        .input {
          margin: 0;
          padding: 0;
          list-style: none;
          display: block;
          margin-top: 16.7px;
          margin-right: 10px;
          flex: 0;
          width: 72px;
          height: 72px;
        }
        .prompt {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: rgba(0,0,0,0.26);
          text-align: left;
          line-height: 18px;
          margin-top: 34px;
          p {
            margin: 0;
            padding: 0;
          }
        }
      }
      .xieyi {
        margin-top: 24px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(0,0,0,0.60);
        text-align: left;
        line-height: 18px;
        position: relative;
        height: 20px;
        span {
          color: #FF7F4A;
        }
      }
      .submitbtn {
        padding: 8px 24px 24px;
        font-family: PingFangSC-Medium;
        font-size: 15px;
        color: #FFFFFF;
        text-align: center;
        line-height: 18px;
      }
    }
  }
}
</style>
<style lang="scss">
.certification-h5 {
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
      margin: 0;
    }
    .van-uploader {
      width: 72px;
      height: 72px;
    }
    .van-uploader__wrapper {
      width: 72px;
      height: 72px;
      overflow: hidden;
      .van-uploader__preview {
        margin: 0;
      }
    }
    .van-uploader__preview-image {
      width: 72px;
      height: 72px;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
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
  }
  .xieyi {
    .xieyiInner {
      // position: absolute;
      // top: 0;
      // left: 50%;
      // transform: translate(-50%, 0);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 312px;
      margin-left: auto;
      margin-right: auto;
      .agreement{
        display: block;
        width: 100px;
      }
    }
    .van-checkbox {
      display: inline-flex;
    }
    .van-checkbox__icon--checked .van-icon {
      color: #FFAD71 ;
      background-color: #f5f5f5;
      border-color: #FFAD71;
    }
    .van-checkbox__label {
      color: rgba(0,0,0,0.60);
      width: 90px;
    }
    .van-checkbox__icon {
      height: auto;
    }
    .van-checkbox__icon .van-icon {
      width: 14px;
      height: 14px;
      border-color: #FFAD71;
    }
    .van-icon-success:before {
      position: relative;
      top: -3px;
      left: -1px;
    }
  }
}
</style>
