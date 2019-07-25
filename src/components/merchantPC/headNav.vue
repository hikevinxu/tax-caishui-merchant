<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/globalPc/logo.png" alt="">
    </div>
    <div class="merchantBtn">
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
  height: 80Px;
  background-color: #fff;
  border-bottom: 1Px solid rgba(0,0,0,0.12);
  font-size: 24Px;
  .logo {
    float: left;
    width: 160Px;
    height: 40Px;
    margin: 20Px 0 0 24Px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .merchantBtn {
    float: right;
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
      margin-top: 22Px;
      margin-right: 28Px;
      line-height: 36Px;
    }
    button:hover {
      background: #000;
    }
  }
}
</style>
