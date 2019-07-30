<template>
    <div class="register-h5">
        <div class="header">
            <div class="headerContent">
                <div class="steps">
                    <div class="number one">1</div>
                    <span class="acitve">注册账号</span>
                </div>
                <div class="steps">
                    <div class="number two">2</div>
                    <span>认领企业</span>
                </div>
                <div class="steps">
                    <div class="number">3</div>
                    <span>提交资质</span>
                </div>
            </div>
        </div>
        <div class="register-h5-content">
            <div class="form">
                <div class="inputBox">
                    <img src="@/assets/global/form_cellnum.png" alt="">
                    <input type="text" v-model="phone" class="phoneInput" maxlength="11" placeholder="账号使用手机号" @input="phoneInput" >
                </div>
                <span style="font-size: 12px;color: rgba(0,0,0,0.60);display: block;margin-bottom: 13px;margin-left: 72px;">该手机号将作为商户登录账号</span>
                <div id="captcha"></div>
                <div class="inputBox">
                    <img src="@/assets/global/form_cellpass.png" alt="">
                    <input type="text" v-model="code" class="codeInput" maxlength="4" placeholder="验证码" @input="codeInput">
                    <span v-show="codeStart == true" class="codeStart">获取验证码</span>
                    <span v-show="isCode == true && codeStart == false" class="isCode"  @click="codeClick">获取验证码</span>
                    <span class="count" v-show="isCode == false && codeStart == false">{{ count }}s后获取</span>
                </div>
                <div class="inputBox">
                    <img src="@/assets/global/form_cellpass.png" alt="">
                    <input type="text" v-model="password" class="passwordInput" maxlength="11" placeholder="密码, 6～16位数字字母组合" @input="passwordInput" >
                </div>
            </div>
            <button id="register" :disabled="disabled" @click="login">注 册</button>

        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import api from '@/api/apiH5'
import qs from 'qs'
import cookie from '@/utils/cookie'
Vue.use(Toast);
export default {
  name: 'register-h5',
  data(){
    return{
        phone: '',
        password: '',
        codeStart: true,
        isCode: true,
        count: 0,
        disabled_code: true,
        disabled: true,
        code: '',
        timer: null,
        captchaIns: undefined
    }
  },
  created(){
      var that = this
    // initNECaptcha为全局函数，可直接调用
    initNECaptcha({
      // config对象，参数配置
      captchaId: '39626bde5c61453a9bba63b1eb0a7d2c',
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
            // console.log(err)
          return
        }
      }
    }, function  onload (instance) {
        // 初始化成功后得到验证实例instance，可以调用实例的方法
        // console.log(instance)
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
                  //  console.log(this.count)
               }else{
                   clearInterval(this.timer);
                   this.timer = null; 
                   this.isCode = true
                   this.sendIng = false
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
            if(this.code != '' && this.password != ''){
                this.disabled = false
            }else{
                this.disabled = true
            }
        }
    },
    passwordInput(e){
        if(this.code != '' && this.phone != '' && this.password != ''){
            this.disabled = false
        }else{
            this.disabled = true
        }
    },
    codeInput(e){
        if(this.code != '' && this.phone != '' && this.password != ''){
            this.disabled = false
        }else{
            this.disabled = true
        }
    },
    codeClick(){
        // console.log(this.captchaIns)
        this.captchaIns && this.captchaIns.verify()
    },
    sendCode(data){
        this.isCode = false
        let phone = this.phone
        if(!(/^1[23456789]\d{9}$/.test(phone))){
            Toast('请输入正确的手机号')
        }else{
            let json = {
                clientType: 'h5',
                phone: phone,
                captchaValidate: data.validate 
            }
            api.merchantCode(json).then(res => {
                this.captchaIns && this.captchaIns.refresh()
                if(res.code == 0){
                    this.getCode()
                }
            })
            .catch( err => {
                this.isCode = true
                this.captchaIns && this.captchaIns.refresh()
            })
        }
    },
    login(){
        if(this.password.length >= 6){
            let phone = this.phone,
                password = this.password
            let data = {
                clientType: 'h5',
                phone: phone,
                password: password,
                verifycode: this.code
            }
            api.merchantRegister(data).then(res => {
                if(res.code == 0){
                  Toast('注册成功')
                  cookie.setCookie("accessToken", res.data.accessToken)
                  cookie.setCookie('companyId', res.data.authInfo.companyId)
                  cookie.setCookie('uid', res.data.authInfo.uid)
                  cookie.setCookie('imAccid', res.data.authInfo.imAccid)
                  cookie.setCookie('imToken', res.data.authInfo.imToken)
                  this.getCertificationStatus()
                }
            })
            .catch(err => {
                // console.log(err)
            })
        }else{
            Toast('密码是长度在6~16之间')
        }
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
  }
}
</script>

<style lang="scss" scoped>
    body,html{
        height: 100%;
        width: 100%;
    }

    #app{
        height: 100%;
        width: 100%;
    }

    .register-h5{
        width: 100%;
        height: 100%;
        background: #ffffff;
    }

    .register-h5 .register-h5-content{
        width: 100%;
        margin-top: 16px;
    }

    .register-h5 .register-h5-content .form{
        width: 100%;
        margin-bottom: 40px;
    }

    .register-h5 .register-h5-content .form .inputBox{
        width: 312px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background: #FAFAFA;
        border-radius: 4px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 8px;
    }

    .register-h5 .register-h5-content .form .inputBox img{
        display: block;
        width: 24px;
        height: 24px;
        margin-left: 12px;
        margin-right: 12px;
    }

    .register-h5 .register-h5-content .form .inputBox input{
        height: 100%;
        border: none;
        background: #FAFAFA;
        font-size: 14px;
        color: rgba(0,0,0,0.60);
    }

    .register-h5 .register-h5-content .form .inputBox .phoneInput,
    .register-h5 .register-h5-content .form .inputBox .passwordInput{
        width: 84%;
    }

    .register-h5 .register-h5-content .form .inputBox .codeInput{
        width: 53%;
    }

    .register-h5 .register-h5-content .form .inputBox .isCode{
        font-size: 13px;
        color: #FFAD71;
        display: block;
        width: 25%;
        height: 24px;
        line-height: 24px;
        text-align: right;
        border-left: 1px solid rgba(0,0,0,0.12);
    }

    .register-h5 .register-h5-content .form .inputBox .codeStart,
    .register-h5 .register-h5-content .form .inputBox .count{
        font-size: 13px;
        color: rgba(0,0,0,0.12);
        display: block;
        width: 25%;
        height: 24px;
        line-height: 24px;
        text-align: right;
        border-left: 1px solid rgba(0,0,0,0.12);
    }

    .register-h5 .register-h5-content #register{
        display: block;
        background: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
        border-radius: 18px;
        width: 312px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border: none;
        outline: none;
        font-size: 15px;
        color: #FFFFFF;
        line-height: 18px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
