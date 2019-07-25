<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/globalPc/logo.png" alt="">
    </div>
    <div class="merchantBtn">
      <div class="accountContent" @mouseenter="showBtnList = true" @mouseleave="showBtnList = false">
        <span style="font-size: 14PX;color: rgba(0,0,0,0.87);" class="userName">你好, (财税鱼账号{{ account }})</span>
        <img src="@/assets/globalPc/ic_arrow_dropdown@3x.png" alt="" srcset="">
        <div @mouseenter="showBtnList = true" @mouseleave="showBtnList = false" class="btnList" v-show="showBtnList == true">
          <div class="btnLine account">{{ account }}</div>
          <div class="btnLine">修改密码</div>
          <div class="btnLine">修改手机号</div>
          <div class="btnLine">退出</div>
        </div>
      </div>
      <button @click="goRegister" v-show="title == '商户入驻'">{{ title }}</button>
      <button @click="goLogin" v-show="title == '返回登录'">{{ title }}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'headNav',
  props: {
    title: String
  },
  data(){
    return {
      account: '187****7263',
      showBtnList: false
    }
  },
  created(){
    
  },
  methods: {
    goLogin(){
      this.$router.push('/login')
    },
    goRegister(){
      this.$router.push('/register-pc')
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  min-width: 1280PX;
  height: 80Px;
  background-color: #fff;
  border-bottom: 1Px solid rgba(0,0,0,0.12);
  font-size: 24Px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    width: 150Px;
    height: 40Px;
    margin-left: 24PX;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .merchantBtn {
    display: flex;
    align-items: center;
    margin-right: 28PX;
    .accountContent{
      display: flex;
      height: 36PX;
      align-items: center;
      margin-right: 16PX;
      cursor: pointer;
      position: relative;
      .btnList{
        position: absolute;
        bottom: -180PX;
        right: 0;
        width: 200PX;
        padding-top: 8PX;
        padding-bottom: 8PX;
        background: #FFFFFF;
        box-shadow: 0 4PX 16PX 0 rgba(0,0,0,0.26);
        border-radius: 4PX;
        .btnLine{
          width: 176PX;
          padding-left: 24PX;
          display: flex;
          align-items: center;
          height: 40PX;
          // justify-content: center;
          font-size: 14PX;
          color: rgba(0,0,0,0.87);
        }
        .account{
          color: rgba(0,0,0,0.26);
        }
      }
      img{
        display: block;
        width: 24PX;
        height: 24PX;
      }
    }
    button {
      width: 96Px;
      height: 36Px;
      border: 0;
      outline: none;
      cursor: pointer;
      background-image: linear-gradient(135deg, #FF7F4A 0%, #FB5332 100%);
      box-shadow: 0 2Px 4Px 0 rgba(255,173,113,0.30);
      border-radius: 4Px;
      font-family: PingFangSC-Medium;
      font-size: 15Px;
      color: #FFFFFF;
      text-align: center;
      line-height: 36Px;
    }
    button:hover {
      background: #000;
    }
  }
}
</style>
