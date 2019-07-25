<template>
  <div class="resetPc">
    <div class="resetPc_container">
        <head-nav :title="title" id="mainHeader"></head-nav>
        <div class="resetContent">
          <div class="resetForm">
            <h4>重置登录密码</h4>
            <div class="inputBox">
              <span class="label">财税鱼账号</span>
              <input type="text" v-model="phone" placeholder="请输入需重置密码的账号(手机号)">
            </div>
            <div class="inputBox">
              <span class="label">验证</span>
              <input type="text"  placeholder="请输入需重置密码的账号(手机号)">
            </div>
            <div class="inputBox">
              <span class="label">新密码</span>
              <input type="text" v-model="phone" placeholder="请输入需重置密码的账号(手机号)">
            </div>
            <div class="inputBox">
              <span class="label">确认密码</span>
              <input type="text" v-model="phone" placeholder="请输入需重置密码的账号(手机号)">
            </div>
            <button class="next" :disabled="disabled">重置</button>
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

export default {
  name: 'reset',
  components: {
    headNav
  },
  data(){
    return {
      title: '返回登录',
      phone: '',
      disabled: false
    }
  },
  methods: {
    
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
