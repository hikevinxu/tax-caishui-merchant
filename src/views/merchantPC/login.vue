<template>
  <div class="loginPc">
    <div class="loginPc_container">
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
                    <span style="display: block;width: 312PX;text-align: right;font-size: 12PX;color: rgba(0,0,0,0.87);cursor: pointer;" class="forgetPassword">忘记登录密码</span>
                    <button class="login" :disabled="disabled" @click="login">登 录</button>
                    <span class="join" @click="join">注册账号，免费入驻</span>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footerContent">
                <div class="qrcode">
                    <img style="display: block;width: 120PX;height: 120PX;margin-bottom: 8PX;" src="@/assets/globalPc/qrcode.png" alt="">
                    <span style="font-size: 12PX;color: #FFFFFF;">下载财税鱼APP</span>
                </div>
                <span class="line">Copyright 2019  |  杭州税牛科技有限公司  |  浙ICP备19028668号  |  <a href="https://res.pocket.taxlioner.com/common/h5/privacy_agreement.html" style="text-decoration-line: none;color: #ffffff;">用户隐私协议</a>  |  All Rights Reserved</span>
                <span class="line">E-mail：kf@taxlioner.com  |  地址：杭州市西湖区金色西溪商务中心B座</span>
            </div>
        </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'login',
  data(){
    return {
        phone: '',
        password: '',
        disabled: false,
    }
  },
  methods: {
    phoneInput(e){},
    passwordInput(e){},
    login(){},
    join(){}
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
            background: url(../../assets/globalPc/bg_slide1.jpg) no-repeat;
            background-size: cover;
            background-position: 50%;
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
                                line-height: 48PX;
                                font-size: 14PX;
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
                            margin-top: 32PX;
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
