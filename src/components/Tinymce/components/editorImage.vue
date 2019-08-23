<template>
  <div class="upload-container">
    <el-upload
      class="upload-demo"
      action=""
      :multiple="false"
      :show-file-list="false"
      :http-request="logoUpload">
      <el-button size="small" icon="el-icon-upload" type="primary">添加本地图片</el-button>
    </el-upload>
  </div>
</template>

<script>
import globalApi from '@/api/globalApi'
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    logoUpload(files) {
      console.log(files)
      const loading = this.$loading({
        lock: true,
        text: '正在上传图片，请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let formData = new FormData()
      formData.append('file', files.file)
      globalApi.fileUploadGetUrl(formData).then(res => {
        if (res.code == 0) {
          this.$emit('successCBK', [{url: res.data.fileUrl}])
          // let oFileReader = new FileReader()
          // oFileReader.readAsDataURL(files.file)
          // oFileReader.onloadend = (e) => {
          //   this.$emit('successCBK', [{url: e.target.result}])
          // }
          loading.close()
        }
      }).catch(err => {
        loading.close()
        this.$message.error('上传失败，请重新上传')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20Px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
<style lang="scss">
.upload-container {
  .el-upload {
    display: block;
  }
}
</style>
