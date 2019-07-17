<template>
  <div class="addressInfo">
    <div class="address">
      <div class="title">
        地址信息
      </div>
      <div class="content">
        <div class="item info">
          <div class="itemTitle">公司地址</div>
          <div class="text">
            <p>浙江省杭州市</p>
            <p>双龙街199号金色西溪B座</p>
          </div>
        </div>
        <div class="item map">
          <div class="itemTitle">地图信息</div>
          <div class="map">

          </div>
        </div>
      </div>
      <div class="">

      </div>
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
.addressInfo {
  width: 100vw;
  height: 100vh;
  font-size: 48PX;
  .address {
    height: 426Px;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.04);
    overflow: hidden;
    .title {
      font-family: PingFangSC-Medium;
      font-size: 16Px;
      color: rgba(0,0,0,0.87);
      line-height: 22Px;
      margin-top: 24Px;
      margin-left: 32Px;
    }
    .content {
      box-sizing: border-box;
      height: 256Px;
      margin-top: 24Px;
      .item {
        float: left;
        box-sizing: border-box;
        width: 50%;
        height: 100%;
        padding: 0 32Px;
        .itemTitle {
          font-family: PingFangSC-Regular;
          font-size: 14Px;
          color: rgba(0,0,0,0.60);
          text-align: left;
          line-height: 20Px;
        }
        .text {
          font-family: PingFangSC-Regular;
          font-size: 14Px;
          color: #000000;
          text-align: left;
          line-height: 20Px;
          margin-top: 16Px;
          p {
            margin-top: 8Px;
          }
        }
        .map {
          background-color: green;
          height: 220Px;
          margin-top: 16Px;
        }
      }
      .info {
        border-right: 1Px solid rgba(0,0,0,0.08);
      }
    }
  }
}
</style>
