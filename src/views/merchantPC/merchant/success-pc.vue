<template>
  <div class="successPc">
    <div class="successPc_container">
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
                        <div class="numberPC one two_success">
                            <img src="@/assets/global/ic_stepdone.png" alt="" srcset="">
                        </div>
                        <span class="active">认领企业</span>
                    </div>
                    <div class="steps">
                        <div class="numberPC one"><img src="@/assets/global/ic_stepdone.png" alt="" srcset=""></div>
                        <span class="active">提交资质</span>
                    </div>
                </div>
            </div>
            <div class="success_content" v-show="status == '102'">
                <img src="@/assets/global/img_page_complete.png" alt="">
                <span style="font-size: 16PX;color: rgba(0,0,0,0.87);">商家入驻申请提交成功</span>
                <span style="font-size: 12PX;color: rgba(0,0,0,0.38);">2～3个工作日后将通知您审核结果</span>
            </div>
            <div class="success_content" v-show="status == '103'">
                <img src="@/assets/global/img_page_complete.png" alt="">
                <span style="font-size: 16PX;color: rgba(0,0,0,0.87);">商家入驻审核通过</span>
                <span style="font-size: 12PX;color: rgba(0,0,0,0.38);">请登录商户后台管理网站管理你的商户信息</span>
            </div>
            <div class="success_content" v-show="status == '999'">
                <img src="@/assets/global/img_page_failed.png" alt="">
                <span style="font-size: 16PX;color: rgba(0,0,0,0.87);">商家入驻申请审核失败</span>
                <span style="font-size: 12PX;color: rgba(0,0,0,0.38);">失败原因：{{failCause}}</span>
                <span style="font-size: 12PX;color: rgba(0,0,0,0.38);">请重新提交，感谢您的合作</span>
                <span class="goSearch" @click="goSearch">重新提交</span>
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
import headNav from '@/components/merchantPC/headNav.vue'
import api from '@/api/apiH5'
export default {
  name: 'login',
  components: {
    headNav
  },
  data(){
    return{
        title: '返回登录',
        status: '102',
        failCause: '因商家提供资料与实际不符，审核失败'
    }
  },
  created(){
    let status = this.$route.query.status
    console.log(status)
    if(status){
        this.status  = status
        if(status == 999){
            api.getCertificationStatus().then(res => {
                console.log(res)
                if(res.code == 0){
                    if(res.data.status == 999){
                        this.failCause = res.data.failCause
                    }
                }
            })
        }
    }
  },
  methods: {
    goSearch(){
        this.$router.push({path: '/search-pc?reSearch=1'})
    }
  }
}
</script>
<style lang="scss" scoped>
    .successPc{
        width: 100%;
        // height: 100%;
        min-height: 100vh;
        #mainHeader{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 999;
        }
        .successPc_container{
            position: relative;
            width: 100%;
            // height: 100%;
            min-height: 100vh;
            min-width: 1440PX;
            background: url(../../../assets/globalPc/bg.jpg) no-repeat;
            background-size: cover;
            background-position: 50%;
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
                .success_content{
                    width: 100%;
                    margin-top: 8PX;
                    background: #FFFFFF;
                    height: 520PX;
                    padding-top: 80PX;
                    border-radius: 4PX;
                    display: flex;
                    align-items: center;
                    flex-flow: column;
                    img{
                        display: block;
                        width: 120PX;
                        height: 120PX;
                        margin-bottom: 16PX;
                    }
                    span{
                        display: block;
                        margin-bottom: 8PX;
                    }
                    .goSearch{
                        width: 240PX;
                        height: 36PX;
                        display: flex !important;
                        align-items: center;
                        justify-content: center;
                        margin-left: auto;
                        margin-right: auto;
                        margin-top: 24PX;
                        background: linear-gradient(135deg, #FFAD71 0%, #FF7F4A 100%);
                        border-radius: 18PX;
                        font-size: 15PX;
                        color: #FFFFFF;
                        cursor: pointer;
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
