<template>
  <div class="loginPc">
    <div class="loginPc_container">
        <head-nav :isLogin='false' :title="title" id="mainHeader"></head-nav>
        <img class="title" src="@/assets/globalPc/title.png" alt="" srcset="">
        <div class="login_form">
            <div class="form">
                <h4 style="font-size: 20PX;color: rgba(0,0,0,0.87);">登录财税鱼</h4>
                <div class="inputContent">
                    <div class="inputBox">
                        <img src="@/assets/globalPc/ic_form_cellnum.png" alt="">
                        <input type="text" v-model="phone" class="phoneInput" maxlength="11" placeholder="请输入手机号" @input="phoneInput" >
                    </div>
                    <div class="inputBox">
                        <img src="@/assets/globalPc/ic_form_password.png" alt="">
                        <input type="password" v-model="password" class="passwordInput" maxlength="18" placeholder="请输入密码" @input="passwordInput" >
                    </div>
                    <span style="display: block;width: 312PX;text-align: right;font-size: 12PX;color: rgba(0,0,0,0.87);cursor: pointer;height: 20PX;" class="forgetPassword" @click="goReset">忘记登录密码</span>
                    <button class="login" :disabled="disabled" @click="login">登 录</button>
                    <span class="join" @click="join">注册账号，免费入驻</span>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footerContent">
                <div class="qrcode">
                    <!-- <img style="display: block;width: 120PX;height: 120PX;margin-bottom: 8PX;" src="@/assets/globalPc/qrcode.png" alt=""> -->
                    <!-- <span style="font-size: 12PX;color: #FFFFFF;">下载财税鱼APP</span> -->
                </div>
                <span class="line">Copyright 2019  |  杭州税牛科技有限公司  |  <a target="_blank" href="http://www.beian.miit.gov.cn" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;color: #FFFFFF;">浙ICP备19028668号</a>  |  <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602010368" style="display:inline-block;text-decoration:none;height:20px;line-height:20px; color: #FFFFFF;"><img src="@/assets/globalPc/beian.png" style="float:left;"/>浙公网安备 33010602010368号</a>  |  <a href="https://res.caishuiyu.com/common/h5/privacy_agreement.html" style="text-decoration-line: none;color: #ffffff;">用户隐私协议</a>  |  All Rights Reserved</span>
                <span class="line">  地址：杭州市西湖区金色西溪商务中心B座</span>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import headNav from '@/components/merchantPC/headNav.vue'
import globalApi from '@/api/globalApi'
import cookie from '@/utils/cookie'
import apiH5 from '@/api/apiH5'
export default {
  name: 'login',
  components: {
    headNav
  },
  data(){
    return {
      title: '商户入驻',
      phone: '',
      password: '',
      disabled: false,
    }
  },
  methods: {
    phoneInput(e){},
    passwordInput(e){},
    login(){
      let params = {
        phone: this.phone,
        password: this.password
      }
      globalApi.authLogin(params).then(res => {
        if(res.code == 0){
          cookie.setCookie('accountPhone', this.phone)
          cookie.setCookie("accessToken", res.data.accessToken)
          cookie.setCookie('companyId', res.data.authInfo.companyId)
          cookie.setCookie('uid', res.data.authInfo.uid)
          cookie.setCookie('imAccid', res.data.authInfo.imAccid)
          cookie.setCookie('imToken', res.data.authInfo.imToken)
          this.getCertificationStatus()
        }
      })
    },
    getCertificationStatus(){
      apiH5.getCertificationStatus().then(res => {
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
    join(){
      this.$router.push({path: '/register-pc'})
    },
    goReset(){
      this.$router.push({path: '/reset'})
    }
  }
}
</script>
<style lang="scss" scoped>
    .loginPc{
        width: 100%;
        // height: 100%;
        min-height: 100vh;
        .loginPc_container{
            position: relative;
            width: 100%;
            // height: 100%;
            min-height: 100vh;
            min-width: 1440PX;
            background: url(../../assets/globalPc/bg.jpg) no-repeat;
            background-size: cover;
            background-position: 50%;
            .title{
                display: block;
                position: absolute;
                top: 32%;
                width: 440PX;
                height: 200PX;
                left: 310PX;
            }
            .login_form{
                width: 392PX;
                height: 295PX;
                position: absolute;
                top: 25%;
                right: 212PX;
                background: linear-gradient(-45deg, rgba(255,255,255,0.95) 0%, #FFFFFF 100%);
                padding-top: 32PX;
                padding-bottom: 33PX;
                
                .form{
                    width: 312PX;
                    margin-left: auto;
                    margin-right: auto;
                    h4{
                        display: block;
                        margin-bottom: 24PX;
                    }
                    .inputContent{
                        width: 100%;
                        .inputBox{
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            width: 100%;
                            background: #F5F5F5;
                            border-radius: 4PX;
                            height: 48PX;
                            margin-bottom: 8PX;
                            img{
                                display: block;
                                width: 24PX;
                                height: 24PX;
                                margin-left: 12PX;
                                margin-right: 12PX;
                            }
                            input{
                                display: block;
                                width: 84%;
                                height: 48PX;
                                line-height: 20PX;
                                padding-top: 14PX;
                                padding-bottom: 14PX;
                                font-size: 14PX;
                                box-sizing: border-box;
                                color: rgba(0,0,0,0.87);
                                outline: none;
                                border: none;
                                background: #F5F5F5;
                            }
                        }
                        .login{
                            width: 312PX;
                            height: 36PX;
                            border: none;
                            outline: none;
                            line-height: 36PX;
                            background: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
                            border-radius: 4PX;
                            font-size: 15PX;
                            color: #FFFFFF;
                            text-align: center;
                            margin-top: 16PX;
                            margin-bottom: 16PX;
                            cursor: pointer;
                        }
                        .join{
                            display: block;
                            height: 36PX;
                            line-height: 36PX;
                            font-size: 15PX;
                            color: #FF7F4A;
                            text-align: center;
                            border-radius: 4PX;
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
