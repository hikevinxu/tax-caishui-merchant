<template>
  <div class="mainBusinesss">
    <div class="business">
      <div class="business_title">
        <h4>主营业务管理</h4>
        <span class="addBusiness" @click="handleFetchPv">+添加新业务</span>
      </div>
      <div class="business_content">
        <el-table
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          style="width: 100%;">
          <el-table-column type="index" label="序号" prop="id" align="center" width="80PX">
            
          </el-table-column>

          <el-table-column label="业务类型" width="300PX" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="介绍类型" width="300PX" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.introduceType | typeChange }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="120PX" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.shelf | statusChange}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" min-width="200PX" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button style="margin-left: 12PX;" type="success" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button v-show="scope.row.shelf == false" style="margin-left: 12PX;" type="warning" size="small" @click="changeShelfUp(scope.row)">上架</el-button>
              <el-button v-show="scope.row.shelf == false" style="margin-left: 12PX;" type="danger" size="small" @click="serviceDelete(scope.row)">删除</el-button>
              <el-button v-show="scope.row.shelf == true" style="margin-left: 12PX;" type="danger" size="small" @click="changeShelfDown(scope.row)">下架</el-button>
            </template>
          </el-table-column>

        </el-table>
        <pagination :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
        
        <!-- 添加 -->
        <el-dialog :visible.sync="dialogPvVisible" title="添加业务">
          <div class="choseBusiness">
            <div class="title" style="font-size: 14PX;color: rgba(0,0,0,0.60);">选择业务</div>
            <div class="selectLine">
              <el-select style="width: 33%" @change="getType1" v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  >
                </el-option>
              </el-select>

              <el-select style="width: 33%" @change="getType2" v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>

              <el-select v-show="showOptions3" style="width: 33%" v-model="value2" placeholder="请选择">
                <el-option
                  v-for="item in options3"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </div>
            <div class="title" style="font-size: 14PX;color: rgba(0,0,0,0.60);">业务描述</div>
            <div class="describeContent">
              <div class="describe">
                <div class="choseType">
                  <div class="chose_radio">
                    <el-radio v-model="radio" label="1">空</el-radio>
                    <el-radio v-model="radio" label="2">自定义图片</el-radio>
                  </div>
                  <span style="display: block;color:rgba(0,0,0,0.12);margin-left: 8PX;margin-right: 8PX;">|</span>
                  <div class="chose_checkbox">
                    <el-checkbox v-model="checked">添加跳转详情</el-checkbox>
                  </div>
                </div>
                <div class="textDescribe" v-show="radio == '1'">
                  <textarea v-show="!hideIntroduceContent" class="introduceInput" v-model="introduceContent" name="" id="" cols="30" rows="10" maxlength="500"></textarea>
                  <span v-show="!hideIntroduceContent" class="default">使用默认描述</span>
                </div>
                <el-upload
                  class="upload-demo"
                  action=""
                  :http-request="upload"
                  :multiple="false"
                  :show-file-list="false">
                  <div class="imgDesrcibe" v-show="radio == '2'">
                    <img class="introduceImg" v-show="introduceImgUpload" :src="introduceImg" alt="" srcset="">
                    <img v-show="!introduceImgUpload" style="display: block;width: 24PX;height: 24PX" src="@/assets/globalPc/ic_form_addphoto@3x.png" alt="">
                    <span v-show="!introduceImgUpload">添加图片</span>
                    <span v-show="!introduceImgUpload">尺寸建议:宽800PX, 长1000PX以内</span>
                  </div>  
                </el-upload>
              </div>
              <div class="details_img" v-show="radio == '2' && checked == true">
                <el-input style="margin-left: 40PX;display: block; width: 90%;height: 40PX" maxlength="15" v-model="detailTitle" placeholder="请输入详情页标题"></el-input>
                <el-upload
                  class="upload-demo"
                  action=""
                  :http-request="uploadDetail"
                  :multiple="false"
                  :show-file-list="false">
                  <div class="addImg">
                    <img class="detailImg" v-show="detailImgUpload" :src="detailImg" alt="" srcset="">
                    <img v-show="!detailImgUpload" style="display: block;width: 24PX;height: 24PX" src="@/assets/globalPc/ic_form_addphoto@3x.png" alt="">
                    <span v-show="!detailImgUpload">添加图片</span>
                    <span v-show="!detailImgUpload">尺寸建议:宽800PX, 长1000PX以内</span>
                  </div>  
                </el-upload>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogPvVisible = false">取消</el-button>
            <el-button type="success" @click="create()">保存</el-button>
          </span>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog :visible.sync="dialogUpdate" title="编辑业务">
          <div class="choseBusiness">
            <div class="title" style="font-size: 14PX;color: rgba(0,0,0,0.60);">选择业务</div>
            <div class="selectLine">
              <el-select :disabled='disabled' style="width: 33%" @change="getType3" v-model="value3" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  >
                </el-option>
              </el-select>

              <el-select :disabled='disabled' style="width: 33%" @change="getType4" v-model="value4" placeholder="请选择">
                <el-option
                  v-for="item in options5"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>

              <el-select :disabled='disabled' v-show="showOptions4" style="width: 33%" v-model="value5" placeholder="请选择">
                <el-option
                  v-for="item in options6"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </div>
            <div class="title" style="font-size: 14PX;color: rgba(0,0,0,0.60);">业务描述</div>
            <div class="describeContent">
              <div class="describe">
                <div class="choseType">
                  <div class="chose_radio">
                    <el-radio v-model="radio" label="1">空</el-radio>
                    <el-radio v-model="radio" label="2">自定义图片</el-radio>
                  </div>
                  <span style="display: block;color:rgba(0,0,0,0.12);margin-left: 8PX;margin-right: 8PX;">|</span>
                  <div class="chose_checkbox">
                    <el-checkbox v-model="checked">添加跳转详情</el-checkbox>
                  </div>
                </div>
                <div class="textDescribe" v-show="radio == '1'">
                  <textarea v-show="!hideIntroduceContent"  class="introduceInput" v-model="introduceContent" name="" id="" cols="30" rows="10" maxlength="500"></textarea>
                  <span v-show="!hideIntroduceContent" class="default">使用默认描述</span>
                </div>
                <el-upload
                  class="upload-demo"
                  action=""
                  :http-request="upload"
                  :multiple="false"
                  :show-file-list="false">
                  <div class="imgDesrcibe" v-show="radio == '2'">
                    <img class="introduceImg" v-show="introduceImgUpload" :src="introduceImg" alt="" srcset="">
                    <img v-show="!introduceImgUpload" style="display: block;width: 24PX;height: 24PX" src="@/assets/globalPc/ic_form_addphoto@3x.png" alt="">
                    <span v-show="!introduceImgUpload">添加图片</span>
                    <span v-show="!introduceImgUpload">尺寸建议:宽800PX, 长1000PX以内</span>
                  </div>  
                </el-upload>
              </div>
              <div class="details_img" v-show="radio == '2' && checked == true">
                <el-input style="margin-left: 40PX;display: block; width: 90%;height: 40PX" maxlength="15" v-model="detailTitle" placeholder="请输入详情页标题"></el-input>
                <el-upload
                  class="upload-demo"
                  action=""
                  :http-request="uploadDetail"
                  :multiple="false"
                  :show-file-list="false">
                  <div class="addImg">
                    <img class="detailImg" v-show="detailImgUpload" :src="detailImg" alt="" srcset="">
                    <img v-show="!detailImgUpload" style="display: block;width: 24PX;height: 24PX" src="@/assets/globalPc/ic_form_addphoto@3x.png" alt="">
                    <span v-show="!detailImgUpload">添加图片</span>
                    <span v-show="!detailImgUpload">尺寸建议:宽800PX, 长1000PX以内</span>
                  </div>  
                </el-upload>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogUpdate = false">取消</el-button>
            <el-button type="success" @click="upDate()">保存</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import qs from 'qs'
