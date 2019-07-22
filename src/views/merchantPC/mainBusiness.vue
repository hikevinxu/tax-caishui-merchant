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
          <el-table-column label="序号" prop="id" align="center" width="80PX">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="业务类型" width="300PX" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.business }}</span>
            </template>
          </el-table-column>

          <el-table-column label="介绍类型" width="300PX" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="120PX" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.status}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" min-width="200PX" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button style="margin-left: 12PX;" type="success" size="small">编辑</el-button>
              <el-button style="margin-left: 12PX;" type="warning" size="small" @click="handleDeletePv(scope.row)">上架</el-button>
              <el-button style="margin-left: 12PX;" type="danger" size="small" @click="handleDeletePv(scope.row)">下架</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="getList" /> -->
        
        <el-dialog :visible.sync="dialogPvVisible" title="添加业务">
          <div class="choseBusiness">
            <div class="title" style="font-size: 14PX;color: rgba(0,0,0,0.60);">选择业务</div>
            <div class="selectLine">
              <el-select style="width: 33%" v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

              <el-select style="width: 33%" v-model="value1" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

              <el-select style="width: 33%" v-model="value2" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="title" style="font-size: 14PX;color: rgba(0,0,0,0.60);">业务描述</div>
            <div class="describeContent">
              <div class="describe">
                <div class="choseType">
                  <div class="chose_radio">
                    <el-radio v-model="radio" label="1">文字描述</el-radio>
                    <el-radio v-model="radio" label="2">自定义图片</el-radio>
                  </div>
                  <span style="display: block;color:rgba(0,0,0,0.12);margin-left: 8PX;margin-right: 8PX;">|</span>
                  <div class="chose_checkbox">
                    <el-checkbox v-model="checked">添加跳转详情</el-checkbox>
                  </div>
                </div>
                <div class="textDescribe" v-show="radio == '1'">
                  <textarea class="introduceInput" v-model="introduce" name="" id="" cols="30" rows="10"></textarea>
                  <span class="default">使用默认描述</span>
                </div>
                <div class="imgDesrcibe" v-show="radio == '2'">
                  <img style="display: block;width: 24PX;height: 24PX" src="@/assets/globalPc/ic_form_addphoto@3x.png" alt="">
                  <span>添加图片</span>
                  <span>尺寸建议:宽800PX, 长1000PX以内</span>
                </div>
              </div>
              <div class="details_img" v-show="radio == '2'">
                <el-input style="margin-left: 30PX;display: block; width: 90%;height: 40PX" v-model="title" placeholder="请输入详情页标题"></el-input>
                <div class="addImg" >
                  <img style="display: block;width: 24PX;height: 24PX" src="@/assets/globalPc/ic_form_addphoto@3x.png" alt="">
                  <span>添加图片</span>
                  <span>尺寸建议:宽800PX, 长1000PX以内</span>
                </div>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="deleteRowData()">保存</el-button>
            <el-button @click="dialogPvVisible = false">取消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import Pagination from '@/components/Pagination'
export default {
  name: 'mainBusinesss',
  components: { Pagination },
  data(){
    return {
      total: 200,
      pageNum: 1,
      pageSize: 10,
      list: [
        {
          id: 1,
          business: '公司注册业务',
          type: '文字',
          status: '已下架'
        },
        {
          id: 2,
          business: '代理记账',
          type: '文字',
          status: '已上架'
        },
        {
          id: 3,
          business: '公司注册业务',
          type: '文字',
          status: '已下架'
        }
      ],
      listLoading: false,
      dialogPvVisible: false,
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
      }],
      value: '',
      value1: '',
      value2: '',
      radio: '2',
      checked: false,
      introduce: '多年的发展，公司已成为集研发、销售、生产和服务于一体的现代高科技企业，在北京、深圳等地拥有多家子公司，构筑了面向全国的经营和服务网络，涵盖智能建筑、信息化、信息安全、云计算与大数据、智慧化应用、网络可视化和特种通信等业务领域，涉及政府、公安、检察院、司法、文教、交通、能源、金融、电信和企业等行业应用。',
      title: ''
    }
  },
  created(){
    this.getList()
  },
  methods: {
    getList(){
      let listQuery = {
        pageNum: 1,
        pageSize: 20
      }
      api.serviceList(listQuery).then(res => {
        console.log(res)
      })
    },
    handleFetchPv(){
      this.dialogPvVisible = true
    },
    handleDeletePv(){
    },
    deleteRowData(){}
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
.mainBusinesss {
  width: 100vw;
  height: 100vh;
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
          justify-content: space-between;
          margin-bottom: 16PX;
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
            }
          }
        }  
      }
    }
  }
}
</style>
