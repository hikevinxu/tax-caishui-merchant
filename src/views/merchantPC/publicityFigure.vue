<template>
  <div class="publictyFigure">
    <div class="imgList">
      <div class="title">宣传图片</div>
      <div class="uploadImgList">
        <el-upload
          :class="imgTotal >= 8 ? 'disabled' : ''"
          action=""
          list-type="picture-card"
          :multiple="false"
          :limit="8"
          :file-list="fileList"
          :on-remove="handleRemove"
          :http-request="upload">
          <i class="el-icon-plus"></i>
        </el-upload>
        <div class="imgTotal">已添加图片 {{ imgTotal }}/8 张</div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api' 
import qs from 'qs'
export default {
  data(){
    return {
      imgTotal: 0,
      fileList: [],
      fileId: ''
    }
  },
  created(){
    this.getImglist();
  },
  methods: {
    //上传图片
    upload (files) {
      const loading = this.$loading({
        lock: true,
        text: '正在上传图片，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let formData = new FormData()
      formData.append('files', files.file)
      api.fileupload(formData).then(res => {
        if (res.code == 0) {
          this.fileId =  res.data[0].fileId
          loading.close()
          let data = {
            img: this.fileId
          }
          data = qs.stringify(data)
          api.publictyImgAdd(data).then(res => {
            if(res.code == 0){
              this.$message({
                message: '添加成功',
                type: 'success',
                showClose: true,
                duration: 1000
              })
              this.getImglist()
            }else{
              this.$message({
                message: '添加失败',
                type: 'error',
                showClose: true,
                duration: 1000
              })
              this.getImglist()
            }
          })
        } else {
          loading.close()
        }
      }).catch(err => {
        loading.close()
        this.$message.error('上传失败，请重新上传')
      })
    },
    getImglist(){
      api.publictyImgList().then(res => {
        if(res.code == 0){
          let fileList = []
          if(res.data.length >= 0){
            this.imgTotal = res.data.length
          }
          for (let i = 0; i < res.data.length; i++) {
            let img = res.data[i].img;
            let uid = res.data[i].id
            let json = {
              uid: uid,
              url: img
            }
            fileList.push(json)
          }
          this.fileList = fileList
        }
      })
    },
    handleRemove (res, file, fileList) {
      let data = {
        imgid: res.uid
      }
      data = qs.stringify(data)
      api.publictyImgDelete(data).then(res => {
        if(res.code == 0){
          this.$message({
            message: '删除成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.getImglist()
        }else{
          this.$message({
            message: '删除失败',
            type: 'error',
            showClose: true,
            duration: 1000
          })
          this.getImglist()
        }
      })
    }
  }
}
</script>
<style lang="scss">
.is-ready{
  display: none !important;
}
.publictyFigure {
  // width: 100vw;
  height: 100vh;
  font-family: PingFangSC-Medium;
  font-size: 16Px;
  color: rgba(0,0,0,0.87);
  line-height: 22Px;
  .imgList {
    box-sizing: border-box;
    width: 100%;
    // height: 384Px;
    background: #FFFFFF;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.04);
    padding: 24Px 32Px;
    overflow: hidden;
    .uploadImgList {
      margin-top: 24Px;
      .el-upload-list__item,
      .el-upload-list__item-actions,
      .el-upload {
        width: 180Px;
        height: 120Px;
        margin-right: 8Px;
        margin-bottom: 16Px;
      }
      .el-upload {
        position: relative;
        .el-icon-plus {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .disabled .el-upload--picture-card {
        display: none;
      }
      .imgTotal {
        font-family: PingFangSC-Regular;
        font-size: 12Px;
        color: rgba(0,0,0,0.60);
        text-align: left;
        line-height: 18Px;
      }
    }
  }
}
</style>
