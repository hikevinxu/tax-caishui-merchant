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
              <img :src="logo" alt="" class="compay_logo">
              <img class="tagImg" src="@/assets/globalPc/ic_list_tag.png" alt="">
            </div>
            <div class="information">
              <h2 class="name">{{ name }}</h2>
              <div class="tagList">
                <span class="tag" v-for="(item,index) in brandTags" :key="index">{{ item }}</span>
              </div>
              <div class="infoLine">
                <img src="@/assets/globalPc/firm_ic_time@3x.png" alt="">
                <span>{{ workTime }}</span>
              </div>
              <div class="infoLine">
                <img src="@/assets/globalPc/firm_ic_address@3x.png" alt="">
                <span>{{ adress }}</span>
              </div>
              <div class="infoLine">
                <img src="@/assets/globalPc/firm_ic_phone@3x.png" alt="">
                <span style="margin-right: 8PX" v-for="(item,index) in phones" :key="index">{{item}}</span>
              </div>
            </div>
          </div>
          <div class="company_img_list">
            <div class="img_content">
              <div class="imgBox">
                <div class="img" v-for="(item,index) in publicityImgs" :key="index">
                  <img :src="item.img" alt="" srcset="">
                </div>
              </div>
              <div class="bg"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="data">
        <div class="data_title">
          <h4>当月数据</h4>
          <div class="compile">
            <span>查看更多数据</span>
            <img src="@/assets/globalPc/ic_chevron_right_small@3x.png" alt="">
          </div>
        </div>
        <div class="dataContent">
          <div class="dataBox">
            <span class="data_number">{{ statisicData.phoneCount }}</span>
            <div class="data_text">
              <img src="@/assets/globalPc/ic_b_data_phone.png" alt="">
              <span>电话咨询量</span>
            </div>
          </div>
          <div class="dataBox center">
            <span class="data_number">{{ statisicData.imCount }}</span>
            <div class="data_text">
              <img src="@/assets/globalPc/ic_b_data_im.png" alt="">
              <span>IM咨询量</span>
            </div>
          </div>
          <div class="dataBox">
            <span class="data_number" style="color: #5AB3A4;">{{ statisicData.viewCount }}</span>
            <div class="data_text">
              <img src="@/assets/globalPc/ic_b_data_view.png" alt="">
              <span>浏览量</span>
            </div>
          </div>
        </div>
      </div>
      <div class="new">
        <div class="container">
          <div class="new_title">
            <h4>商家新鲜事</h4>
            <span class="date">编辑与{{ notice.modifyTime }}</span>
          </div>
          <div class="newContent" @click="edit = true">
            <p v-show="!edit">{{ notice.content }}</p>
            <textarea v-show="edit" class="text" v-model="notice.content" name="" id="" cols="30" rows="10"></textarea>
          </div>
          <span v-show="edit" slot="footer" class="dialog-footer">
            <el-button type="success" @click="save()">保存</el-button>
            <el-button @click="edit = false">取消</el-button>
          </span>
        </div>
      </div>
  </div>
