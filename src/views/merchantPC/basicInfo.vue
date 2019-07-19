<template>
  <div class="basicInfo">
    <div class="basic">
      <h4>基本信息</h4>
      <div class="basicContent" v-show="!compile">
          <div class="infoContent">
            <div class="line">
              <span class="label">公司名称</span>
              <span class="content">{{ company }}</span>
            </div>
            <div class="line">
              <span class="label">公司LOGO</span>
              <div class="img">
                <img :src="companyLogo" alt="" srcset="">
              </div>
            </div>
            <div class="line">
              <span class="label">工作时间</span>
              <span class="content">{{ companyDate }}</span>
            </div>
            <div class="line">
              <span class="label">联系电话</span>
              <!-- <span class="content">{{ phone }}</span> -->
              <div class="phoneList">
                <span class="phone" v-for="(item,index) in phoneList" :key="index">{{item.phone}}</span>
              </div>
            </div>
            <div class="line">
              <span class="label">品牌标签</span>
              <div class="tagList">
                <span class="tag" v-for="(item,index) in tag" :key="index">{{item.tag}}</span>
              </div>
            </div>
          </div>
          <div class="introduction">
            <span class="label">公司介绍</span>
            <p>多年的发展，公司已成为集研发、销售、生产和服务于一体的现代高科技企业，在北京、深圳等地拥有多家子公司，构筑了面向全国的经营和服务网络，涵盖智能建筑、信息化、信息安全、云计算与大数据、智慧化应用、网络可视化和特种通信等业务领域，涉及政府、公安、检察院、司法、文教、交通、能源、金融、电信和企业等行业应用。</p>
          </div>
          <span class="compile" @click="compile = true">编辑信息</span>
      </div>
      <div class="basicContent" v-show="compile">
        <div class="infoContent">
          <div class="line oneline">
            <span class="label">公司名称</span>
            <div class="inputBox">
              <input type="text" @input="nameInput" v-model="company">
            </div>
          </div>
          <div class="line">
            <span class="label">公司LOGO</span>
              <div class="imgContent">
                <img :src="companyLogo" alt="" srcset="">
                <span class="logo">上传</span>
              </div>
          </div>
          <div class="line oneline">
            <span class="label">工作时间</span>
            <div class="inputBox">
              <input type="text" @input="nameInput" v-model="companyDate">
            </div>
          </div>
          <div class="line">
            <span class="label">联系电话</span>
            <div class="phoneContent">
              <div class="inputBox phone" v-for="(item,index) in phoneList" :key="index">
                <input type="text" v-model="item.phone">
              </div>
              <span class="add" @click="add">添加</span>
            </div>
          </div>
          <div class="line">
            <span class="label">联系电话</span>
            <div class="tagContent">
              <div class="inputBox tagInput" v-for="(item,index) in tag" :key="index">
                <input type="text" v-model="item.tag">
              </div>
            </div>
          </div>
        </div>
        <div class="introduction">
          <span class="label">公司介绍</span>
          <textarea class="introduceInput" v-model="introduce" name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="saveContent">
          <span class="cancel" @click="compile = false">取消</span>
          <span class="save" @click="save">保存</span>
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
      company: '杭州税牛科技有限公司',
      companyLogo: require('../../assets/globalPc/qrcode.png'),
      companyDate: '工作日9:00～18:00',
      tag: [
        {tag:'12年知名品牌'},
        {tag:'12年知名品牌'}
      ],
      introduce: '多年的发展，公司已成为集研发、销售、生产和服务于一体的现代高科技企业，在北京、深圳等地拥有多家子公司，构筑了面向全国的经营和服务网络，涵盖智能建筑、信息化、信息安全、云计算与大数据、智慧化应用、网络可视化和特种通信等业务领域，涉及政府、公安、检察院、司法、文教、交通、能源、金融、电信和企业等行业应用。',
      phone: '0571-928378176',
      compile: false,
      phoneList: [
        {
          phone: '0571-928378176'
        },
        {
          phone: '0571-928378176'
        }
      ]
    }
  },
  methods: {
    nameInput(){},
    add(){
      let json = {
        phone: ''
      }
      if(this.phoneList.length >=3){
        console.log(this.phoneList)
      }else{
        this.phoneList.push(json)
      }
    },
    save(){
      this.compile = false
      console.log(this.phoneList)
    }
  }
}
</script>
<style lang="scss">
.basicInfo{
  width: 100vw;
  height: 100vh;
  .basic{
    width: 100%;
    min-width: 1040PX;
    min-height: 380PX;
    background: #ffffff;
    box-shadow: 0 4PX 8PX 0 rgba(0,0,0,0.04);
    padding-bottom: 40PX;
    padding-top: 23PX;
    margin-bottom: 16PX;
    h4{
      font-size: 16PX;
      color: rgba(0,0,0,0.87);
      display: block;
      text-align: left;
      width: 93.84%;
      margin-left: auto;
      margin-right: auto;
    }
    .basicContent{
      width: 93.84%;
      margin-top: 24PX;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      .infoContent{
        width: 50%;
        border-right: 1PX solid rgba(0,0,0,0.08);
        .line{
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          margin-bottom: 24PX;
          .label{
            display: block;
            width: 70PX;
            margin-right: 38PX;
            font-size: 14PX;
            color: rgba(0,0,0,0.60);
            height: 40PX;
            // line-height: 40PX;
          }
          .img{
            width: 72PX;
            height: 72PX;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .content{
            font-size: 14PX;
            color: #000000;
            height: 40PX;
            // line-height: 40PX;
          }
          .tagList{
            width: 380PX;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-wrap: wrap;
            height: 40PX;
            .tag{
              padding: 2PX 4PX 2PX 4PX;
              font-size: 11PX;
              color: #000000;
              border: 1PX solid rgba(0,0,0,0.60);
              border-radius: 2PX;
              margin-right: 8PX;
            }
          }
          .phoneList{
            width: 380PX;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-wrap: wrap;
            height: 40PX;
            .phone{
              padding: 2PX 4PX 2PX 4PX;
              font-size: 14PX;
              color: #000000;
              border: 1PX solid rgba(0,0,0,0.60);
              border-radius: 2PX;
              margin-right: 8PX;
            }
          }
          .inputBox{
            width: 356PX;
            height: 40PX;
            background: #FAFAFA;
            border-radius: 4PX;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            input{
              display: block;
              width: 92%;
              height: 40PX;
              line-height: 40PX;
              outline: none;
              border: none;
              background: #FAFAFA;
              font-size: 14PX;
              color: #000000;
              margin-left: 16PX;
            }
          }
          .phone,.tagInput{
            margin-bottom: 8PX !important;
          }
          .imgContent{
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            img{
              display: block;
              width: 72PX;
              height: 72PX;
              margin-right: 16PX;
            }
            .logo{
              border: 1PX solid #5AB3A4;
              border-radius: 2PX;
              width: 48PX;
              height: 24PX;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12PX;
              color: #5AB3A4;
              cursor: pointer;
            }
          }
          .phoneContent .add{
            border: 1PX solid #5AB3A4;
            border-radius: 2PX;
            width: 48PX;
            height: 24PX;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12PX;
            color: #5AB3A4;
            cursor: pointer;
          }
        }
      }
      .introduction{
        width: 50%;
        max-height: 500PX;
        .label{
          display: block;
          margin-left: 32PX;
          font-size: 14PX;
          color: rgba(0,0,0,0.60);
          margin-bottom: 16PX;
        }
        p{
          display: block;
          width: 90%;
          margin-left: 32PX;
          font-size: 14PX;
          color: #000000;
          line-height: 24PX;
        }
        .introduceInput{
          width: 90%;
          background: #FAFAFA;
          border-radius: 4PX;
          outline: none;
          display: block;
          border: none;
          padding: 16PX;
          min-height: 156PX;
          max-height: 256PX;
          font-size: 14PX;
          color: #000000;
          margin-left: 32PX;
          resize:none;
        }
      }
      .compile{
        display: block;
        position: absolute;
        bottom: -24PX;
        right: 20PX;
        width: 96PX;
        height: 36PX;
        line-height: 36PX;
        text-align: center;
        font-size: 15PX;
        color: #FFFFFF;
        cursor: pointer;
        background: #5AB3A4;
        border-radius: 4PX;
      }
      .saveContent{
        display: flex;
        align-items: center;
        position: absolute;
        bottom: -24PX;
        right: 20PX;
        .save{
          display: block;
          width: 96PX;
          height: 36PX;
          line-height: 36PX;
          text-align: center;
          font-size: 15PX;
          color: #FFFFFF;
          cursor: pointer;
          background: #FF7F4A;
          border-radius: 4PX;
        }
        .cancel{
          display: block;
          width: 96PX;
          height: 36PX;
          line-height: 36PX;
          text-align: center;
          font-size: 15PX;
          color: rgba(0,0,0,0.87);
          cursor: pointer;
          background: #ffffff;
          border-radius: 4PX;
          margin-right: 24PX;
          border: 1PX solid rgba(0,0,0,0.38);
        }
      }
      
    }
  }
}
</style>
