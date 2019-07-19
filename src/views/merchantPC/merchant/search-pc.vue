<template>
  <div class="searchPc">
    <div class="searchPc_container">
        <head-nav id="mainHeader"></head-nav>
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
                            <el-select style="width: 33%" v-model="value1" placeholder="请选择">
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

                            <el-select style="width: 33%" v-model="value1" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="inputBox">
                        <span class="label">企业全称</span>
                        <input type="text" v-model="phone" class="phoneInput" maxlength="11" placeholder="请输入企业名称" @input="phoneInput" >
                    </div>
                    <button class="search" :disabled="disabled">搜索企业</button>
                </div>
                <div class="form_search" v-show="isSearch">
                    <div class="form_content">
                        <div class="inputBox">
                            <span class="label">企业所在地区</span>
                            <div class="selectLine">
                                <el-select style="width: 33%" v-model="value1" placeholder="请选择">
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

                                <el-select style="width: 33%" v-model="value1" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="inputBox">
                            <span class="label">企业全称</span>
                            <input type="text" v-model="phone" class="phoneInput" maxlength="11" placeholder="请输入企业名称" @input="phoneInput" >
                        </div>
                        <button class="search" :disabled="disabled">搜索企业</button>
                        <div class="addNew">
                            <span style="font-size: 12PX;color: rgba(0,0,0,0.60);">没有找到想要认领的企业？</span>
                            <span class="addCompany" style="font-size: 12PX;color: #FFFFFF;">添加企业 ></span>
                        </div>
                    </div>
                    <div class="resoult_content">
                        <span class="label">为您找到以下企业({{num}})</span>
                        <div class="companyList">
                            <div class="company" v-for="(item,index) in companyList" :key="index">
                                <h4 class="cpmpanyName">{{ item.name }}</h4>
                                <div class="companInfo">
                                    <div class="info-content">
                                        <div class="adress" style="margin-bottom: 4PX;">
                                            <img style="display: block;width: 16PX;height: 16PX;margin-right: 8PX;" src="@/assets/globalPc/firm_ic_address@3x.png" alt="">
                                            <span>{{ item.adress }}</span>
                                        </div>
                                        <div class="phone">
                                            <img style="display: block;width: 16PX;height: 16PX;margin-right: 8PX;" src="@/assets/globalPc/firm_ic_phone@3x.png" alt="">
                                            <span>{{ item.phone }}</span>
                                        </div>
                                    </div>
                                    <div class="conpanyBtn">认领</div>
                                </div>
                            </div>
                        </div>
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
                <span class="line">Copyright 2019  |  杭州税牛科技有限公司  |  浙ICP备19028668号  |  <a href="https://res.pocket.taxlioner.com/common/h5/privacy_agreement.html" style="text-decoration-line: none;color: #ffffff;">用户隐私协议</a>  |  All Rights Reserved</span>
                <span class="line">E-mail：kf@taxlioner.com  |  地址：杭州市西湖区金色西溪商务中心B座</span>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import headNav from '@/components/merchantPC/headNav.vue'
export default {
  name: 'login',
  components: {
    headNav
  },
  data(){
    return {
        value: '',
        name: '',
        showPicker: false,
        disabled: false,
        result: false,
        length: 2,
        // areaList: AreaList,
        loading: false,
        phone: '',
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
        ],
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
        isSearch: true,
        num: 1,
    }
  },
  methods: {
    phoneInput(e){

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
    goClaim(){
        this.$router.push('/merchant-h5')
    }
  }
}
</script>
<style lang="scss" scoped>
    .searchPc{
        width: 100%;
        // height: 100%;
        min-height: 100vh;
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
            padding-bottom: 100PX;
            .registerContent{
                width: 808PX;
                margin-top: 50PX;
                margin-left: auto;
                margin-right: auto;
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
                                        }
                                    }
                                }
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
