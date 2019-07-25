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
      keepAlive: ['certification-h5', 'merchant-h5']
    }
  },
  created(){
    cookie.setCookie('uid', '15515268707')
    cookie.setCookie("sdktoken", "b3e8d33f9cfbc94f4ea0e8b41c41fb1c")
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
