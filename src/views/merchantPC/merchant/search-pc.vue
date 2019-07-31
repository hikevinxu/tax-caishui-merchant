<template>
  <div class="searchPc">
    <div class="searchPc_container">
        <head-nav :isLogin="false" :title="title" id="mainHeader"></head-nav>
        <div class="registerContent">
            <div class="header">
                <div class="headerContent">
                    <div class="steps">
                        <div class="numberPC one">
                            <img src="@/assets/global/ic_stepdone.png" alt="" srcset="">
                        </div>
                        <span class="active">注册账号</span>
                    </div>
                    <div class="steps">
                        <div class="numberPC one two_search">2</div>
                        <span class="active">认领企业</span>
                    </div>
                    <div class="steps">
                        <div class="numberPC">3</div>
                        <span>提交资质</span>
                    </div>
                </div>
            </div>
            <div class="search_form">
                <h4>认领企业</h4>
                <div class="form" v-show="!isSearch">
                    <div class="inputBox">
                        <span class="label">企业所在地区</span>
                        <div class="selectLine">
                            <el-select @change="proviceChange" style="width: 33%" v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>

                            <el-select @change="areaChange" style="width: 33%" v-model="value1" placeholder="请选择">
                                <el-option
                                v-for="item in options1"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>

                            <el-select @change="cityChange" style="width: 33%" v-model="value2" placeholder="请选择">
                                <el-option
                                v-for="item in options2"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="inputBox">
                        <span class="label">企业全称</span>
                        <input type="text" v-model="name" class="phoneInput" maxlength="11" placeholder="请输入企业名称" @input="nameInput" >
                    </div>
                    <button @click="searchFirst" class="search" :disabled="disabled">搜索企业</button>
                </div>
                <div class="form_search" v-show="isSearch">
                    <div class="form_content">
                        <div class="inputBox">
                            <span class="label">企业所在地区</span>
                            <div class="selectLine">
                                <el-select @change="proviceChange" style="width: 33%" v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                    </el-option>
                                </el-select>

                                <el-select @change="areaChange" style="width: 33%" v-model="value1" placeholder="请选择">
                                    <el-option
                                    v-for="item in options1"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                    </el-option>
                                </el-select>

                                <el-select @change="cityChange" style="width: 33%" v-model="value2" placeholder="请选择">
                                    <el-option
                                    v-for="item in options2"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="inputBox">
                            <span class="label">企业全称</span>
                            <input type="text" v-model="name" class="phoneInput" maxlength="11" placeholder="请输入企业名称" @input="nameInput" >
                        </div>
                        <button @click="search" class="search" :disabled="disabled">搜索企业</button>
                        <div class="addNew">
                            <span style="font-size: 12PX;color: rgba(0,0,0,0.60);">没有找到想要认领的企业？</span>
                            <span @click="goClaim" class="addCompany" style="font-size: 12PX;color: #FFFFFF;">添加企业 ></span>
                        </div>
                    </div>
                    <div class="resoult_content" v-show="!noData">
                        <span class="label">为您找到以下企业({{ total }})</span>
                        <div class="companyList">
                            <div class="company" v-for="(item,index) in companyList" :key="index">
                                <h4 class="cpmpanyName">{{ item.name }}</h4>
                                <div class="companInfo">
                                    <div class="info-content">
                                        <div class="adress" style="margin-bottom: 4PX;">
                                            <img style="display: block;width: 16PX;height: 16PX;margin-right: 8PX;" src="@/assets/globalPc/firm_ic_address@3x.png" alt="">
                                            <span>{{ item.address }}</span>
                                        </div>
                                        <div class="phone">
                                            <img style="display: block;width: 16PX;height: 16PX;margin-right: 8PX;" src="@/assets/globalPc/firm_ic_phone@3x.png" alt="">
                                            <span v-show="item.phones.length > 0" style="margin-right:8PX;">{{ item.phones[0] }}</span>
                                        </div>
                                    </div>
                                    <div class="conpanyBtn" @click="claim(item)">认领</div>
                                </div>
                            </div>
                            <div class="load_more" @click="loadingMore" v-show="showLoad &&!noMore">
                                <span v-show="!loading_more">点击加载更多</span>
                            </div>
                            <div class="load_more" v-show="showLoad && noMore">
                                <span>已经到底了</span>
                            </div>
                                </div>
                            </div>
                    <div class="noData" v-show="noData">
                        <img src="@/assets/globalPc/img_nonsearch.png" alt="" srcset="">
                        <span>没有搜索到企业</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footerContent">
                <div class="qrcode">
                    <img style="display: block;width: 120PX;height: 120PX;margin-bottom: 8PX;" src="@/assets/globalPc/qrcode.png" alt="">
                    <span style="font-size: 12PX;color: #FFFFFF;">下载财税鱼APP</span>
                </div>
                <span class="line">Copyright 2019  |  杭州税牛科技有限公司  |  浙ICP备19028668号  |  <a href="https://res.caishuiyu.com/common/h5/privacy_agreement.html" style="text-decoration-line: none;color: #ffffff;">用户隐私协议</a>  |  All Rights Reserved</span>
                <span class="line">E-mail：kf@taxlioner.com  |  地址：杭州市西湖区金色西溪商务中心B座</span>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
