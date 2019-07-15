<template>
    <div class="success-h5">
        <div class="header">
            <div class="headerContent">
                <div class="steps">
                    <div class="number one">
                        <img src="@/assets/global/ic_stepdone.png" alt="" srcset="">
                    </div>
                    <span class="acitve">注册账号</span>
                </div>
                <div class="steps">
                    <div class="number one two_success">
                        <img src="@/assets/global/ic_stepdone.png" alt="" srcset="">
                    </div>
                    <span class="acitve">认领企业</span>
                </div>
                <div class="steps">
                    <div class="number one"><img src="@/assets/global/ic_stepdone.png" alt="" srcset=""></div>
                    <span class="acitve">提交资质</span>
                </div>
            </div>
        </div>
        <div class="success-content">
            <img style="display: block;width: 120px;height: 120px;margin-bottom: 16px;" src="@/assets/global/img_page_complete.png" alt="">
            <h4 style="display: block;margin-bottom: 8px;font-size: 16px;color: rgba(0,0,0,0.87);">商家入驻申请提交成功</h4>
            <span style="font-size: 12px;color: rgba(0,0,0,0.38);">2～3个工作日后将通知您审核结果</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'success-h5',
  data(){
    return{
        
    }
  },
  created(){
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
    .success-h5{
        width: 100%;
        height: 100%;
    }

    .success-content{
        width: 100%;
        margin-top: 40px;
        display: flex;
        flex-flow: column;
        align-items: center;
    }
</style>
