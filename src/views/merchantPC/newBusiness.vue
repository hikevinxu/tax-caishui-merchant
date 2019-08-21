<template>
  <div class="resetPc">
    <div class="resetPc_container">
        <head-nav :isLogin="false" :title="title" id="mainHeader"></head-nav>
        <div class="resetContent">
          <div class="resetForm">
            <h4>新业务申请</h4>
            <div class="inputBox">
              <span class="label">新业务名称</span>
              <input type="text" @input="phoneInput" v-model="name" placeholder="请输入申请添加的新业务名称">
            </div>
            <div class="inputBox">
              <span class="label">业务描述</span>
              <textarea @input="introduceInput" v-model="introduce" placeholder="请输入业务介绍或描述"></textarea>
            </div>
            <div class="inputBox">
              <span class="label">联系人</span>
              <input type="text" @input="contactsInput" v-model="contacts" placeholder="请输入联系人/称呼">
            </div>
            <div class="inputBox">
              <span class="label">联系电话</span>
              <input type="text" @input="phoneInput" v-model="phone" placeholder="请输入手机号或座机号">
            </div>
            <button class="next" :disabled="false" @click="reset">提交</button>
            <span class="explain">提交后财税鱼平台工作人员将跟进您的诉求</span>
          </div>
        </div>
        <div class="footer">
          <div class="footerContent">
            <div class="qrcode">
              <!-- <img style="display: block;width: 120PX;height: 120PX;margin-bottom: 8PX;" src="@/assets/globalPc/qrcode.png" alt=""> -->
              <!-- <span style="font-size: 12PX;color: #FFFFFF;">下载财税鱼APP</span> -->
            </div>
            <span class="line">Copyright 2019  |  杭州税牛科技有限公司  |  浙ICP备19028668号  |  <a href="https://res.caishuiyu.com/common/h5/privacy_agreement.html" style="text-decoration-line: none;color: #ffffff;">用户隐私协议</a>  |  All Rights Reserved</span>
            <span class="line">  地址：杭州市西湖区金色西溪商务中心B座</span>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import headNav from '@/components/merchantPC/headNav.vue'
import Vue from 'vue'
import api from '@/api/api'
import cookie from '@/utils/cookie'
import { config } from '@/utils/global.js'
import qs from 'qs'
export default {
  name: 'reset',
  components: {
    headNav
  },
  data(){
    return {
      title: '返回首页',
      name: '',
      phone: '',
      contacts: '',
      introduce: '',
    }
  },
  created(){
    
  },
  methods: {
    phoneInput(e){
        
    },
    introduceInput(e){
      
    },
    contactsInput(e){
      
    },
    reset(){
      console.log(this.name)
      if(this.name == ''){
        this.$message({
          message: '新业务名称不能为空',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return 
      }
      if(!this.phone.match(/(0\d{2,3}(-)?)?\d{7,8}/) && !this.phone.match(/^(0|86|17951)?1[0-9]{10}$/)){
        this.$message({
          message: '联系电话格式不正确',
          type: 'error',
          showClose: true,
          duration: 1000
        })
        return 
      }
      let data = {
        name: this.name,
        introduce: this.introduce,
        contacts: this.contacts,
        phone: this.phone
      }
      data = qs.stringify(data)
      api.newBusinessSave(data).then(res => {
        console.log(res)
        if(res.code == 0){
          this.$message({
            message: '提交新业务成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
        }
        this.name = ''
      })
    } 
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
            width: 80PX;
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
          textarea{
            width: 300PX;
            padding-left: 16PX;
            background: #FAFAFA;
            border-radius: 4PX;
            display: block;
            outline: none;
            border: none;
            padding-top: 16PX;
            min-height: 132PX;
            line-height: 18PX;
            color: rgba(0,0,0,0.87);
            font-size: 14PX;
            resize: none;
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
            margin-left: 14PX;
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
          width: 216PX;
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
