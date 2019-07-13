<template>
  <div class="certification-h5"> 
    <div class="certification-h5-header">
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
            <van-field v-model="name" placeholder="工商注册号不能为空" />
          </div>
        </div>
        <div class="formItem upload">
          <label for="fileList">营业执照<span class="notNull">*</span></label>
          <div class="input">
            <van-uploader v-model="fileList" multiple :max-count="2" :before-read="beforeRead" />
          </div>
          <div class="prompt">
            <p>请上传营业执照</p>
            <p>原件照片</p>
          </div>
        </div>
        <div class="formItem upload">
          <label for="fileList">法人手持身份证照片<span class="notNull">*</span></label>
          <div class="input">
            <van-uploader v-model="fileList" multiple :max-count="2" :before-read="beforeRead" />
          </div>
          <div class="prompt">
            <p>请上传营业执照</p>
            <p>原件照片</p>
          </div>
        </div>
        <div class="formItem upload">
          <label for="fileList">资质证书</label>
          <div class="input">
            <van-uploader v-model="fileList" multiple :max-count="2" :before-read="beforeRead" />
          </div>
          <div class="prompt">
            <p>可上传其他资质</p>
            <p>证书照片</p>
          </div>
        </div>
        <div class="xieyi">
          <div class="xieyiInner">
             <van-checkbox v-model="checked">我已阅读并同意<span>《用户服务协议》</span></van-checkbox>
          </div>
        </div>
        <div class="submitbtn">
          <van-button type="primary" size="large">提交申请</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field, Picker, Popup, Uploader, Toast, Button, Checkbox } from 'vant'
Vue.use(Field).use(Picker).use(Popup).use(Uploader).use(Toast).use(Button).use(Checkbox)

export default {
  data () {
    return {
      name: '',
      fileList: [],
      checked: true
    }
  },
  methods: {
    beforeRead() {
      console.log(123)
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
        .input {
          margin-top: 16px;
          flex: 0;
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
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0)
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
    width: 200px;
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
</style>
