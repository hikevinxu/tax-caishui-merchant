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
                <div class="inputBox">
                    <img src="@/assets/global/form_cellpass.png" alt="">
                    <input type="text" v-model="code" class="codeInput" maxlength="4" placeholder="验证码" @input="codeInput">
                    <span v-show="codeStart == true" class="codeStart">获取验证码</span>
                    <span v-show="isCode == true && codeStart == false" class="isCode"  @click="sendCode">获取验证码</span>
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
    }
  },
  created(){
    
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
                   this.sendIng = false
               }
            },1000)
        }
    },
    phoneInput(e){
        console.log(this.phone)
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
        console.log(this.code)
        if(this.code != '' && this.phone != '' && this.password != ''){
            this.disabled = false
        }else{
            this.disabled = true
        }
    },
    codeInput(e){
        console.log(this.code)
        if(this.code != '' && this.phone != '' && this.password != ''){
            this.disabled = false
        }else{
            this.disabled = true
        }
    },
    sendCode(){
        let phone = this.phone
        if(!(/^1[345678]\d{9}$/.test(phone))){
            vant.Toast('请输入正确的手机号')
        }else{
            this.isCode = false
            this.getCode()
        }
    },
    login(){}
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
