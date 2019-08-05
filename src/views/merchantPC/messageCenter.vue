<template>
  <div class="messageCenter">
    <iframe class="chatIfream" src="./IM/im/main.html" frameborder="0"></iframe>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  data(){
    return {

    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo(){
      api.companyInfo().then(res => {})
    },
  }
}
</script>
<style lang="scss">
.messageCenter {
  height: 100vh;
  // width: 100vw;
  padding-bottom: 40Px;
  .chatIfream {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  .chatIfream::-webkit-scrollbar {
    display: none;
  }
}
.messageCenter::-webkit-scrollbar {
    display: none;
  }
</style>
