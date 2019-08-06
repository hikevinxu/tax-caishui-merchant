<template>
  <div class="404">
    <div class="error404" v-if="currentDevice == 'phone'">
      <div class="picInfo">
        <img src="@/assets/error/empty.png" alt="">
      </div>
      <div class="info">
        您要访问的页面已丢失
      </div>
    </div>
    <div class="http404-pc" v-else> 
      <div class="http404">
        <div class="title">估计你把网址打错了</div>
        <div class="check">请检查你输入的网址是否正确</div>
        <div class="warning">可点击以下按钮返回正确网址</div>
        <div class="backBtn">
          <el-button type="primary" @click="goHome">返回商户中心</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error404',
  data(){
    return {
      currentDevice: 'pc'
    }
  },
  computed: {
    message() {
      return '网管说这个页面你不能进......'
    }
  },
  created(){
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  methods: {
    goBack () {
      window.history.back()
    },
    goHome(){
      this.$router.push('/home')
    },
    resize() {
      let ww = window.innerWidth
      if(ww < 750) {
        this.currentDevice = 'phone'
      } else {
        this.currentDevice = 'pc'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.error404 {
  .header {
    height: 56px;
    line-height: 56px;
    font-weight: 500;
    background-color: #fff;
    .back {
      position: absolute;
      top: 0;
      left: 0;
      width: 24px;
      height: 24px;
      margin-top: 16px;
      margin-left: 16px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .picInfo {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    margin-top: 20px;
    color: #858b9c;
    text-align: center;
  }
}
.http404-pc {
  width: 100vw;
  min-width: 1080Px;
  height: 100vh;
  background: url('../../assets/404_images/404_image.png') no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  .http404 {
    position: absolute;
    top: 300Px;
    right: 25%;
    font-size: 23Px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51,51,51,1);
    line-height: 30Px;
    .check {
      font-size: 14Px;
      margin-top: 17Px;
      font-family: PingFangSC-Regular;
      font-weight:400;
      color: rgba(153,153,153,1);
      line-height: 30Px;
    }
    .warning{ 
      margin-top: 60Px;
      font-size: 11Px;
      font-family: PingFangSC-Light;
      font-weight: 300;
      color: rgba(153,153,153,1);
      line-height: 30Px;
    }
    .backBtn {
      width: 113PX;
      height: 34Px;
      margin-top: 21PX;
      .el-button--primary {
        background: linear-gradient(0deg,rgba(255,109,75,1) 0%,rgba(255,147,112,1) 100%);
        box-shadow: 4Px 4Px 15Px 1Px rgba(255,137,102,0.46);
        border-radius: 17Px;
        border: none;
      }
    }
  }
}
</style>