import Pagination from '@/components/Pagination'
import { parse } from 'path';
export default {
  name: 'mainBusinesss',
  components: { Pagination },
  filters: {
    typeChange(val){
      if(val == 'text'){
        return val = '无'
      }else if(val == 'image'){
        return val = '自定义图片'
      }
    },
    statusChange(val){
      if(val == true){
        return val = '已上架'
      }else if(val == false){
        return val = '已下架'
      }
    }
  },
  data(){
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 20,
      },
      total: 0,
      fileId: '',
      fileIdDetail: '',
      list: [],
      listLoading: false,
      dialogPvVisible: false,
      dialogUpdate: false,
      options1: [],
      options2: [],
      options3: [],
      options4: [],
      options5: [],
      options6: [],
      showOptions3: false,
      showOptions4: false,
      value: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      radio: '1',
      checked: false,
      introduceContent: '',
      hideIntroduceContent: true,
      detailTitle: '',
      createData: {
        code: '',
        introduceContent: '',
        introduceType: ''
      },
      introduceImg: '',
      introduceImgUpload: false,
      detailImgUpload: false,
      detailImg: '',
      id: '',
      disabled: false,
      updeteData: {
        code: '',
        id: '',
        introduceContent: {},
        introduceType: ''
      }
    }
  },
  created(){
    this.getList()
    this.getTypes()
  },
  methods: {
    //上传图片
    upload (files) {
      const loading = this.$loading({
        lock: true,
        text: '图片上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let formData = new FormData()
      formData.append('files', files.file)
      api.fileupload(formData).then(res => {
        if (res.code == 0) {
          loading.close()
          console.log(res)
          this.fileId =  res.data[0].fileId
          let reader = new FileReader();
          let file = files.file
          let imgUrlBase64
          if(file){
            imgUrlBase64 = reader.readAsDataURL(file);
            reader.onload = (e) => {
              this.introduceImg = reader.result
              this.introduceImgUpload = true
            }
          }
        }
      }).catch(err => {
        this.$message.error('上传失败，请重新上传')
      })
    },
    uploadDetail(files) {
      const loading = this.$loading({
        lock: true,
        text: '图片上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let formData = new FormData()
      formData.append('files', files.file)
      api.fileupload(formData).then(res => {
        loading.close()
        if (res.code == 0) {
          console.log(res)
          this.fileIdDetail =  res.data[0].fileId
          let reader = new FileReader();
          let file = files.file
          let imgUrlBase64
          if(file){
            imgUrlBase64 = reader.readAsDataURL(file);
            reader.onload = (e) => {
              this.detailImg = reader.result
              this.detailImgUpload = true
            }
          }
        }
      }).catch(err => {
        this.$message.error('上传失败，请重新上传')
      })
    },
    getList(){
      api.serviceList(this.listQuery).then(res => {
        console.log(res)
        if(res.code == 0){
          this.list = res.data.items
          this.total = res.data.total
        }
      })
    },
    //创建类型
    getTypes(){
      let data = {
        parentCode: ''
      }
      api.serviceType().then(res => {
        // console.log(res)
        if(res.code == 0){
          this.options1 = res.data
        }
      })
    },
    getType1(){
      this.value1 = ''
      this.value2 = ''
      this.options3 = []
      this.showOptions3 = false
      let data = {
        parentCode: this.value
      }
      api.serviceType(data).then(res => {
        // console.log(res)
        if(res.code == 0){
          this.options2 = res.data
        }
      })
    },
    getType2(){
      let data = {
        parentCode: this.value1
      }
      api.serviceType(data).then(res => {
        // console.log(res)
        if(res.code == 0){
          if(res.data.length > 0){
            this.options3 = res.data
            this.showOptions3 = true
          }else{
            this.options3 = []
            this.showOptions3 = false
          }
          
        }
      })
    },
    getType3(){
      let data = {
        parentCode: this.value3
      }
      api.serviceType(data).then(res => {
        // console.log(res)
        if(res.code == 0){
          this.options5 = res.data
        }
      })
    },
    getType4(){
      let data = {
        parentCode: this.value4
      }
      api.serviceType(data).then(res => {
        // console.log(res)
        if(res.code == 0){
          if(res.data.length > 0){
            this.options6 = res.data
            this.showOptions4 = true
          }else{
            this.options6 = []
            this.showOptions4 = false
          }
        }
      })
    },
    create(){
      if(this.radio == '1'){
        this.createData.introduceType = 'text'
        if(this.value != '' &&  this.value1 != ''){
          if(this.showOptions3 == true){
            if(this.value2 != ''){
              this.createData.code = this.value2
              this.createData.introduceContent = ''
              this.submit(this.createData)
            }else{
              this.$message({
                message: '请填写数据后保存',
                type: 'warning',
                showClose: true,
                duration: 1000
              })
            }
          }else{
            this.createData.code = this.value1
            this.submit(this.createData)
          }
        }else{
          this.$message({
            message: '请填写数据后保存',
            type: 'warning',
            showClose: true,
            duration: 1000
          })
        }
      }else if(this.radio == '2'){
        this.createData.introduceType = 'image'
        if(this.checked == false){
          if(this.value != '' &&  this.fileId != '' && this.value1 != ''){
            if(this.showOptions3 == true){
              if(this.value2 != ''){
                this.createData.code = this.value2
                let introduceContent = {
                  introduceImg: this.fileId,
                  detailJump: false
                }
                this.createData.introduceContent = JSON.stringify(introduceContent)
                this.submit(this.createData)
              }else{
                this.$message({
                  message: '请填写数据后保存',
                  type: 'warning',
                  showClose: true,
                  duration: 1000
                })
              }
            }else{
              this.createData.code = this.value1
              let introduceContent = {
                introduceImg: this.fileId,
                detailJump: false
              }
              this.createData.introduceContent = JSON.stringify(introduceContent)
              this.submit(this.createData)
            }
          }else{
            this.$message({
              message: '请填写数据后保存',
              type: 'warning',
              showClose: true,
              duration: 1000
            })
          }
        }else {
          if(this.value != '' &&  this.fileId != '' && this.value1 != '' && this.fileIdDetail != ''){
            if(this.showOptions3 == true){
              if(this.value2 != ''){
                this.createData.code = this.value2
                let introduceContent = {
                  introduceImg: this.fileId,
                  detailJump: true,
                  detailTitle: this.detailTitle,
                  detailImg: this.fileIdDetail
                }
                this.createData.introduceContent = JSON.stringify(introduceContent)
                this.submit(this.createData)
              }else{
                this.$message({
                  message: '请填写数据后保存',
                  type: 'warning',
                  showClose: true,
                  duration: 1000
                })
              }
            }else{
              this.createData.code = this.value1
              let introduceContent = {
                introduceImg: this.fileId,
                detailJump: true,
                detailTitle: this.detailTitle,
                detailImg: this.fileIdDetail
              }
              this.createData.introduceContent = JSON.stringify(introduceContent)
              this.submit(this.createData)
            }
          }else{
            this.$message({
              message: '请填写数据后保存',
              type: 'warning',
              showClose: true,
              duration: 1000
            })
          }
        }
      }
    },
    upDate(){
      if(this.radio == '1'){
        this.createData.introduceType = 'text'
        if(this.value3 != '' &&  this.value4 != ''){
          if(this.showOptions4 == true){
            if(this.value5 != ''){
              this.createData.code = this.value5
              this.createData.id = this.id
              this.createData.introduceContent = ''
              console.log(this.createData)
              this.submitUpdate(this.createData)
            }else{
              this.$message({
                message: '请填写数据后保存',
                type: 'warning',
                showClose: true,
                duration: 1000
              })
            }
          }else{
            this.createData.code = this.value4
            this.createData.id = this.id
            console.log(this.createData)
            this.submitUpdate(this.createData)
          }
        }else{
          this.$message({
            message: '请填写数据后保存',
            type: 'warning',
            showClose: true,
            duration: 1000
          })
        }
      }else if(this.radio == '2'){
        this.createData.introduceType = 'image'
        if(this.checked == false){
          if(this.value3 != '' && this.value4 != ''){
            if(this.showOptions4 == true){
              if(this.value5 != ''){
                this.createData.code = this.value5
                this.createData.id = this.id
                let introduceContent = {}
                introduceContent.detailJump = false
                if(this.introduceImg == ''){
                  if(this.fileId == ''){
                    this.$message({
                      message: '请填写数据后保存',
                      type: 'warning',
                      showClose: true,
                      duration: 1000
                    })
                    return
                  }else{
                    introduceContent.introduceImg = this.fileId
                  }
                }else{
                  if(this.fileId == ''){
                    introduceContent.introduceImg = this.introduceImg
                  }else{
                    introduceContent.introduceImg = this.fileId
                  }
                }
                this.createData.introduceContent = JSON.stringify(introduceContent)
                console.log(this.createData)
                this.submitUpdate(this.createData)
              }else{
                this.$message({
                  message: '请填写数据后保存',
                  type: 'warning',
                  showClose: true,
                  duration: 1000
                })
              }
            }else{
              this.createData.code = this.value4
              this.createData.id = this.id
              let introduceContent = {}
              introduceContent.detailJump = false
              if(this.introduceImg == ''){
                if(this.fileId == ''){
                  this.$message({
                    message: '请填写数据后保存',
                    type: 'warning',
                    showClose: true,
                    duration: 1000
                  })
                  return
                }else{
                  introduceContent.introduceImg = this.fileId
                }
              }else{
                if(this.fileId == ''){
                  introduceContent.introduceImg = this.introduceImg
                }else{
                  introduceContent.introduceImg = this.fileId
                }
              }
              console.log(introduceContent)
              this.createData.introduceContent = JSON.stringify(introduceContent)
              this.submitUpdate(this.createData)
            }
          }else{
            this.$message({
              message: '请填写数据后保存',
              type: 'warning',
              showClose: true,
              duration: 1000
            })
          }
        }else {
          if(this.value3 != '' &&  this.value4 != ''){
            if(this.showOptions4 == true){
              if(this.value5 != ''){
                this.createData.code = this.value5
                this.createData.id = this.id
                let introduceContent = {}
                introduceContent.detailJump = true
                if(this.introduceImg == ''){
                  if(this.fileId == ''){
                    this.$message({
                      message: '请填写数据后保存',
                      type: 'warning',
                      showClose: true,
                      duration: 1000
                    })
                    return
                  }else{
                    introduceContent.introduceImg = this.fileId
                  }
                }else{
                  if(this.fileId == ''){
                    introduceContent.introduceImg = this.introduceImg
                  }else{
                    introduceContent.introduceImg = this.fileId
                  }
                }
                //编辑判断图片是否自带
                if(this.detailImg == ''){
                  if(this.fileIdDetail == ''){
                    this.$message({
                      message: '请填写数据后保存',
                      type: 'warning',
                      showClose: true,
                      duration: 1000
                    })
                    return
                  }else{
                    introduceContent.detailImg = this.fileIdDetail
                  }
                }else{
                  if(this.fileIdDetail == ''){
                    introduceContent.detailImg = this.detailImg
                  }else{
                    introduceContent.detailImg = this.fileIdDetail
                  }
                }
                introduceContent.detailTitle = this.detailTitle
                console.log(introduceContent)
                this.createData.introduceContent = JSON.stringify(introduceContent)
                this.submitUpdate(this.createData)
              }else{
                this.$message({
                  message: '请填写数据后保存',
                  type: 'warning',
                  showClose: true,
                  duration: 1000
                })
              }
            }else{
              this.createData.code = this.value4
              this.createData.id = this.id
              let introduceContent = {}
              introduceContent.detailJump = true
              //编辑判断图片是否自带
              if(this.introduceImg == ''){
                if(this.fileId == ''){
                  this.$message({
                    message: '请填写数据后保存',
                    type: 'warning',
                    showClose: true,
                    duration: 1000
                  })
                  return
                }else{
                  introduceContent.introduceImg = this.fileId
                }
              }else{
                if(this.fileId == ''){
                  introduceContent.introduceImg = this.introduceImg
                }else{
                  introduceContent.introduceImg = this.fileId
                }
              }
              //编辑判断图片是否自带
              if(this.detailImg == ''){
                if(this.fileIdDetail == ''){
                  this.$message({
                    message: '请填写数据后保存',
                    type: 'warning',
                    showClose: true,
                    duration: 1000
                  })
                  return
                }else{
                  introduceContent.detailImg = this.fileIdDetail
                }
              }else{
                if(this.fileIdDetail == ''){
                  introduceContent.detailImg = this.detailImg
                }else{
                  introduceContent.detailImg = this.fileIdDetail
                }
              }
              introduceContent.detailTitle = this.detailTitle
              console.log(introduceContent)
              this.createData.introduceContent = JSON.stringify(introduceContent)
              this.submitUpdate(this.createData)
            }
          }else{
            this.$message({
              message: '请填写数据后保存',
              type: 'warning',
              showClose: true,
              duration: 1000
            })
          }
        }
      }
    },
    submit(data){
      api.serviceSave(data).then(res =>{
        console.log(res)
        if(res.code == 0){
          this.$message({
            message: '保存成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.getList()
          this.dialogPvVisible = false
        }else{
          this.$message({
            message: '保存失败',
            type: 'error',
            showClose: true,
            duration: 1000
          })
          this.getList()
          this.dialogPvVisible = false
        }
      })
    },
    submitUpdate(data){
      api.serviceUpdate(data).then(res =>{
        console.log(res)
        if(res.code == 0){
          this.$message({
            message: '保存成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.getList()
          this.dialogUpdate = false
        }else{
          this.$message({
            message: '保存失败',
            type: 'error',
            showClose: true,
            duration: 1000
          })
          this.getList()
          this.dialogUpdate = false
        }
      })
    },
    //调起添加页面
    handleFetchPv(){
      this.dialogPvVisible = true
      //重新赋值
      this.resetForm()
    },
    //重置表单
    resetForm(){
      this.value = ''
      this.value1 = ''
      this.value3 = ''
      this.showOptions3 = false
      this.options3 = []
      this.options5 = []
      this.value4 = ''
      this.options6 = []
      this.showOptions4 = false
      this.value5 = ''
      this.radio = '1'
      this.checked = false
      this.introduceContent = ''
      this.introduceImg = ''
      this.introduceImgUpload = false
      this.detailTitle = ''
      this.detailImg = ''
      this.fileId = ''
      this.fileIdDetail = ''
      this.detailImgUpload = false
      this.introduceContent = ''
    },
    //调起编辑页面
    handleUpdate(row){
      this.resetForm()
      this.dialogUpdate = true
      this.id = row.id
      this.disabled = true
      console.log(row)

      //获取三个下拉框里面的数据
      this.value3 = row.parentCodes[0]
      let data = {
        parentCode: this.value3
      }
      api.serviceType(data).then(res => {
        if(res.code == 0){
          this.options5 = res.data
        }
      })
      if(row.parentCodes.length > 1){
        this.value4 = row.parentCodes[1]
        this.value5 = row.code
        this.showOptions4 = true
        let data = {
          parentCode: this.value4
        }
        api.serviceType(data).then(res => {
          if(res.code == 0){
            this.options6 = res.data
          }
        })
      }else{
        this.value4 = row.code
      }

      //单选框复选框赋值
      if(row.introduceType == 'text'){
        this.radio = '1'
        this.introduceContent = row.introduceContent
        this.checked = false
      }else{
        this.radio = '2'
        this.introduceContent = JSON.parse(row.introduceContent)
        this.introduceImg = this.introduceContent.introduceImg
        this.introduceImgUpload = true
        // console.log(this.introduceImg)
        if(this.introduceContent.detailJump == true){
          this.checked = true
          this.detailTitle = this.introduceContent.detailTitle
          this.detailImg = this.introduceContent.detailImg
          this.detailImgUpload = true
        }else{
          this.detailTitle = ''
          this.detailImg = ''
          this.detailImgUpload = false
          this.checked = false
        }
      }
    },
    //公司业务上架
    changeShelfUp(row){
      console.log(row)
      this.$confirm('确认上架该业务?', '提示', {}).then(() => {
        let data = {
          id: row.id,
          shelf: true
        }
        data = qs.stringify(data)
        console.log(data)
        api.serviceChangeShelf(data).then(res => {
          console.log(res)
          if(res.code == 0){
            this.$message({
              message: '上架成功',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            this.getList()
          }else{
            this.$message({
              message: '上架失败',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            this.getList()
          }
        })
      })
    },
    //公司业务下架
    changeShelfDown(row){
      console.log(row)
      this.$confirm('确认下架该业务?', '提示', {}).then(() => {
        let data = {
          id: row.id,
          shelf: false
        }
        data = qs.stringify(data)
        console.log(data)
        api.serviceChangeShelf(data).then(res => {
          console.log(res)
          if(res.code == 0){
            this.$message({
              message: '上架成功',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            this.getList()
          }else{
            this.$message({
              message: '上架失败',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            this.getList()
          }
        })
      })
    },
    serviceDelete(row){
      let data = {
        id: row.id
      }
      data = qs.stringify(data)
      this.$confirm('确认删除该业务?', '提示', {}).then(() => {
        api.serviceDelete(data).then(res => {
          if(res.code == 0){
            this.$message({
              message: '删除成功',
              type: 'success',
              showClose: true,
              duration: 1000
            })
            this.getList()
          }else{
            this.$message({
              message: '删除失败',
              type: 'error',
              showClose: true,
              duration: 1000
            })
            this.getList()
          }
        })
      })
    }
  }
}
</script>
<style lang="scss">
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #FF7F4A;
}
.el-pagination.is-background .el-pager li:not(.disabled).active:hover{
  color: #ffffff;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover{
  color: #FF7F4A;
}
.el-button--success{
  background: #5AB3A4;
  border-color: #5AB3A4;
}
.el-dialog{
  width: 70%;
  min-width: 750PX;
}
.el-upload {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
.mainBusinesss {
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 20PX;
  .business{
    width: 100%;
    min-width: 1040PX;
    // height: 199PX;
    background: #ffffff;
    box-shadow: 0 4PX 8PX 0 rgba(0,0,0,0.04);
    padding-bottom: 40PX;
    padding-top: 24PX;
    margin-bottom: 16PX;
    .business_title{
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
      .addBusiness{
        display: flex;
        width: 120PX;
        height: 36PX;
        align-items: center;
        justify-content: center;
        background: #5AB3A4;
        border-radius: 4PX;
        font-size: 15PX;
        color: #FFFFFF;
      }
    }
    .business_content{
      width: 93.84%;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: center;
      // justify-content: space-between;
      flex-flow: column;
      margin-top: 24PX;
      .choseBusiness{
        .title{
          margin-bottom: 12PX;
        }
        .selectLine{
          width: 100%;
          display: flex;
          align-items: center;
          // justify-content: flex-start;
          margin-bottom: 16PX;
          .el-select{
            margin-right: 16PX;
          }
        }
        .describeContent{
          width: 100%;
          display: flex;
          align-items: flex-start;
          .describe{
            width: 50%;
            border-right: 1PX solid rgba(0,0,0,0.08);
            .choseType{
              display: flex;
              align-items: center;
            }
            .textDescribe{
              margin-top: 16PX;
              width: 100%;
              .introduceInput{
                width: 90%;
                background: #FAFAFA;
                border-radius: 4PX;
                outline: none;
                display: block;
                border: none;
                height: 158PX;
                padding: 16PX;
                font-size: 14PX;
                color: #000000;
                line-height: 24PX;
                resize:none;
              }
              .default{
                font-size: 14PX;
                color: #FF7F4A;
                display: block;
                margin-left: 16PX;
                margin-top: 8PX;
                cursor: pointer;
              }
            }
            .imgDesrcibe{
              width: 90%;
              margin-right: auto;
              background: #FAFAFA;
              border-radius: 4PX;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-flow: column;
              height: 232PX;
              margin-top: 24PX;
              font-size: 12PX;
              color: rgba(0,0,0,0.26);
              line-height: 18PX;
              cursor: pointer;
              .introduceImg{
                display: block;
                height: 100%;
                width: 100%;
                // background: #FAFAFA;
                border-radius: 4PX;
              }
            }
          }
          .details_img{
            width: 50%;
            .addImg{
              width: 90%;
              margin-left: 30PX;
              background: #FAFAFA;
              border-radius: 4PX;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-flow: column;
              height: 220PX;
              margin-top: 16PX;
              font-size: 12PX;
              color: rgba(0,0,0,0.26);
              line-height: 18PX;
              cursor: pointer;
              .detailImg{
                display: block;
                height: 100%;
                width: 100%;
                // background: #FAFAFA;
                border-radius: 4PX;
              }
            }
          }
        }  
      }
    }
  }
}
</style>
