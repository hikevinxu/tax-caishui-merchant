<template>
  <div class="certificationPc">
    <div class="certificationPc_container">
        <head-nav :isLogin="false" :title="title" id="mainHeader"></head-nav>
        <div class="certificationContent">
            <div class="header">
                <div class="headerContent">
                    <div class="steps">
                        <div class="numberPC one">
                          <img src="@/assets/global/ic_stepdone.png" alt="" srcset="">
                        </div>
                        <span class="active">注册账号</span>
                    </div>
                    <div class="steps">
                        <div class="numberPC one two_success">
                          <img src="@/assets/global/ic_stepdone.png" alt="" srcset="">
                        </div>
                        <span class="active">认领企业</span>
                    </div>
                    <div class="steps">
                        <div class="numberPC one">3</div>
                        <span class="active">提交资质</span>
                    </div>
                </div>
            </div>
            <div class="register_form">
                <h4>资质认证</h4>
                <div class="form">
                  <div class="formItem">
                    <label for="name">工商注册号<span>*</span></label>
                    <div class="input">
                      <input type="text" v-model="businessLicenseNo" placeholder="请输入工商注册号" />
                    </div>
                  </div>
                  <div class="formItem uploadImg">
                    <label for="name">营业执照<span>*</span></label>
                    <div class="input">
                      <div class="imgList fl">
                        <el-upload
                          class="upload-demo"
                          action=""
                          :http-request="uploadYYZZ"
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
                        <p>请上传营业执照原件照片</p>
                      </div>
                    </div>
                  </div>
                  <div class="formItem uploadImg">
                    <label class="longLabel" for="name">法人手持身份证照片</label>
                    <div class="input">
                      <div class="imgItem">
                        <div class="imgList fl">
                           <el-upload
                            class="upload-demo"
                            action=""
                            :http-request="uploadSFZ"
                            :multiple="false"
                            :show-file-list="false">
                            <div class="imgDesrcibe" style="display: block;width: 100%;height: 100%;position: relative;">
                              <img class="introduceImg" style="display: block;width: 100%;height: 100%" :src="introduceImg1" alt="" srcset="">
                              <div class="deleteIcon" @click.stop="deleteFileId1" v-if="fileId1 !== ''">
                                <i class="el-icon-delete"></i>
                              </div>
                            </div>
                            <div class="addPhotoIcon" v-if="fileId1 == ''">
                              <img src="@/assets/globalPc/ic_form_addphoto@3x.png" alt="">
                            </div>
                          </el-upload>
                        </div>
                        <div class="logoWarning fl">
                          <p>正面照片</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="formItem uploadImg">
                    <label for="name">资质证书</label>
                    <div class="input">
                      <div class="imgList fl">
                         <el-upload
                          class="upload-demo"
                          action=""
                          :http-request="uploadZZZS"
                          :multiple="false"
                          :show-file-list="false">
                          <div class="imgDesrcibe" style="display: block;width: 100%;height: 100%;position: relative;">
                            <img class="introduceImg" style="display: block;width: 100%;height: 100%" :src="introduceImg2" alt="" srcset="">
                            <div class="deleteIcon" @click.stop="deleteFileId2" v-if="fileId2 !== ''">
                              <i class="el-icon-delete"></i>
                            </div>
                          </div>
                          <div class="addPhotoIcon" v-if="fileId2 == ''">
                            <img src="@/assets/globalPc/ic_form_addphoto@3x.png" alt="">
                          </div>
                        </el-upload>
                      </div>
                      <div class="logoWarning fl">
                        <p>可上传其他资质证书照片</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="xieyi"><el-checkbox v-model="checked"></el-checkbox>我已阅读并同意<span @click="jumpXieYi">《用户服务协议》</span></div>
                <div class="submitBtn">
                  <button @click="jumpAgreement">提交申请</button>
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
import apiPC from '@/api/api'
import api from '@/api/apiH5'

