<template>
  <div class="registerPc">
    <div class="registerPc_container">
        <head-nav :isLogin="false" :title="title" id="mainHeader"></head-nav>
        <div class="registerContent">
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
                <h4>注册账号</h4>
                <div class="form">
                    <div class="inputBox">
                        <img src="@/assets/globalPc/ic_form_cellnum.png" alt="">
                        <input type="text" v-model="phone" class="phoneInput" maxlength="11" placeholder="账号使用手机号" @input="phoneInput" >
                    </div>
                    <span class="phoneExplain">该手机号将作为商户登录账号</span>
                    <div class="code">
                        <div class="codeInputBox">
                            <img src="@/assets/globalPc/ic_form_cellnum.png" alt="">
                            <input type="text" v-model="code" class="codeInput" maxlength="4" placeholder="验证码" @input="codeInput">
                        </div>
                        <div id="captcha"></div>
                        <span v-show="codeStart == true" class="codeStart">获取验证码</span>
                        <span v-show="isCode == true && codeStart == false" class="isCode"  @click="codeClick">获取验证码</span>
                        <span class="count" v-show="isCode == false && codeStart == false">{{ count }}s后获取</span>
                    </div>
                    <div class="inputBox">
                        <img src="@/assets/globalPc/ic_form_password.png" alt="">
                        <input type="text" v-model="password" class="passwordInput" maxlength="11" placeholder="密码, 6～16位数字字母组合" @input="passwordInput" >
                    </div>
                    <button id="register" :disabled="disabled" @click="login">注 册</button>
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
import api from '@/api/apiH5'
import cookie from '@/utils/cookie'
export default {
  name: 'login',
  components: {
    headNav
  },
  data(){
    return {
        title: '返回登录',
        phone: '',
        password: '',
        codeStart: true,
        isCode: true,
        count: 0,
        disabled_code: true,
        disabled: true,
        code: '',
        timer: null,
        captchaIns: ''
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
        console.log(this.captchaIns)
        this.captchaIns && this.captchaIns.verify()
    },
    sendCode(data){
        this.isCode = false
        let phone = this.phone
        if(!(/^1[23456789]\d{9}$/.test(phone))){
            this.$message({
              message: '请输入正确的手机号',
              type: 'error',
              showClose: true,
              duration: 1000
            })
        }else{
            let json = {
                clientType: 'pc',
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
                this.captchaIns && this.captchaIns.refresh()
                this.isCode = true
            })
        }
    },
    login(){
      if(this.password.length >= 6){
            let phone = this.phone,
                password = this.password
            let data = {
                clientType: 'pc',
                phone: phone,
                password: password,
                verifycode: this.code
            }
            console.log(data)
            // data = qs.stringify(data)
            api.merchantRegister(data).then(res => {
                console.log(res)
                if(res.code == 0){
                    this.$message({
                        message: '保存成功',
                        type: 'success',
                        showClose: true,
                        duration: 1000
                    })
                    cookie.setCookie("accessToken", res.data.accessToken)
                    cookie.setCookie('companyId', res.data.authInfo.companyId)
                    cookie.setCookie('uid', res.data.authInfo.uid)
                    cookie.setCookie('imAccid', res.data.authInfo.imAccid)
                    cookie.setCookie('imToken', res.data.authInfo.imToken)
                    this.getCertificationStatus()
                }
            })
            .catch(err => {
                this.c
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
    getCertificationStatus(){
      api.getCertificationStatus().then(res => {
        console.log(res)
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
  }
}
</script>
<style lang="scss" scoped>
    .registerPc{
        width: 100%;
        // height: 100%;
        min-height: 100vh;
        #mainHeader{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
        }
        .registerPc_container{
            position: relative;
            width: 100%;
            // height: 100%;
            min-height: 100vh;
            min-width: 1440PX;
            // padding-bottom: 90PX;
            background: url(../../../assets/globalPc/bg.jpg) no-repeat;
            background-size: cover;
            background-position: 50%;
            // padding-bottom: 90PX;
            .registerContent{
                box-sizing: border-box;
                width: 808PX;
                height: 100vh;
                margin-left: auto;
                margin-right: auto;
                padding-top: 100PX;
                padding-bottom: 100PX;
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
                    height: 600PX;
                    padding-top: 40PX;
                    border-radius: 4PX;
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
                        width: 312PX;
                        margin-left: auto;
                        margin-right: auto;
                        margin-top: 24PX;
                        .inputBox,.code{
                            width: 100%;
                            margin-bottom: 16PX;
                        }
                        .inputBox{
                            height: 40PX;
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            background: #FAFAFA;
                            border-radius: 4PX;
                            img{
                                display: block;
                                margin-left: 12PX;
                                margin-right: 12PX;
                                width: 24PX;
                                height: 24PX;
                            }
                            input{
                                display: block;
                                outline: none;
                                border: none;
                                background: #FAFAFA;
                                height: 40PX;
                                line-height: 40PX;
                                width: 84%;
                                font-size: 14PX;
                                color: rgba(0,0,0,0.60);
                            }
                        }
                        .phoneExplain{
                            display: block;
                            margin-bottom: 16PX;
                            font-size: 12PX;
                            color: rgba(0,0,0,0.60);
                            margin-left: 30PX;
                        }
                        .code{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            .codeInputBox{
                                width: 216PX;
                                height: 40PX;
                                display: flex;
                                align-items: center;
                                justify-content: flex-start;
                                background: #FAFAFA;
                                border-radius: 4PX;
                                img{
                                    display: block;
                                    margin-left: 12PX;
                                    margin-right: 12PX;
                                    width: 24PX;
                                    height: 24PX;
                                }
                                input{
                                    display: block;
                                    outline: none;
                                    border: none;
                                    background: #FAFAFA;
                                    height: 40PX;
                                    line-height: 40PX;
                                    width: 84%;
                                    font-size: 14PX;
                                    color: rgba(0,0,0,0.60);
                                }
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
                                color: #FFAD71;
                                cursor: pointer;
                            }
                        }
                        #register{
                            display: block;
                            width: 312PX;
                            height: 36PX;
                            line-height: 36PX;
                            text-align: center;
                            outline: none;
                            border: none;
                            font-size: 15PX;
                            color: #FFFFFF;
                            background: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
                            border-radius: 4PX;
                            margin-top: 32PX;
                            cursor: pointer;
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
