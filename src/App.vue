<template>
  <div id="app">
    <keep-alive :include="keepAlive">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import cookie from '@/utils/cookie.js'
export default {
  data () {
    return {
      keepAlive: ['certification-h5', 'merchant-h5', 'certification-pc']
    }
  },
  created(){
    cookie.setCookie('uid', '22c7c89039ea4b0fbbcdc29c4ea92f6f')
    cookie.setCookie("sdktoken", "7b845f4716fdfb2410f65297de41cdaf")
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 16px;
}

img{
  pointer-events: none;
}
</style>
