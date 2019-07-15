<template>
    <div class="merchantHome-h5">
        <img style="" src="@/assets/global/body_01.png" alt="" srcset="">
        <img src="@/assets/global/body_02.png" alt="" srcset="">
        <div class="merchantHome-footer">
            <span class="btn" @click="goRegister">立即入驻</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'merchantHome-h5',
  data(){
    return{
        
    }
  },
  created(){
    
  },
  methods: {
    goRegister(){
        this.$router.push({ path: '/register-h5' })
    }
  }
}
</script>

<style lang="scss" scoped>
    .merchantHome-h5{
        width: 100%;
        height: 100%;
        padding-bottom: 78px;
    }

    .merchantHome-h5 img{
        width: 100%;
    }

    .merchantHome-h5 .merchantHome-footer{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 68px;
        background: #FFFFFF;
        box-shadow: 0 -8px 8px 0 rgba(0,0,0,0.04);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .merchantHome-h5 .merchantHome-footer .btn{
        display: block;
        width: 328px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: linear-gradient(135deg, #FF7F4A 0%, #FB5332 100%);
        box-shadow: 0 2px 4px 0 rgba(255,173,113,0.30);
        border-radius: 18px;
        font-size: 15px;
        color: #FFFFFF;
    }
</style>
