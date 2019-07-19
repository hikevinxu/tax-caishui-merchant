<template>
  <div class="certificationPc">
    <div class="certificationPc_container">
        <head-nav id="mainHeader"></head-nav>
        <div class="certificationContent">
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
                <h4>资质认证</h4>
                <div class="form">
                  <div class="formItem">
                    <label for="name">工商注册号<span>*</span></label>
                    <div class="input">
                      <input type="text" v-model="phone" placeholder="请输入工商注册号" />
                    </div>
                  </div>
                  <div class="formItem uploadImg">
                    <label for="name">营业执照<span>*</span></label>
                    <div class="input">
                      <div class="imgList fl">

                      </div>
                      <div class="logoWarning fl">
                        <p>请上传营业执照原件照片</p>
                      </div>
                    </div>
                  </div>
                  <div class="formItem uploadImg">
                    <label class="longLabel" for="name">法人手持身份证照片<span>*</span></label>
                    <div class="input">
                      <div class="imgItem">
                        <div class="imgList fl">

                        </div>
                        <div class="logoWarning fl">
                          <p>正面照片</p>
                        </div>
                      </div>
                      <div class="imgItem">
                        <div class="imgList fl">

                        </div>
                        <div class="logoWarning fl">
                          <p>反面照片</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="formItem uploadImg">
                    <label for="name">资质证书<span>*</span></label>
                    <div class="input">
                      <div class="imgList fl">

                      </div>
                      <div class="logoWarning fl">
                        <p>可上传其他资质证书照片</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="xieyi"><el-checkbox v-model="checked"></el-checkbox>我已阅读并同意<span>《用户服务协议》</span></div>
                <div class="submitBtn">
                  <button>提交申请</button>
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
import { setCookie } from '@/utils/cookie.js'

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
      checked: false
    }
  },
  methods: {
    jumpAgreement(){

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
            }
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
    }
  }
}
</style>
