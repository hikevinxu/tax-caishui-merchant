<template>
  <div class="home">
    <div class="container">
      <button @click="toChat">去聊天</button>
    </div>
  </div>
</template>
<script>

import { setCookie } from '@/utils/cookie.js'
export default {
  data(){
    return {

    }
  },
  methods: {
    toChat: function(){
      setCookie('uid', '15515268707')
      setCookie("sdktoken", "b3e8d33f9cfbc94f4ea0e8b41c41fb1c")
      window.open('./IM/im/main.html')
    }
  }
}
</script>
<style lang="scss">
.home {
  font-size: 48PX;
  .container {
    font-size: 24PX;
  }
}
</style>