export default {
  name: 'certification-pc',
  components: {
    headNav
  },
  data(){
    return {
      title: '返回登录',
      businessLicenseNo: '',
      input: '',
      loading: '',
      options: [],
      type: '',
      checked: false,
      introduceImg: '',
      introduceImg1: '',
      introduceImg2: '',
      fileId: '',
      fileId1: '',
      fileId2: ''
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
            this.$router.push({path: '/search-pc'})
          }else if(res.data.status == 101){
            this.$router.push({path: '/certification-pc'})
          }else if(res.data.status == 102){
            this.$router.push({
                path: '/success-pc',
                query: {
                  status: res.data.status,
                }
            })
          }else if(res.data.status == 103){
            this.$router.push({path: '/home'})
          }else if(res.data.status == 999){
            this.$router.push({
                path: '/success-pc',
                query: {
                  status: res.data.status,
                }
            })
          }
        }
      })
    },
    jumpAgreement(){
      if(this.businessLicenseNo == ''){
        this.$message({
          message: '工商注册号不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return 
      }

      if(this.fileId == ''){
        this.$message({
          message: '请先上传营业执照',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return 
      }

      if(!this.checked){
        this.$message({
          message: '请先勾选服务协议',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return 
      }

      let data = {
        businessLicenseNo: this.businessLicenseNo,
        businessLicenseImg: this.fileId,
        handheldIdCardImg: this.fileId1,
        otherCertificateImg: this.fileId2
      }
      api.merchantSaveCertification(data).then(res => {
        if(res.code == 0){
          this.$message({
            message: '提交成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          setTimeout(res => {
            this.$router.push('success-pc')
          },1000)
        }
      })
    },
    //上传图片
    uploadYYZZ (files) {
      // console.log(files)
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
        } else {
          loading.close()
        }
      }).catch(err => {
        loading.close()
        this.$message.error('上传失败，请重新上传')
      })
    },
    uploadSFZ (files) {
      const loading = this.$loading({
        lock: true,
        text: '正在上传图片，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // console.log(files)
      let formData = new FormData()
      formData.append('files', files.file)
      apiPC.fileupload(formData).then(res => {
        if (res.code == 0) {
          this.fileId1 =  res.data[0].fileId
          let reader = new FileReader();
          let file = files.file
          let imgUrlBase64
          if(file){
            imgUrlBase64 = reader.readAsDataURL(file);
            reader.onload = (e) => {
              this.introduceImg1 = reader.result
              loading.close()
            }
          }
        } else {
          loading.close()
        }
      }).catch(err => {
        loading.close()
        this.$message.error('上传失败，请重新上传')
      })
    },
    uploadZZZS (files) {
      // console.log(files)
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
          this.fileId2 =  res.data[0].fileId
          let reader = new FileReader();
          let file = files.file
          let imgUrlBase64
          if(file){
            imgUrlBase64 = reader.readAsDataURL(file);
            reader.onload = (e) => {
              this.introduceImg2 = reader.result
              loading.close()
            }
          }
        } else {
          loading.close()
        }
      }).catch(err => {
        loading.close()
        this.$message.error('上传失败，请重新上传')
      })
    },
    deleteFileId () {
      this.fileId = ''
      this.introduceImg = ''
    },
    deleteFileId1(){
      this.fileId1 = ''
      this.introduceImg1 = ''
    },
    deleteFileId2(){
      this.fileId2 = ''
      this.introduceImg2 = ''
    },
    jumpXieYi(){
      this.$router.push('protocolBook-pc')
    }
  }
}
</script>
<style lang="scss" scoped>
.certificationPc{
  width: 100%;
  height: 100vh;
  #mainHeader {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .certificationPc_container{
    position: relative;
    width: 100%;
    height: 100vh;
    background: url(../../../assets/globalPc/bg.jpg) no-repeat;
    background-size: cover;
    background-position: 50%;
    .certificationContent{
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
              box-sizing: border-box;
              padding-right: 20Px;
              font-family: PingFangSC-Regular;
              font-size: 14Px;
              color: rgba(0,0,0,0.60);
              text-align: left;
              line-height: 40Px;
              span {
                color: #FF7F4A;
              }
            }
            .longLabel {
              line-height: 20Px;
              margin-top: 6Px;
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
            .input {
              height: auto;
              .imgItem {
                width: 100%;
                height: 72Px;
                margin-bottom: 16Px;
                &:last-child {
                  margin-bottom: 0;
                }
              }
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
                .upload-demo{
                  width: 100%;
                  height: 100%;
                }
                .el-upload {
                  width: 100%;
                  height: 100%;
                }
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
        .xieyi {
          margin-top: 24Px;
          font-family: PingFangSC-Regular;
          font-size: 12Px;
          color: rgba(0,0,0,0.60);
          text-align: left;
          line-height: 18Px;
          height: 20Px;
          text-align: center;
          span {
            color: #FF7F4A;
            cursor: pointer;
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
            margin-top: 8Px;
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
.certificationPc {
  .certificationPc_container {
    .register_form {
      .form {
        .formItem {
          .input {
            .el-select {
              display: block;
            }
          }
        }
      }
      .el-checkbox {
        margin-right: 8Px;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #fff;
        border-color: #FF7F4A;
      }
      .el-checkbox__inner {
        border-radius: 50%;
        border-color: #FF7F4A;
      }
      .el-checkbox__inner::after {
        border-color: #FF7F4A;
      }
      .el-upload {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
