<template>
  <div class="home" @click="toChat">
    messageCenter
  </div>
</template>
<script>

import { setCookie } from '@/utils/cookie.js'
export default {
  data(){
    return {

    }
  },
  created() {
    console.log(this.$store.state)
  },
  methods: {
    toChat: function(){
      setCookie('uid', '15515268707')
      setCookie("sdktoken", "b3e8d33f9cfbc94f4ea0e8b41c41fb1c")
      window.location.href = window.location.protocol+"//"+window.location.host + '/IM/im/main.html'
    }
  }
}
</script>
<style lang="scss">
.home {
  width: 100vw;
  height: 100vh;
  font-size: 48PX;
  .container {
    width: 100%;
    height: 100%;
    font-size: 36PX;
    .slide_menu {
      width: 200Px;
      height: 100%;
    }
  }
}
</style>
