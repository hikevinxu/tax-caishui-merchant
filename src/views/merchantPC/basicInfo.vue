<template>
  <div class="basicInfo">
    <div class="basic">
      <h4>基本信息</h4>
      <div class="basicContent" v-show="!compile">
          <div class="infoContent">
            <div class="line">
              <span class="label">公司名称</span>
              <span class="content">{{ name }}</span>
            </div>
            <div class="line">
              <span class="label">公司LOGO</span>
              <div class="img">
                <img :src="logo" alt="" srcset="">
              </div>
            </div>
            <div class="line">
              <span class="label">工作时间</span>
              <span class="content">{{ workTime }}</span>
            </div>
            <div class="line">
              <span class="label">联系电话</span>
              <!-- <span class="content">{{ phone }}</span> -->
              <div class="phoneList">
                <span class="phone" v-for="(item,index) in phonesList" :key="index">{{item.phone}}</span>
              </div>
            </div>
            <div class="line">
              <span class="label">品牌标签</span>
              <div class="tagList">
                <span class="tag" v-for="(item,index) in brandTagsList" :key="index">{{item.tag}}</span>
              </div>
            </div>
          </div>
          <div class="introduction">
            <span class="label">公司介绍</span>
            <p>{{introduce}}</p>
          </div>
          <span class="compile" @click="compile = true">编辑信息</span>
      </div>
      <div class="basicContent" v-show="compile">
        <div class="infoContent">
          <div class="line oneline">
            <span class="label">公司名称</span>
            <span class="content">{{ name }}</span>
          </div>
          <div class="line">
            <span class="label">公司LOGO</span>
              <div class="imgContent">
                <img :src="logo" alt="" srcset="">
                <!-- <span class="logo">上传</span> -->
                <el-upload
                  class="upload-demo"
                  action=""
                  :http-request="upload"
                  :multiple="false"
                  :show-file-list="false">
                  <span class="logo">上传</span>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
              </div>
          </div>
          <div class="line oneline">
            <span class="label">工作时间</span>
            <div class="inputBox">
              <input maxlength="40" type="text" v-model="workTime">
            </div>
          </div>
          <div class="line">
            <span class="label">联系电话</span>
            <div class="phoneContent">
              <div class="inputBox phone" v-for="(item,index) in phonesList" :key="index">
                <input type="text" v-model="item.phone">
                <span @click="deletePhone(item,index)" style="width:16PX;height: 16PX;display: flex;margin-right: 8PX;cursor: pointer;">
                  <img style="width: 100%; height: 100%;" src="@/assets/globalPc/ic_b_deletelist.png" alt="">
                </span>
              </div>
              <span class="add" @click="add">添加</span>
            </div>
          </div>
          <div class="line">
            <span class="label">品牌标签</span>
            <div class="tagContent">
              <div class="inputBox tagInput" v-for="(item,index) in brandTagsList" :key="index">
                <input maxlength="10" type="text" v-model="item.tag">
              </div>
              <span class="add" @click="addTag">添加</span>
            </div>
          </div>
        </div>
        <div class="introduction">
          <span class="label">公司介绍</span>
          <textarea class="introduceInput" v-model="introduce" name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="saveContent">
          <span class="cancel" @click="compile = false">取消</span>
          <span v-show="!disable" class="save" @click="save">保存</span>
          <span v-show="disable" class="save" style="background: #e0e0e0;color: rgba(255,255,255,0.7)">保存</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  data(){
    return {
      name: '',
      logo: require('../../assets/globalPc/qrcode.png'),
      workTime: '',
      brandTags: ['12年知名品牌','12年知名品牌'],
      brandTagsList: [],
      introduce: '',
      compile: false,
      phonesList: [],
      phones: [],
      files: [],
      fileId: '',
      disable: false
    }
  },
  created(){
    this.getBaseInfo()
  },
  methods: {
    upload (files) {
      if(/\.(jpg|jpeg|png|JPG|PNG)$/.test(files.file.name)){
        this.disable = true
        let formData = new FormData()
        formData.append('files', files.file)
        api.fileupload(formData).then(res => {
          if (res.code == 0) {
            this.disable = false
            console.log(res)
            this.fileId =  res.data[0].fileId
            let reader = new FileReader();
            let file = files.file
            let imgUrlBase64
            if(file){
              imgUrlBase64 = reader.readAsDataURL(file);
              reader.onload = (e) => {
                this.logo = reader.result
                console.log(reader.result)
              }
            }
          }
        }).catch(err => {
          this.$message.error('上传失败，请重新上传')
        })
      }else{
        this.$message.error('图片暂不支持该格式')
        return
      }
    },
    getBaseInfo(){
      api.baseInfo().then(res => {
        console.log(res)
        if(res.code == 0){
          let data = res.data
          this.name = data.name
          this.brandTagsList = []
          this.brandTags = []
          for (let i = 0; i < data.brandTags.length; i++) {
            let tag = data.brandTags[i];
            let json ={
              tag: tag
            }
            this.brandTagsList.push(json)
          }
          this.adress = data.address
          this.workTime = data.workTime
          this.phonesList = []
          this.phones = []
          for (let i = 0; i < data.phones.length; i++) {
            let phone = data.phones[i];
            let json ={
              phone: phone
            }
            this.phonesList.push(json)
          }
          this.logo = data.logo
          this.introduce = data.introduce
        }
      })
    },
    add(){
      let json = {
        phone: ''
      }
      if(this.phonesList.length >=3){
        console.log(this.phonesList)
        this.$message({
          message: '最多填写三个电话',
          type: 'warning',
          showClose: true,
          duration: 1000
        })
      }else{
        this.phonesList.push(json)
      }
    },
    addTag(){
      let json = {
        phone: ''
      }
      if(this.brandTagsList.length >= 2){
        console.log(this.brandTagsList)
        this.$message({
          message: '最多填写两个标签',
          type: 'warning',
          showClose: true,
          duration: 1000
        })
      }else{
        this.brandTagsList.push(json)
      }
    },
    deletePhone(item,index){
      console.log(index)
      if(this.phonesList.length <= 1){
        this.$message({
          message: '号码至少保留一个',
          type: 'error',
          showClose: true,
          duration: 1000
        })
      }else{
        this.$confirm('确认删除此号码?', '提示', {}).then(() => {
          this.phonesList.splice(index,1)
          console.log(this.phonesList)
        })
      }
    },
    deleteTag(item,index){

    },
    save(){
      console.log(this.fileId)
      if(this.fileId == ''){
        console.log(this.logo)
      }else{
        this.logo = this.fileId
      }
      //标签数据处理
      for (let i = 0; i < this.brandTagsList.length; i++) {
        this.brandTagsList[i].tag;
        if(this.brandTagsList[i].tag != '' && this.brandTagsList[i].tag != null){
          this.brandTags.push(this.brandTagsList[i].tag)
        }
      }
      //电话数据处理
      for (let i = 0; i < this.phonesList.length; i++) {
        this.phonesList[i].phone;
        if(this.phonesList[i].phone != '' && this.phonesList[i].phone != null){
          this.phones.push(this.phonesList[i].phone)
        }
      }
      let data = {
        brandTags: this.brandTags,
        introduce: this.introduce,
        logo: this.logo,
        name: this.name,
        phones: this.phones,
        workTime: this.workTime
      }
      console.log(data)
      api.baseUpdate(data).then(res => {
        console.log(res)
        if(res.code == 0){
          this.$message({
            message: '保存成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.compile = false
          this.getBaseInfo()
        }else{
          this.$message({
            message: '保存失败',
            type: 'error',
            showClose: true,
            duration: 1000
          })
          this.compile = false
          this.getBaseInfo()
        }
      })
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
          .phoneContent .add,
          .tagContent .add{
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
          line-height: 24PX;
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
