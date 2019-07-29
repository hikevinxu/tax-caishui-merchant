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
    <div class="wscn-http404-container" v-else> 
      <div class="wscn-http404">
        <div class="pic-404">
          <img class="pic-404__parent" src="@/assets/404_images/404.png" alt="404">
          <img class="pic-404__child left" src="@/assets/404_images/404_cloud.png" alt="404">
          <img class="pic-404__child mid" src="@/assets/404_images/404_cloud.png" alt="404">
          <img class="pic-404__child right" src="@/assets/404_images/404_cloud.png" alt="404">
        </div>
        <div class="bullshit">
          <div class="bullshit__oops">OOPS!</div>
          <div class="bullshit__info">版权所有
            <a class="link-type" href="https://wallstreetcn.com" target="_blank">华尔街见闻</a>
          </div>
          <div class="bullshit__headline">{{ message }}</div>
          <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
          <a @click="goHome" class="bullshit__return-home">返回首页</a>
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
.wscn-http404-container{
  transform: translate(-50%,-50%);
  position: absolute;
  top: 40%;
  left: 50%;
}
.wscn-http404 {
  position: relative;
  width: 1200Px;
  padding: 0 50Px;
  overflow: hidden;
  .pic-404 {
    position: relative;
    float: left;
    width: 600Px;
    overflow: hidden;
    &__parent {
      width: 100%;
    }
    &__child {
      position: absolute;
      &.left {
        width: 80Px;
        top: 17Px;
        left: 220Px;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      &.mid {
        width: 46Px;
        top: 10Px;
        left: 420Px;
        opacity: 0;
        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }
      &.right {
        width: 62Px;
        top: 100Px;
        left: 500Px;
        opacity: 0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      @keyframes cloudLeft {
        0% {
          top: 17Px;
          left: 220Px;
          opacity: 0;
        }
        20% {
          top: 33Px;
          left: 188Px;
          opacity: 1;
        }
        80% {
          top: 81Px;
          left: 92Px;
          opacity: 1;
        }
        100% {
          top: 97Px;
          left: 60Px;
          opacity: 0;
        }
      }
      @keyframes cloudMid {
        0% {
          top: 10Px;
          left: 420Px;
          opacity: 0;
        }
        20% {
          top: 40Px;
          left: 360Px;
          opacity: 1;
        }
        70% {
          top: 130Px;
          left: 180Px;
          opacity: 1;
        }
        100% {
          top: 160Px;
          left: 120Px;
          opacity: 0;
        }
      }
      @keyframes cloudRight {
        0% {
          top: 100Px;
          left: 500Px;
          opacity: 0;
        }
        20% {
          top: 120Px;
          left: 460Px;
          opacity: 1;
        }
        80% {
          top: 180Px;
          left: 340Px;
          opacity: 1;
        }
        100% {
          top: 200Px;
          left: 300Px;
          opacity: 0;
        }
      }
    }
  }
  .bullshit {
    position: relative;
    float: left;
    width: 300Px;
    padding: 30Px 0;
    overflow: hidden;
    &__oops {
      font-size: 32Px;
      font-weight: bold;
      line-height: 40Px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20Px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20Px;
      line-height: 24Px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10Px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13Px;
      line-height: 21Px;
      color: grey;
      opacity: 0;
      margin-bottom: 30Px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      width: 110Px;
      height: 36Px;
      background: #1482f0;
      border-radius: 100Px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14Px;
      line-height: 36Px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60Px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
