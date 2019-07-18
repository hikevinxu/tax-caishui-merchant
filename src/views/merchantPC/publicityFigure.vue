<template>
  <div class="publictyFigure">
    <div class="imgList">
      <div class="title">宣传图片</div>
      <div class="uploadImgList">
        <el-upload
          :class="fileList.length >= 8 ? 'disabled' : ''"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          multiple
          :limit="8"
          :file-list="fileList"
          :on-remove="handleRemove"
          :on-success="handleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <div class="imgTotal">已添加图片 5/8 张</div>
      </div>
    </div>
  </div>
</template>
<script>

import { setCookie } from '@/utils/cookie.js'
export default {
  data(){
    return {
      imgTotal: 4,
      fileList: []
    }
  },
  methods: {
    toChat: function(){
      setCookie('uid', '15515268707')
      setCookie("sdktoken", "b3e8d33f9cfbc94f4ea0e8b41c41fb1c")
      // window.open('./IM/im/main.html')
      window.location.href = window.location.protocol+"//"+window.location.host + '/IM/im/main.html'
    },
    handleRemove () {

    },
    handleSuccess (res, file, fileList) {
      console.log(res)
      console.log(file)
      console.log(fileList)
      this.fileList = fileList
      console.log(this.fileList)
    }
  }
}
</script>
<style lang="scss">
.publictyFigure {
  width: 100vw;
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
