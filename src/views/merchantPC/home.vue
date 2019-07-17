<template>
  <div class="homePc">
      <div class="basics">
        <div class="basics_title">
          <h4>基本资料</h4>
          <div class="compile">
            <span>基本资料维护</span>
            <img src="@/assets/globalPc/ic_chevron_right_small@3x.png" alt="">
          </div>
        </div>
        <div class="basicContent">
          <div class="company">
            <div class="logo">
              <img src="@/assets/globalPc/qrcode.png" alt="" class="compay_logo">
              <img class="tagImg" src="@/assets/globalPc/ic_list_tag.png" alt="">
            </div>
            <div class="information">
              <h2 class="name">杭州税牛科技有限公司</h2>
              <div class="tagList">
                <span class="tag" v-for="(item,index) in tagList" :key="index">{{ item }}</span>
              </div>
              <div class="infoLine">
                <img src="@/assets/globalPc/firm_ic_time@3x.png" alt="">
                <span>服务时间 | 工作日 9:00～18:00</span>
              </div>
              <div class="infoLine">
                <img src="@/assets/globalPc/firm_ic_address@3x.png" alt="">
                <span>浙江省杭州市西湖区双龙街199号金色西溪B座8楼</span>
              </div>
              <div class="infoLine">
                <img src="@/assets/globalPc/firm_ic_phone@3x.png" alt="">
                <span>0571-29282111    0571-29298980</span>
              </div>
            </div>
          </div>
          <div class="company_img_list">
            <div class="img_content">
              <div class="img" v-for="(item,index) in imgList" :key="index">
                <img :src="item.src" alt="" srcset="">
              </div>
              <div class="bg"></div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { setCookie } from '@/utils/cookie.js'
export default {
  data(){
    return {
      tagList: ['12年知名品牌','专业团队','屎霸贾亚洲','上班按摩陈立农'],
      imgList: [
        {src: require('../../assets/globalPc/bg_slide1.jpg')},
        {src: require('../../assets/globalPc/bg_slide1.jpg')},
        {src: require('../../assets/globalPc/bg_slide1.jpg')},
        {src: require('../../assets/globalPc/bg_slide1.jpg')},
        {src: require('../../assets/globalPc/bg_slide1.jpg')}
        ]
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
  .homePc {
      width: 100vw;
      height: 100vh;
      font-size: 48PX;
      .basics {
        width: 98%;
        min-width: 1040PX;
        height: 199PX;
        background: #ffffff;
        box-shadow: 0 4PX 8PX 0 rgba(0,0,0,0.04);
        padding-bottom: 40PX;
        padding-top: 23PX;
        .basics_title{
          width: 93.84%;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          h4{
            font-size: 16PX;
            color: rgba(0,0,0,0.87);
          }
          .compile{
            width: 108PX;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 16PX;
            border-left: 1PX solid rgba(0,0,0,0.12);
            font-size: 12PX;
            color: rgba(0,0,0,0.60);
            cursor: pointer;
            img{
              display: block;
              width: 16PX;
              height: 16PX;
            }
          }
        }
        .basicContent{
          width: 93.84%;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20PX;
          .company{
            width: 50%;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            border-right: 1PX solid rgba(0,0,0,0.08);
            .logo{
              position: relative;
              width: 72PX;
              height: 72PX;
              margin-right: 24PX;
              .tagImg{
                display: block;
                position: absolute;
                width: 24PX;
                height: 24PX;
                top: -4PX;
                left: 0;
              }
              .compay_logo{
                width: 100%;
                height: 100%;
                display: block;
              }
            }
            .information{
              width: 352PX;
              .name{
                font-size: 20PX;
                color: rgba(0,0,0,0.87);
                display: block;
                width: 100%;
                text-align: left;
                margin-bottom: 8PX;
              }
              .tagList{
                display: flex;
                width: 100%;
                flex-wrap: wrap;
                .tag{
                  padding: 2PX 4PX 2PX 4PX;
                  // opacity: 0.26;
                  background: rgba(255,173,113,.26);
                  border-radius: 2PX;
                  font-size: 11PX;
                  color: #FEA25F;
                  margin-bottom: 8PX;
                  margin-right: 4PX;
                }
              }
              .infoLine{
                display: flex;
                width: 100%;
                align-items: center;
                justify-content: flex-start;
                font-size: 14PX;
                color: rgba(0,0,0,0.60);
                margin-top: 8PX;
                img{
                  display: block;
                  width: 16PX;
                  height: 16PX;
                  margin-right: 8PX;
                }
              }
            }
          }
          .company_img_list{
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .img_content{
              position: relative;
              width: 85%;
              display: flex;
              align-items: center;
              overflow-x: auto;
              flex-wrap: nowrap;
              justify-content: flex-start;
              .img{
                flex: none;
                width: 120PX;
                height: 80PX;
                border-radius: 4PX;
                // background: #FEA25F;
                margin-right: 8PX;
                img{
                  display: block;
                  width: 120PX;
                  height: 80PX;
                  border-radius: 4PX;
                }
              }
            }
            .img_content::-webkit-scrollbar {
              display: none;
            }
          }
        }
      }
  }
</style>
