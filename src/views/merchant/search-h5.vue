<template>
   <div class="search-h5">
        <div class="header">
            <div class="headerContent">
                <div class="steps">
                    <div class="number one">
                        <img src="@/assets/global/ic_stepdone.png" alt="" srcset="">
                    </div>
                    <span class="acitve">注册账号</span>
                </div>
                <div class="steps">
                    <div class="number one two_search">2</div>
                    <span class="acitve">认领企业</span>
                </div>
                <div class="steps">
                    <div class="number">3</div>
                    <span>提交资质</span>
                </div>
            </div>
        </div>
        <div class="search-h5-content">
            <div class="form">
                <div class="inputBox">
                    <input placeholder="请选择地区" v-model="value" type="text" class="adressInput" @click="showPicker = true"  readonly="readonly">
                    <img style="display: block;width: 24px;height: 24px;margin-right: 16px;" src="@/assets/global/ic_arrow_dropdown.png" alt="">
                </div>
                <div class="inputBox">
                    <input placeholder="请输入公司名称" v-model="name" type="text" class="nameInput" @input="nameInput">  
                </div>
                <van-popup v-model="showPicker" position="bottom">
                    <van-area :area-list="areaList" value="110000" @confirm="onConfirm" />
                </van-popup>
                <button id="search" :disabled="disabled" @click="search">搜索企业</button>
            </div>
            <div class="company-content" v-show="result == true">
                <div class="title">为您找到以下企业({{ total }})</div>
                <div class="companyList" v-for="(item,index) in companyList" :key="index">
                    <h4 class="cpmpanyName">{{ item.name }}</h4>
                    <div class="companInfo">
                        <div class="info-content">
                            <div class="adress" style="margin-bottom: 4px;">
                                <img style="display: block;width: 16px;height: 16px;margin-right: 8px;" src="@/assets/global/firm_ic_address.png" alt="">
                                <span>{{ item.address }}</span>
                            </div>
                            <div class="phone">
                                <img style="display: block;width: 16px;height: 16px;margin-right: 8px;" src="@/assets/global/firm_ic_phone.png" alt="">
                                <span v-for="(items, index) in item.phones" :key="index">{{ items }}</span>
                            </div>
                        </div>
                        <div class="conpanyBtn" @click="claim(item)">认领</div>
                    </div>
                </div>
                <div class="load_more" @click="loadingMore" v-show="showLoad &&!noMore">
                    <span v-show="!loading_more">点击加载更多</span>
                    <van-loading style="width: 10px;" v-show="loading_more == true" type="spinner" />
                </div>
                <div class="load_more" v-show="showLoad && noMore">
                    <span>已经到底了</span>
                </div>
                <div class="addNew">
                    <span class="" style="font-size: 12px;color: rgba(0,0,0,0.60);">没有找到想要认领的企业？</span>
                    <div class="addBtn" @click='goClaim'>
                        <span style="font-size: 12px;color: #FFFFFF;">添加企业 ></span>
                        <!-- <img src="" alt="" srcset=""> -->
                    </div>
                </div>
            </div>
            <van-loading style="width: 50px;margin-left: auto;margin-right: auto;margin-top: 16px;" v-show="loading == true" type="spinner" />
        </div>
    </div>
</template>

