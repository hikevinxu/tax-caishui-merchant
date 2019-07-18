<template>
  <div class="searchPc">
    <div class="searchPc_container">
        <head-nav id="mainHeader"></head-nav>
        <div class="registerContent">
            <div class="header">
                <div class="headerContent">
                    <div class="steps">
                        <div class="numberPC one">1</div>
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
        disabled: true,
        result: false,
        length: 2,
        areaList: AreaList,
        loading: false,
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
  methods: {
    // onConfirm(value) {
    //     console.log(value)
    //     this.value = value[0].name + value[1].name + value[2].name
    //     console.log(this.value)
    //     this.showPicker = false;
    //     if(this.name != ''){
    //         this.disabled = false
    //     }else{
    //         this.disabled = true
    //     }
    // },
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
            // padding-bottom: 90PX;
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
