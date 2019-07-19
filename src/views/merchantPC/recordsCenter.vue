<template>
  <div class="recordsCenter">
    <div class="data selectMonth">
      <div class="title">每月数据</div>
    </div>
    <div class="data dateData">
      <div class="title">每日数据</div>
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
.recordsCenter {
  width: 100vw;
  height: 100vh;
  font-size: 16PX;
  display: flex;
  flex-direction: column;
  padding-bottom: 32Px;
  .data {
    .title {
      margin-top: 24Px;
      margin-left: 32Px;
      font-family: PingFangSC-Medium;
      font-size: 16Px;
      color: rgba(0,0,0,0.87);
      line-height: 22Px;
    }
  }
  .selectMonth {
    width: 100%;
    height: 306Px;
    background: #FFFFFF;
    box-shadow: 0 4Px 8Px 0 rgba(0,0,0,0.04);
  }
  .dateData {
    width: 100%;
    flex: 1;
    margin-top: 16Px;
    background: #FFFFFF;
    box-shadow: 0 4Px 8Px 0 rgba(0,0,0,0.04);
  }
}
</style>
