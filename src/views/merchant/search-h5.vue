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
            <div class="company-content" v-show="result == false">
                <div class="title">为您找到以下企业({{ length }})</div>
                <div class="companyList" v-for="(item,index) in companyList" :key="index">
                    <h4 class="cpmpanyName">{{ item.name }}</h4>
                    <div class="companInfo">
                        <div class="info-content">
                            <div class="adress" style="margin-bottom: 4px;">
                                <img style="display: block;width: 16px;height: 16px;margin-right: 8px;" src="@/assets/global/firm_ic_address.png" alt="">
                                <span>{{ item.adress }}</span>
                            </div>
                            <div class="phone">
                                <img style="display: block;width: 16px;height: 16px;margin-right: 8px;" src="@/assets/global/firm_ic_phone.png" alt="">
                                <span>{{ item.phone }}</span>
                            </div>
                        </div>
                        <div class="conpanyBtn">认领</div>
                    </div>
                </div>
                <div class="load_more" @click="loadingMore">
                    <span v-show="!loading_more">点击加载更多</span>
                    <van-loading style="width: 10px;" v-show="loading_more == true" type="spinner" />
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
import areaList from '@/utils/areaList'
import Vue from 'vue';
import { Picker,Popup,Loading } from 'vant';
import { setTimeout } from 'timers';
import { Area } from 'vant';
Vue.use(Area);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Loading);
export default {
  name: 'search-h5',
  data(){
    return{
        value: '',
        name: '',
        showPicker: false,
        disabled: true,
        result: false,
        length: 2,
        areaList: areaList,
        loading: false,
        loading_more: false,
        companyList: [
            {
                name: '杭州税牛科技有限公司',
                adress: '浙江省杭州市西湖区双龙街199号金色西溪B座8楼',
                phone: '0571-29182721'
            },
            {
                name: '杭州税牛科技有限公司',
                adress: '浙江省杭州市西湖区双龙街199号金色西溪B座8楼',
                phone: '0571-29182721'
            },
            {
                name: '杭州税牛科技有限公司',
                adress: '浙江省杭州市西湖区双龙街199号金色西溪B座8楼',
                phone: '0571-29182721'
            }
        ]
    }
  },
  created(){
    
  },
  methods: {
    onConfirm(value) {
        console.log(value)
        this.value = value[0].name + value[1].name + value[2].name
        console.log(this.value)
        this.showPicker = false;
        if(this.name != ''){
            this.disabled = false
        }else{
            this.disabled = true
        }
    },
    nameInput(e){
        console.log(this.value)
        if(this.name != '' && this.value != ''){
            this.disabled = false
        }else{
            this.disabled = true
        }
    },
    search(){
        this.loading = true
        if(this.value != '' && this.name != ''){
            let that = this
            setTimeout(function(){
                that.result = true
                that.loading = false
            },1000)
        }else{
           this.result = false
        }
    },
    loadingMore(){
        let companyList = [
            {
                name: '杭州税牛科技有限公司',
                adress: '浙江省杭州市西湖区双龙街199号金色西溪B座8楼',
                phone: '0571-29182721'
            },
            {
                name: '杭州税牛科技有限公司',
                adress: '浙江省杭州市西湖区双龙街199号金色西溪B座8楼',
                phone: '0571-29182721'
            },
            {
                name: '杭州税牛科技有限公司',
                adress: '浙江省杭州市西湖区双龙街199号金色西溪B座8楼',
                phone: '0571-29182721'
            }
        ]
        this.loading_more = true
        setTimeout(res => {
            this.companyList = this.companyList.concat(companyList)
            this.loading_more = false
        },1000)

    },
    goClaim(){
        this.$router.push('/merchant-h5')
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
        width: 208px;
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
