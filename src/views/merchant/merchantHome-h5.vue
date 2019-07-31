<template>
    <div class="merchantHome-h5">
        <div v-show="h5" style="padding-bottom: 78px;">
            <img style="" src="@/assets/global/body_01.png" alt="" srcset="">
            <img src="@/assets/global/body_02.png" alt="" srcset="">
            <div class="merchantHome-footer">
                <span class="btn" @click="goRegisterH5">立即入驻</span>
            </div>
        </div>
        <div v-show="!h5" class="merchantHome-pc">
            <head-nav :isLogin="false" :title="title" id="mainHeader"></head-nav>
            <div class="merchantHomeContainer">
                <img src="@/assets/global/body_01_pc.png" alt="">
                <span @click="goRegisterPC">商户入驻</span>
                <img src="@/assets/global/body_02_pc.png" alt="">
            </div>
            <!-- <div class="footer">
                <div class="footerContent">
                    <div class="qrcode">
                        <img style="display: block;width: 120PX;height: 120PX;margin-bottom: 8PX;" src="@/assets/globalPc/qrcode.png" alt="">
                        <span style="font-size: 12PX;color: #FFFFFF;">下载财税鱼APP</span>
                    </div>
                    <span class="line">Copyright 2019  |  杭州税牛科技有限公司  |  浙ICP备19028668号  |  <a href="https://res.caishuiyu.com/common/h5/privacy_agreement.html" style="text-decoration-line: none;color: #ffffff;">用户隐私协议</a>  |  All Rights Reserved</span>
                    <span class="line">E-mail：kf@taxlioner.com  |  地址：杭州市西湖区金色西溪商务中心B座</span>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import headNav from '@/components/merchantPC/headNav.vue'
import api from '@/api/apiH5'
import cookie from '@/utils/cookie'
import { config } from '@/utils/global.js'
import { Terminal } from '@/utils/global'
export default {
  name: 'merchantHome-h5',
  components: {
    headNav
  },
  data(){
    return{
        title: '',
        h5: false,
    }
  },
  created(){
    // if (Terminal.deviceInfo().deviceType == 'pc') {
    //     this.h5 = false
    // } else {
    //     this.h5 = true
    // }
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  methods: {
    goRegisterH5(){
        this.$router.push({ path: '/register-h5' })
    },
    goRegisterPC(){
        this.$router.push({ path: '/register-pc' })
    },
    resize() {
      let ww = window.innerWidth
      if(ww < 750) {
        this.h5 = true
      } else {
        this.h5 = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .merchantHome-h5{
        width: 100%;
        height: 100%;
        background: #fafafa;
    }

    .merchantHome-h5 img{
        width: 100%;
    }

    .merchantHome-h5 .merchantHome-footer{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 68px;
        background: #FFFFFF;
        box-shadow: 0 -8px 8px 0 rgba(0,0,0,0.04);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .merchantHome-h5 .merchantHome-footer .btn{
        display: block;
        width: 328px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: linear-gradient(135deg, #FF7F4A 0%, #FB5332 100%);
        box-shadow: 0 2px 4px 0 rgba(255,173,113,0.30);
        border-radius: 18px;
        font-size: 15px;
        color: #FFFFFF;
    }

    .merchantHome-pc{
        width: 100%;
        min-height: 100vh;
        .merchantHomeContainer{
            width: 100%;
            background: url('../../assets/global/bg.jpg') no-repeat;
            display: flex;
            flex-flow: column;
            align-items: center;
            background-size: 100% 400PX;
            img{
                display: block;
                width: 856PX;
            }
            span{
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
                margin-top: 16PX;
                margin-bottom: 16PX;
                cursor: pointer;
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
    
</style>
