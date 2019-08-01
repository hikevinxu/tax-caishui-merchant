<template>
  <div class="resetPc">
    <div class="resetPc_container">
        <head-nav :isLogin="false" :title="title" id="mainHeader"></head-nav>
        <div class="resetContent">
          <div class="resetForm">
            <h4>重置登录密码</h4>
            <div class="inputBox">
              <span class="label">财税鱼账号</span>
              <input type="text" @input="phoneInput" v-model="phone" placeholder="请输入需重置密码的账号(手机号)">
            </div>
            <div class="inputBox">
                <span class="label">验证码</span>
                <div class="codeInputBox" style="width: 50%;">
                    <input type="text" v-model="code" class="codeInput" maxlength="4" placeholder="验证码" @input="codeInput">
                </div>
                <div id="captcha"></div>
                <span v-show="codeStart == true" class="codeStart">获取验证码</span>
                <span v-show="isCode == true && codeStart == false" class="isCode"  @click="codeClick">获取验证码</span>
                <span class="count" v-show="isCode == false && codeStart == false">{{ count }}s后获取</span>
            </div>
            <div class="inputBox">
              <span class="label">新密码</span>
              <input type="password" @input="passwordInput" v-model="password" placeholder="请输入新密码">
            </div>
            <div class="inputBox">
              <span class="label">确认密码</span>
              <input type="password" @input="repasswordInput" v-model="repassword" placeholder="再次确认新密码">
            </div>
            <button class="next" :disabled="disabled" @click="reset">重置</button>
            <span class="explain">若手机号已停用请联系客服处理</span>
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
import api from '@/api/apiH5'
import cookie from '@/utils/cookie'
import { config } from '@/utils/global.js'
export default {
  name: 'reset',
  components: {
    headNav
  },
  data(){
    return {
      title: '返回登录',
      phone: '',
      codeStart: true,
      isCode: true,
      count: 0,
      disabled_code: true,
      disabled: true,
      code: '',
      password: '',
      repassword: '',
      timer: null,
      captchaIns: ''
    }
  },
  created(){
    var that = this
    // initNECaptcha为全局函数，可直接调用
    initNECaptcha({
      // config对象，参数配置
      captchaId: config.captchaId,
      element: '#captcha',
      mode: 'bind',
      width: '320px',
      enableClose: true, // 由业务方控制验证码弹框关闭
      onVerify: function(err, data){
        // 用户验证码验证成功后，进行实际的提交行为
        if (!err) {
          // 验证成功后，调用close方法关闭弹框（enableClose为true时调用）
          that.captchaIns.close()
          if (data) {
            that.sendCode(data)
          }
        } else {
            console.log(err)
          return
        }
      }
    }, function  onload (instance) {
        // 初始化成功后得到验证实例instance，可以调用实例的方法
        console.log(instance)
        that.captchaIns = instance
    }, function  onerror (err) {
        // 初始化失败后触发该函数，err对象描述当前错误信息
    })
  },
  methods: {
    getCode(){
      let time = 60
      if(!this.timer){
          this.count = time
          this.timer = setInterval(() => {
              if(this.count > 0 && this.count <= time){
                  this.count -- 
                  console.log(this.count)
              }else{
                  clearInterval(this.timer);
                  this.timer = null; 
                  this.isCode = true
                  this.codeStart = false
              }
          },1000)
      }
    },
    phoneInput(e){
        this.codeStart = false
        if(this.phone == ''){
            this.codeStart = true
            this.disabled = true
        }else{
            this.codeStart = false
            if(this.code != '' && this.password != '' && this.repassword != ''){
                this.disabled = false
            }else{
                this.disabled = true
            }
        }
    },
    passwordInput(e){
      if(this.code != '' && this.phone != '' && this.password != '' && this.repassword != ''){
          this.disabled = false
      }else{
          this.disabled = true
      }
    },
    codeInput(e){
      if(this.code != '' && this.phone != '' && this.password != '' && this.repassword != ''){
          this.disabled = false
      }else{
          this.disabled = true
      }
    },
    repasswordInput(e){
      if(this.code != '' && this.phone != '' && this.password != '' && this.repassword != ''){
          this.disabled = false
      }else{
          this.disabled = true
      }
    },
    codeClick(){
      this.isCode = false
      let phone = this.phone
      if(!(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(phone))){
          this.$message({
            message: '请输入正确的手机号',
            type: 'error',
            showClose: true,
            duration: 1000
          })
          this.isCode = true
          return
      }
      this.captchaIns && this.captchaIns.verify()
    },
    sendCode(data){
      let phone = this.phone
      let json = {
          phone: phone,
          captchaValidate: data.validate 
          // captchaValidate: '0000'
      }
      api.passwordCode(json).then(res => {
          this.captchaIns && this.captchaIns.refresh()
          if(res.code == 0){
              this.getCode()
          }
      })
      .catch( err => {
          this.captchaIns && this.captchaIns.refresh()
          this.isCode = true
      })
    },
    reset(){
      if(!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/).test(this.password)){
          this.$message({
            message: '密码需6~16位字母数字组合',
            type: 'error',
            showClose: true,
            duration: 1000
          })
          return
      }
      if(this.password != this.repassword){
        this.$message({
          message: '两次密码输入不一致',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return
      }
      if(this.password.length >= 6){
        let phone = this.phone,
            password = this.password
        let data = {
            phone: phone,
            password: password,
            verifycode: this.code
        }
        console.log(data)
        // data = qs.stringify(data)
        api.passwordReset(data).then(res => {
            console.log(res)
            if(res.code == 0){
                this.$message({
                    message: '重置成功',
                    type: 'success',
                    showClose: true,
                    duration: 1000
                })
                this.$router.push({path: '/login'})
            }
        })
        .catch(err => {
            console.log(res)
            this.isCode = true
        })
        }else{
            this.$message({
              message: '密码6~16位',
              type: 'error',
              showClose: true,
              duration: 1000
            })
        }
    },
  }
}
</script>
<style lang="scss" scoped>
.resetPc{
  width: 100%;
  height: 100vh;
  #mainHeader {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .resetPc_container{
    position: relative;
    width: 100%;
    height: 100vh;
    background: url(../../assets/globalPc/bg.jpg) no-repeat;
    background-size: cover;
    background-position: 50%;
    .resetContent{
      box-sizing: border-box;
      width: 808PX;
      height: 100vh;
      margin-left: auto;
      margin-right: auto;
      padding-top: 140Px;
      padding-bottom: 100Px;
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .resetForm{
        width: 100%;
        background: #FFFFFF;
        border-radius: 4PX;
        min-height: 284PX;
        padding-top: 48PX;
        padding-bottom: 48PX;
        display: flex;
        flex-flow: column;
        align-items: center;
        h4{
          font-size: 20PX;
          color: rgba(0,0,0,0.87);
          display: block;
          margin-bottom: 32PX;
        }
        .inputBox{
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24PX;
          .label{
            display: block;
            width: 70PX;
            margin-right: 24PX;
            text-align: left;
            font-size: 14PX;
            color: rgba(0,0,0,0.60);
          }
          input{
            width: 300PX;
            padding-left: 16PX;
            background: #FAFAFA;
            border-radius: 4PX;
            display: block;
            outline: none;
            border: none;
            height: 40PX;
            line-height: 40PX;
            color: rgba(0,0,0,0.87);
            font-size: 14PX;
          }
          .codeInput{
            width: 200PX;
          }
          .codeStart,.count{
            background: #FAFAFA;
            border: 1PX solid #FFAD71;
            border-radius: 4PX;
            width: 88PX;
            height: 40PX;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1PX solid rgba(0,0,0,0.20);
            font-size: 13PX;
            color: rgba(0,0,0,0.20);
            margin-left: 18PX;
            cursor: pointer;
          }
          .isCode{
            background: #FAFAFA;
            border: 1PX solid #FFAD71;
            border-radius: 4PX;
            width: 88PX;
            height: 40PX;
            display: flex;
            align-items: center;
            justify-content: center;
            // border: 1PX solid rgba(0,0,0,0.60);
            font-size: 13PX;
            margin-left: 18PX;
            color: #FFAD71;
            cursor: pointer;
          }
        }
        .next{
          display: block;
          width: 226PX;
          height: 36PX;
          line-height: 36PX;
          text-align: center;
          background: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
          border-radius: 4PX;
          font-size: 15PX;
          color: #FFFFFF;
          margin-bottom: 16PX;
          outline: none;
          cursor: pointer;
        }
        .explain{
          display: block;
          font-size: 12PX;
          color: rgba(0,0,0,0.60);
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