<script>
let pageNum = 1;
import areaList from '@/utils/areaList'
import Vue from 'vue';
import api from '@/api/apiH5'
import qs from 'qs'
import { Picker,Popup,Loading } from 'vant';
import { Area, Toast } from 'vant';
Vue.use(Area);Vue.use(Toast);Vue.use(Picker);Vue.use(Popup);Vue.use(Loading);
export default {
  name: 'search-h5',
  data(){
    return{
        value: '',
        name: '',
        total: 0,
        showLoad: false,
        noMore: false,
        showPicker: false,
        disabled: true,
        result: false,
        areaList: areaList,
        loading: false,
        loading_more: false,
        companyList: [],
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
    onConfirm(value) {
        this.value = value[0].name + value[1].name + value[2].name
        if(value[1].name == '北京市'){
            value[1].code = '110000'
        }else if(value[1].name == '天津市'){
            value[1].code = '120000'
        }else if(value[1].name == '上海市'){
            value[1].code = '310000'
        }else if(value[1].name == '重庆市'){
            value[1].code = '500000'
        }
        this.cityCode = value[1].code
        this.areaCode = value[2].code
        this.showPicker = false;
        if(this.name != ''){
            this.disabled = false
        }else{
            this.disabled = true
        }
    },
    nameInput(e){
        if(this.name != '' && this.value != ''){
            this.disabled = false
        }else{
            this.disabled = true
        }
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
            api.merchantSearch(data).then(res => {
                if(res.code == 0){
                    this.loading = false
                    this.result = true
                    this.companyList = res.data.items
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
           Toast('请完善数据后搜索')
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
            api.merchantSearch(data).then(res => {
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
           Toast('请完善数据后搜索')
        }
    },
    loadingMore(){
        this.searchMore()
    },
    claim(item){
        // this.$store.dispatch('save_companyInfo', item)
        this.$router.push({
            path: '/merchant-h5',
            query: {
              id: item.id,
              item: JSON.stringify(item)
            }
        })
    },
    goClaim(){
      this.$store.dispatch('save_companyInfo', {})
      this.$router.push('/merchant-h5')
    },
    getCertificationStatus(){
      api.getCertificationStatus().then(res => {
        if(res.code == 0){
          if(res.data.status == 100){
            this.$router.push({path: '/search-h5'})
          }else if(res.data.status == 101){
            this.$router.push({path: '/certification-h5'})
          }else if(res.data.status == 102){
            this.$router.push({
                path: '/success-h5',
                query: {
                  status: res.data.status,
                }
            })
          }else if(res.data.status == 103){
            this.$router.push({
                path: '/success-h5',
                query: {
                  status: res.data.status,
                }
            })
          }else if(res.data.status == 999){
            this.$router.push({
                path: '/success-h5',
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
    .search-h5{
        width: 100%;
        min-height: 720px;
        background: #ffffff;
        padding-bottom: 50px;
    }

    .search-h5-content{
        width: 100%;
        margin-top: 16px;
    }

    .search-h5-content .form{
        width: 100%;
    }

    .search-h5-content .form .inputBox{
        width: 312px;
        height: 48px;
        background: #FAFAFA;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 8px;
    }

    .search-h5-content .form .inputBox input{
        height: 100%;
        margin-left: 16px;
        outline: none;
        border: none;
        background: #FAFAFA;
        font-size: 14px;
        color: rgba(0,0,0,0.60);
    }

    .search-h5-content .form .inputBox .adressInput{
        width: 82%;
    }

    .search-h5-content .form .inputBox .nameInput{
        width: 100%;
    }

    .search-h5-content .form #search{
        display: block;
        background: #5AB3A4;
        border-radius: 4px;
        width: 312px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border: none;
        outline: none;
        font-size: 15px;
        color: #FFFFFF;
        line-height: 18px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 16px;
    }

    .search-h5-content .company-content{
        width: 100%;
        margin-top: 32px;
    }

    .search-h5-content .company-content .title{
        width: 312px;
        padding-bottom: 16px;
        text-align: left;
        font-size: 12px;
        color: rgba(0,0,0,0.60);
        display: block;
        border-bottom: 1px solid rgba(0,0,0,0.04);
        margin-left: auto;
        margin-right: auto;
    }

    .search-h5-content .company-content .companyList{
        width: 312px;
        margin-left: auto;
        margin-right: auto;
        padding-top: 16px;
        padding-bottom: 16px;
        border-bottom:  1px solid rgba(0,0,0,0.04);
    }

    .search-h5-content .company-content .companyList .cpmpanyName{
        width: 100%;
        font-size: 16px;
        color: rgba(0,0,0,0.87);
        display: block;
        text-align: left;
        margin-bottom: 8px;
    }

    .search-h5-content .company-content .companyList .companInfo{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .search-h5-content .company-content .companyList .companInfo .info-content{
        width: 232px;
    }

    .search-h5-content .company-content .companyList .companInfo .info-content .adress,
    .search-h5-content .company-content .companyList .companInfo .info-content .phone{
        display: flex;
        align-items: flex-start;
    }

    .search-h5-content .company-content .companyList .companInfo .info-content .adress span,
    .search-h5-content .company-content .companyList .companInfo .info-content .phone span{
        display: block;
        // width: 208px;
        margin-right: 8px;
        font-size: 12px;
        color: rgba(0,0,0,0.38);
        text-align: left;
        line-height: 18px;
    }

    .search-h5-content .company-content .companyList .companInfo .conpanyBtn{
        width: 56px;
        height: 28px;
        line-height: 28px;
        background: #FFEADA;
        border: 1px solid #FFCFAC;
        border-radius: 2px;
        font-size: 13px;
        color: #FF7F4A;
        text-align: center;
    }

    .search-h5-content .company-content .load_more{
        width: 312px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        height: 40px;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        // margin-top: 16px;
        border-bottom: 1px solid rgba(0,0,0,0.04);
        cursor: pointer;
        span{
            font-size: 14px;
            color: rgba(0,0,0,0.60);
        }
    }

    .search-h5-content .company-content .addNew{
        width: 312px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-flow: column;
        align-items: center;
        margin-top: 16px;
    }

    .search-h5-content .company-content .addNew .addBtn{
        width: 86px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #FF7F4A;
        border-radius: 14px;
        margin-top: 8px;
    }
</style>
