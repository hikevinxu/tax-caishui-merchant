<template>
  <div class="401">
    <div class="error404" v-if="currentDevice == 'phone'">
      <div class="picInfo">
        <img src="@/assets/error/network.png" alt="">
      </div>
      <div class="info">
        网络连接异常
      </div>
    </div>
    <div class="errPage-container" v-else>
      <el-button icon="arrow-left" class="pan-back-btn" @click="back">返回</el-button>
      <el-row>
        <el-col :span="12">
          <h1 class="text-jumbo text-ginormous">Oops!</h1>
          gif来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a> 页面
          <h2 style="font-size: 24Px; margin: 30Px 0;">你没有权限去该页面</h2>
          <h6>如有不满请联系你领导</h6>
          <ul class="list-unstyled">
            <li>或者你可以去:</li>
            <li class="link-type">
              <router-link to="/dashboard">回首页</router-link>
            </li>
            <li class="link-type"><a href="https://www.taobao.com/">随便看看</a></li>
            <li><a href="#" @click.prevent="dialogVisible=true">点我看图</a></li>
          </ul>
        </el-col>
        <el-col :span="12">
          <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
        </el-col>
      </el-row>
      <el-dialog :visible.sync="dialogVisible" title="随便看">
        <img :src="ewizardClap" class="pan-img">
      </el-dialog>
    </div>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'
export default {
  name: 'error401',
  data() {
    return {
      currentDevice: 'pc',
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
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
    resize() {
      let ww = window.innerWidth
      if(ww < 750) {
        this.currentDevice = 'phone'
      } else {
        this.currentDevice = 'pc'
      }
    },
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
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
.errPage-container {
  width: 800Px;
  max-width: 100%;
  margin: 100Px auto;
  font-size: 16Px;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none!important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60Px;
    font-weight: 700;
    color: #484848;
    margin: 40Px 0;
  }
  .list-unstyled {
    font-size: 14Px;
    li {
      padding-bottom: 5Px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