let pageNum = 1;
import headNav from '@/components/merchantPC/headNav.vue'
import province_local from '@/utils/province_local'
import api from '@/api/apiH5'
import qs from 'qs'
export default {
  name: 'login',
  components: {
    headNav
  },
  data(){
    return {
        title:'返回登录',
        name: '',
        total: 0,
        showLoad: false,
        noMore: false,
        disabled: true,
        result: false,
        loading: false,
        loading_more: false,
        phone: '',
        companyList: [
        ],
        options: province_local,
        options1: [],
        options2: [],
        value: '',
        value1: '',
        value2: '',
        isSearch: false,
        noData: false,
        num: 1,
        areaCode: '',
        cityCode: '',
        pageSize: 20
    }
  },
  created(){
        if(this.$route.query.reSearch != 1){
            this.getCertificationStatus()
        }
  },
  methods: {
    proviceChange(val){
        console.log(val)
        var obj = {};
        obj = this.options.find(function(item){
            return item.code == val
        })
        // console.log(obj)
        this.options1 = obj.childs
    },
    areaChange(val){
        console.log(val)
        this.cityCode = val.toString()
        var obj = {};
        obj = this.options1.find(function(item){
            return item.code == val
        })
        // console.log(obj)
        this.options2 = obj.childs

    },
    cityChange(val){
        console.log(val)
        this.areaCode = val.toString()
    },
    nameInput(e){
        console.log(this.value)
        if(this.name != '' && this.value != ''){
            this.disabled = false
        }else{
            this.disabled = true
        }
    },
    searchFirst(){
        this.isSearch = true;
        this.search()
    },
    search(){
        this.result = false
        this.loading = true
        if(this.value != '' && this.name != ''){
            let data = {
                areaCode: this.areaCode,
                cityCode: this.cityCode,
                // fullSearch: true,
                pageNum: pageNum,
                pageSize: this.pageSize,
                keyword: this.name
            }
            console.log(data)
            api.merchantSearch(data).then(res => {
                console.log(res)
                if(res.code == 0){
                    this.loading = false
                    this.result = true
                    this.companyList = res.data.items
                    if(this.companyList.length == 0){
                        this.noData = true
                    }else{
                        this.noData = false
                    }
                    this.total = res.data.total
                    if(res.data.total <= 20){
                        this.showLoad = false
                    }else{
                        this.showLoad = true
                    }
                }
            })
            
        }else{
            this.result = false
            this.$message({
              message: '请完善数据后提交',
              type: 'error',
              showClose: true,
              duration: 1000
            })
        }
    },
    searchMore(){
        pageNum ++
        this.loading_more = true
        if(this.value != '' && this.name != ''){
            let data = {
                areaCode: this.areaCode,
                cityCode: this.cityCode,
                // fullSearch: true,
                pageNum: pageNum,
                pageSize: this.pageSize,
                keyword: this.name
            }
            console.log(data)
            api.merchantSearch(data).then(res => {
                console.log(res)
                if(res.code == 0){
                    this.companyList = this.companyList.concat(res.data.items)
                    this.total = res.data.total
                    this.loading_more = false
                    if(res.data.items.length <= 20){
                        this.noMore = true
                    }else{
                        this.noMore = false
                    }
                }
            })
        }else{
            this.$message({
              message: '请完善数据后提交',
              type: 'error',
              showClose: true,
              duration: 1000
            })
        }
    },
    loadingMore(){
        console.log(pageNum)
        this.searchMore()
    },
    goClaim(){
        this.$router.push('/merchant-pc')
    },
    claim(item){
      this.$store.dispatch('save_companyInfo', item)
      this.$router.push({
          path: '/merchant-pc'
      })
    },
    getCertificationStatus(){
      api.getCertificationStatus().then(res => {
        console.log(res)
        if(res.code == 0){
          if(res.data.status == 100){
            this.$router.push({path: '/search-pc'})
          }else if(res.data.status == 101){
            this.$router.push({path: '/certification-pc'})
          }else if(res.data.status == 102){
            this.$router.push({
                path: '/success-pc',
                query: {
                  status: res.data.status,
                }
            })
          }else if(res.data.status == 103){
            this.$router.push({path: '/home'})
          }else if(res.data.status == 999){
            this.$router.push({
                path: '/success-pc',
                query: {
                  status: res.data.status,
                }
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .searchPc{
        width: 100%;
        // height: 100%;
        min-height: 100vh;
        #mainHeader{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
        }
        .searchPc_container{
            position: relative;
            width: 100%;
            // height: 100%;
            min-height: 100vh;
            min-width: 1440PX;
            // padding-bottom: 90PX;
            background: url(../../../assets/globalPc/bg.jpg) no-repeat;
            background-size: cover;
            background-position: 50%;
            // padding-bottom: 100PX;
            // background: #F5F5F5;
            .registerContent{
                box-sizing: border-box;
                width: 808PX;
                height: 100vh;
                margin-left: auto;
                margin-right: auto;
                padding-top: 100PX;
                padding-bottom: 100PX;
                overflow: scroll;
                &::-webkit-scrollbar {
                    display: none;
                }
                .header{
                    width: 100%;
                    height: 100PX;
                    background: #FFFFFF;
                    border-radius: 4PX;
                    .headerContent{
                        height: 100%;
                        width: 569PX;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-left: auto;
                        margin-right: auto;
                        .steps{
                            width: 60PX;
                            height: 100%;
                            display: flex;
                            flex-flow: column;
                            align-items: center;
                            justify-content: center;
                            .numberPC{
                                width: 36PX;
                                height: 36PX;
                                border-radius: 50%;
                                background: #F5F5F5;
                                border: 2PX solid #E0E0E0;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-family: PingFangSC-Medium;
                                font-size: 20PX;
                                color: rgba(0,0,0,0.38);
                                line-height: 30PX;
                                margin-bottom: 8PX;
                                position: relative;
                                img{
                                    display: block;
                                    width: 23PX;
                                    height: 23PX;
                                }
                            }
                            .one{
                                background: #FFEADA !important;
                                border: 2PX solid #FFCFAC !important;
                                color: #FF7F4A !important;
                            }
                            .active{
                                color: #FF7F4A;
                            }
                            .two::before{
                                position: absolute;
                                display: block;
                                content: '';
                                top: 50%;
                                left: 52PX;
                                width: 193PX;
                                height: 1PX;
                                background:  rgba(0,0,0,0.12);
                            }
                            .two::after{
                                position: absolute;
                                display: block;
                                content: '';
                                top: 50%;
                                right: 52PX;
                                width: 193PX;
                                height: 1PX;
                                background:  rgba(0,0,0,0.12);
                            }
                            .two_search::before{
                                position: absolute;
                                display: block;
                                content: '';
                                top: 50%;
                                left: 52PX;
                                width: 193PX;
                                height: 1PX;
                                background:  rgba(0,0,0,0.12);
                                
                            }
                            .two_search::after{
                                position: absolute;
                                display: block;
                                content: '';
                                top: 50%;
                                right: 52PX;
                                width: 193PX;
                                height: 1PX;
                                background:  #FFAD71;
                            }
                            .two_success::before{
                                position: absolute;
                                display: block;
                                content: '';
                                top: 50%;
                                left: 52PX;
                                width: 193PX;
                                height: 1PX;
                                background:  #FFAD71;
                            }
                            .two_success::after{
                                position: absolute;
                                display: block;
                                content: '';
                                top: 50%;
                                right: 52PX;
                                width: 193PX;
                                height: 1PX;
                               background:  #FFAD71;
                            }
                            span{
                                font-family: PingFangSC-Regular;
                                font-size: 12PX;
                                color: rgba(0,0,0,0.60);
                                /* text-align: left; */
                                line-height: 18PX;
                            }
                        }
                    }
                }
                .search_form{
                    width: 100%;
                    margin-top: 8PX;
                    background: #FFFFFF;
                    height: 600PX;
                    padding-top: 40PX;
                    border-radius: 4PX;
                    h4{
                        font-size: 20PX;
                        color: rgba(0,0,0,0.87);
                        display: block;
                        text-align: center;
                        width: 316PX;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .form{
                        width: 316PX;
                        margin-left: auto;
                        margin-right: auto;
                        margin-top: 24PX;
                        .inputBox{
                            width: 100%;
                            display: flex;
                            flex-flow: column;
                            align-items: flex-start;
                            margin-bottom: 24PX;
                            .label{
                                display: block;
                                font-size: 14PX;
                                color: rgba(0,0,0,0.60);
                                margin-bottom: 8PX;
                            }
                            .selectLine{
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                            }
                            input{
                                display: block;
                                outline: none;
                                border: none;
                                background: #FAFAFA;
                                height: 40PX;
                                line-height: 40PX;
                                width: 300PX;
                                padding-left: 16PX;
                                background: #FAFAFA;
                                border-radius: 4PX;
                                color: rgba(0,0,0,0.87);
                                font-size: 14PX;
                            }
                        }
                        .search{
                            display: block;
                            outline: none;
                            width: 316PX;
                            height: 36PX;
                            line-height: 36PX;
                            text-align: center;
                            background: #5AB3A4;
                            border-radius: 4PX;
                            font-size: 15PX;
                            color: #FFFFFF;
                            margin-top: 8PX;
                            cursor: pointer;
                        }
                    }
                    .form_search{
                        display: flex;
                        align-items: flex-start;
                        margin-top: 24PX;
                        justify-content: center;
                        .form_content{
                            width: 316PX;
                            border-right: 1PX solid rgba(0,0,0,0.08);
                            padding-right: 32PX;
                            .inputBox{
                                width: 100%;
                                display: flex;
                                flex-flow: column;
                                align-items: flex-start;
                                margin-bottom: 24PX;
                                .label{
                                    display: block;
                                    font-size: 14PX;
                                    color: rgba(0,0,0,0.60);
                                    margin-bottom: 8PX;
                                }
                                .selectLine{
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                }
                                input{
                                    display: block;
                                    outline: none;
                                    border: none;
                                    background: #FAFAFA;
                                    height: 40PX;
                                    line-height: 40PX;
                                    width: 300PX;
                                    padding-left: 16PX;
                                    background: #FAFAFA;
                                    border-radius: 4PX;
                                    color: rgba(0,0,0,0.87);
                                    font-size: 14PX;
                                }
                            }
                            .search{
                                display: block;
                                outline: none;
                                width: 316PX;
                                height: 36PX;
                                line-height: 36PX;
                                text-align: center;
                                background: #5AB3A4;
                                border-radius: 4PX;
                                font-size: 15PX;
                                color: #FFFFFF;
                                margin-top: 8PX;
                                cursor: pointer;
                            }
                            .addNew{
                                margin-top: 44PX;
                                width: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                .addCompany{
                                    background: #FF7F4A;
                                    border-radius: 14PX;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    width: 86PX;
                                    height: 24PX;
                                    font-size: 12PX;
                                    color: #FFFFFF;
                                    margin-left: 8PX;
                                    cursor: pointer;
                                }
                            }
                        }
                        .resoult_content{
                            width: 360PX;
                            padding-left: 23PX;
                            .label{
                                display: block;
                                font-size: 14PX;
                                color: rgba(0,0,0,0.60);
                                margin-bottom: 8PX;
                            }
                            .companyList{
                                width: 100%;
                                max-height: 500PX;
                                overflow-y: auto;
                                &::-webkit-scrollbar {
                                    display: none;
                                }
                                .company{
                                    width: 100%;
                                    padding-top: 16PX;
                                    padding-bottom: 16PX;
                                    background: #FAFAFA;
                                    border: 1PX solid rgba(0,0,0,0.04);
                                    border-radius: 2PX;
                                    margin-bottom: 8PX;
                                    .cpmpanyName{
                                        display: block;
                                        width: 86.66%;
                                        text-align: left;
                                        margin-bottom: 8PX;
                                        font-size: 16PX;
                                        color: rgba(0,0,0,0.87);
                                    }
                                    .companInfo{
                                        width: 86.66%;
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;
                                        margin-left: auto;
                                        margin-right: auto;
                                        .info-content{
                                            width: 74.35%;
                                            .adress{
                                                margin-bottom: 4PX;
                                                align-items: flex-start;
                                            }
                                            .phone{
                                                align-items: center;
                                            }
                                            .adress,.phone{
                                                width: 100%;
                                                display: flex;
                                                img{
                                                    display: block;
                                                    width: 16PX;
                                                    height: 16PX;
                                                    margin-right: 8PX;
                                                }
                                                span{
                                                    font-size: 12PX;
                                                    color: rgba(0,0,0,0.38);
                                                    line-height: 18PX;
                                                } 
                                            }
                                        }
                                        .conpanyBtn{
                                            width: 56PX;
                                            height: 28PX;
                                            line-height: 28PX;
                                            background: #FFEADA;
                                            border: 1PX solid #FFCFAC;
                                            border-radius: 2PX;
                                            font-size: 13PX;
                                            color: #FF7F4A;
                                            text-align: center;
                                            cursor: pointer;
                                        }
                                    }
                                }
                                .load_more{
                                    width: 360PX;
                                    display: flex;
                                    align-items: center; 
                                    justify-content: center;
                                    font-size: 14PX;
                                    color: rgba(0,0,0,0.60);
                                    height: 40PX;
                                    background: #FAFAFA;
                                    border: 1PX solid rgba(0,0,0,0.04);
                                    margin-bottom: 8PX;
                                }
                            }
                        }
                        .noData{
                            width: 360PX;
                            display: flex;
                            align-items: center;
                            // justify-content: center;
                            flex-flow: column;
                            img{
                                display: block;
                                width: 80PX;
                                height: 80PX;
                                margin-bottom: 8PX;
                                margin-top: 60PX;
                            }
                            span{
                                font-size: 12PX;
                                color: rgba(0,0,0,0.26);
                            }
                        }
                    }
                }
            }
            .footer{
                position: absolute;
                bottom: 0;
                left: 0;
                background: rgba(0,0,0,0.60);
                width: 100%;
                height: 90PX;
                .footerContent{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-flow: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    .qrcode{
                        width: 120PX;
                        display: flex;
                        flex-flow: column;
                        align-items: center;
                        position: absolute;
                        bottom: 23PX;
                        left: 108PX;
                    }
                    .line{
                        font-size: 12PX;
                        color: #FFFFFF;
                        margin-bottom: 8PX;
                    }
                }
            }
        }
    }
</style>
