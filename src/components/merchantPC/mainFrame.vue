<template>
  <div class="mainFrame">
    <sider-bar id="mainSider"></sider-bar>
    <head-nav :title="title" id="mainHeader"></head-nav>
    <router-view id="mainContent"></router-view>
  </div>
</template>
<script>
import headNav from '@/components/merchantPC/headNav.vue'
import siderBar from '@/components/merchantPC/siderBar.vue'
import api from '@/api/apiH5'
export default {
  name: 'mainFrame',
  components: {
    headNav,
    siderBar
  },
  data(){
    return {
      title: '商户入驻'
    }
  },
  created() {
    this.getCertificationStatus()
  },
  methods: {
    getCertificationStatus(){
      api.getCertificationStatus().then(res => {
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
          }else if(res.data.status == 999){
            this.$router.push({
                path: '/success-pc',
                query: {
                  status: res.data.status,
                }
            })
          }else if(res.data.status == 103){
            // 进入页面
            
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mainFrame {
  position: relative;
  #mainHeader {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
  }
  #mainSider {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 199;
  }
  #mainContent {
    box-sizing: border-box;
    background: rgba(0,0,0,0.04);
    padding-top: 96Px;
    padding-left: 212Px;
    padding-right: 28Px;
  }
}
</style>