</template>
<script>
import { setCookie } from '@/utils/cookie.js'
import api from '@/api/api'
export default {
  data(){
    return {
      name: '',
      logo: '',
      brandTags: [],
      adress: '',
      workTime: '',
      phones: [],
      publicityImgs: [
      ],
      statisicData: {},
      notice: {},
      edit: false
    }
  },
  created(){
    this.getInfo()
    this.getIm()
  },
  methods: {
    getInfo(){
      api.companyInfo().then(res => {
        console.log(res)
        if(res.code == 0){
          let data = res.data
          this.name = data.name
          this.brandTags = data.brandTags
          this.adress = data.address
          this.workTime = data.workTime
          this.phones = data.phones
          this.logo = data.logo
          this.publicityImgs = data.publicityImgs
          this.notice = data.notice
        }
      })
    },
    getIm(){
      let times = new Date().getTime();
      let time = this.msToDate(times).withoutTime
      let data = {
        time: time,
        type: 'month'
      }
      api.statisic(data).then(res => {
        console.log(res)
        if(res.code == 0){
          let data = res.data
          this.statisicData = data
        } 
      })
    },
    msToDate (msec) {
        let datetime = new Date(msec);
        let year = datetime.getFullYear();
        let month = datetime.getMonth();
        let date = datetime.getDate();
        let hour = datetime.getHours();
        let minute = datetime.getMinutes();
        let second = datetime.getSeconds();
        let result1 = year + 
                    '-' + 
                    ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + 
                    '-' + 
                    ((date + 1) < 10 ? '0' + date : date) + 
                    ' ' + 
                    ((hour + 1) < 10 ? '0' + hour : hour) +
                    ':' + 
                    ((minute + 1) < 10 ? '0' + minute : minute) + 
                    ':' + 
                    ((second + 1) < 10 ? '0' + second : second);

        let result2 = year + 
                    '-' + 
                    ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + 
                    '-' + 
                    ((date + 1) < 10 ? '0' + date : date);

        let result = {
            hasTime: result1,
            withoutTime: result2
        };

        return result;
    },
    save(){
      
      let data = {
        content: this.notice.content
      }
      console.log(data)
      api.noticeUpdate(data).then(res => {
        console.log(res)
        if(res.code == 0){
          this.$message({
            message: '保存成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.edit = false
          this.getInfo()
        }else{
          this.$message({
            message: '保存失败',
            type: 'error',
            showClose: true,
            duration: 1000
          })
          this.edit = false
          this.getInfo()
        }
      })
    },
  }
}
</script>
<style lang="scss">
  .homePc {
      width: 100vw;
      height: 100vh;
      padding-bottom: 30PX;
      .basics {
        width: 100%;
        min-width: 1040PX;
        height: 199PX;
        background: #ffffff;
        box-shadow: 0 4PX 8PX 0 rgba(0,0,0,0.04);
        padding-bottom: 40PX;
        padding-top: 23PX;
        margin-bottom: 16PX;
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
                margin-top: 16PX;
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
              .imgBox{
                width: 100%;
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
              .imgBox::-webkit-scrollbar {
                display: none;
              }
              .bg{
                width: 40PX;
                height: 100PX;
                position: absolute;
                top: -10PX;
                right: 0;
                background: linear-gradient(270deg, #FFFFFF 0%, rgba(255,255,255,0.00) 100%);
              }
            }  
          }
        }
      }
      .data{
        width: 100%;
        min-width: 1040PX;
        height: 127PX;
        background: #ffffff;
        box-shadow: 0 4PX 8PX 0 rgba(0,0,0,0.04);
        padding-bottom: 48PX;
        padding-top: 23PX;
         margin-bottom: 16PX;
        .data_title{
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
        .dataContent{
          width: 93.84%;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 24PX;
          .dataBox{
            width: 33.33%;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            height: 96PX;
            .data_number{
              font-size: 30PX;
              color: #FF7F4A;
              margin-bottom: 8PX;
            }
            .data_text{
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14PX;
              color: rgba(0,0,0,0.60);
              img{
                display: block;
                width: 16PX;
                height: 16PX;
                margin-right: 8PX;
              }
            }
          }
          .center{
            border-left: 1PX solid rgba(0,0,0,0.08);
            border-right: 1PX solid rgba(0,0,0,0.08);
          }
        }
      }
      .new{
        width: 100%;
        min-width: 1040PX;
        min-height: 144PX;
        background: #ffffff;
        box-shadow: 0 4PX 8PX 0 rgba(0,0,0,0.04);
        padding-bottom: 16PX;
        padding-top: 24PX;
        .container{
          width: 93.84%;
          margin-left: auto;
          margin-right: auto;
          .new_title{
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24PX;
            h4{
              font-size: 16PX;
              color: rgba(0,0,0,0.87);
            }
            .date{
              font-size: 12PX;
              color: rgba(0,0,0,0.38);
            }
          }
          .newContent{
            width: 50%;
            padding-top: 24PX;
            padding-bottom: 20PX;
            height: 64PX;
            background: #FAFAFA;
            border-radius: 4PX;
            overflow-y: auto;
            p{
              display: block;
              width: 90%;
              height: 100%;
              margin-left: auto;
              margin-right: auto;
              font-size: 14PX;
              color: rgba(0,0,0,0.60);
              line-height: 18PX;
            }
            .text{
              display: block;
              width: 90%;
              height: 100%;
              margin-left: auto;
              margin-right: auto;
              font-size: 14PX;
              color: rgba(0,0,0,0.60);
              line-height: 18PX;
              outline: none;
              resize: none;
              border: none;
              background: #FAFAFA;
            }
          }
          .dialog-footer{
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 16PX;
          }
        }
      }
  }
</style>
